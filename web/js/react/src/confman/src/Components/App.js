import React from "react";
import MainNav from "./MainNav";
import MainNavButton from "./MainNavButton";
import Spinner from "./Spinner";
import Cta from "./Cta";
import StickyNav from "./StickyNav";
import SearchInput from "./SearchInput";
import Slide from "./Slide";
import CheckBoxFilter from "./CheckBoxFilter";
import Body from "./Body";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: props.options.mode,
			loading: true,
			sessions: null,
			speakers: null,
			metaNumbers: null,
			//if a filter is -1 ignore
			filters: {
				track: [-1], //ignore these tracks
				day: -1, //inverse of this ^^
				query: "",
			},
			openSessions: false,
		};
	}
	getRenderList = () => {
		if (this.props.options.mode === "full-agenda") {
			let deepCloneSessions = JSON.parse(JSON.stringify(this.state)).sessions;
			let pipedSessions = this.pipeSessions([this.filterDays, this.filterTracks, this.filterQuery], deepCloneSessions);
			return this.getFullAgenda(pipedSessions);
		}
	};

	pipeSessions = (filterFunctions = [], sessions) => {
		if (filterFunctions.length >= 1) {
			filterFunctions.forEach((filter) => {
				sessions = filter(sessions);
			});
		}
		return sessions;
	};
	toggleSessions = (force = false, bool) => {
		if (!force) {
			let open = !this.state.openSessions;
		} else {
			//if force is true set state to value of bool instead
			let open = bool;
		}
		this.setState((prevState) => {
			prevState.openSessions = open;
			return prevState;
		});
	};
	setTrack = (value = -1) => {
		let tracks = [];
		if (this.state.filters.track[0] == -1) {
			//currently on all so convert empty and add value
			tracks.push(value);
		} else {
			tracks = this.state.filters.track;
			//does the array contain value atm?
			if (this.state.filters.track.indexOf(value) > -1) {
				//it does so remove
				tracks.splice(tracks.indexOf(value), 1);
			} else {
				//it doesn't so add
				tracks.push(value);
			}
			if (tracks.length < 1) {
				//tracks now empty so convert to -1
				tracks.push(-1);
			}
		}
		this.setState((prevState) => {
			prevState.filters.track = tracks;
			return prevState;
		});
	};
	setDay = (value = -1) => {
		this.setState((prevState) => {
			prevState.filters.day = value;
			return prevState;
		});
	};
	setQuery = (value = "") => {
		value = value.toLowerCase();
		this.setState((prevState) => {
			prevState.filters.query = value;
			return prevState;
		});
	};
	filterTracks = (sessions) => {
		//remove tracks from that are in filters.track
		this.state.filters.track.forEach((track) => {
			while (sessions.find((session) => session.Track_Number__c == track) != undefined) {
				let session = sessions.find((session) => session.Track_Number__c == track);
				sessions.splice(sessions.indexOf(session), 1);
			}
		});
		return sessions;
	};
	filterDays = (sessions) => {
		if (this.state.filters.day != -1) {
			return sessions.filter((session) => {
				return session.Day__c == this.state.filters.day;
			});
		} else {
			return sessions;
		}
	};
	filterQuery = (sessions) => {
		if (this.state.filters.query == "") {
			return sessions;
		}
		return sessions.filter((session) => {
			//top level
			if (
				lowercase(session.Long_Name__c).includes(this.state.filters.query) ||
				lowercase(session.Synopsis__c).includes(this.state.filters.query)
			) {
				return true;
			} else if (session.presentations.length > 0) {
				if (
					session.presentations.find((presentation) => {
						if (
							lowercase(presentation.Company__c).includes(this.state.query) ||
							lowercase(presentation.First_Name__c).includes(this.state.query) ||
							lowercase(presentation.Last_Name__c).includes(this.state.query)
						) {
							return true;
						}
					}) != undefined
				) {
					return true;
				}
			}
		});
		function lowercase(input) {
			if (typeof input == "string") {
				input = input.toLowerCase();
			}
			return input;
		}
	};
	getSlides = (data) => {
		if (data == null) {
			return;
		}
		console.log("get slides");
		console.log(data);
		let slides = data.map((session, index) => {
			return (
				<Slide
					session={session}
					windowwidth={this.props.options.windowwidth}
					continent={this.props.options.continent}
					key={`slide-${index + 1}`}
					open={this.state.openSessions}
				/>
			);
		});
		return (
			<div className="accordion accordion-flush conference-agenda__sessions" id="conference-agenda__sessions">
				{slides}
			</div>
		);
	};
	getOptionalFilters = (adFilterList) => {
		if (!adFilterList) {
			return;
		} else {
			return (
				<>
					<h3>Filters</h3>
					{adFilterList.map((filter, index) => {
						filter = `Filter ${index}`;
						return filter;
					})}
				</>
			);
		}
	};
	getDayButtons = (numberOfDays) => {
		let colNum = 12 / numberOfDays;
		let index = 0;
		let dayButtons = [];
		for (index = 0; index < numberOfDays; index++) {
			dayButtons.push(
				<div className={`col-${colNum}`}>
					<MainNavButton
						options={this.props.options}
						key={`day-button-${index + 1}`}
						active={index + 1 == this.state.filters.day}
						value={index + 1}
						handler={this.setDay}>
						{this.props.options.daynameoverride == undefined || this.props.windowwidth < 992
							? `Day ${index + 1}`
							: `Day ${index + 1} - ${this.props.daynameoverride[index]}`}
					</MainNavButton>
				</div>
			);
		}
		return <>{dayButtons}</>;
	};
	getTrackButtons = (sessions, numberOfTracks) => {
		let i = 0;
		let buttons = [];
		for (i = 0; i < numberOfTracks; i++) {
			let trackName = sessions.find((session) => session.Track_Number__c == i + 1).Track_Long_Title__c;
			buttons.push(
				<CheckBoxFilter
					name={trackName}
					class={`track-${i + 1}`}
					handler={this.setTrack}
					value={i + 1}
					key={`checkboxfilter ${i + 1}`}
					checked={this.state.filters.track.indexOf(i + 1) > -1 ? false : true}
				/>
			);
		}
		return <>{buttons}</>;
	};

	normaliseTimeStamps = (sessions) => {
		return sessions.map((session, index) => {
			let timestamp = session.Start_Time__c;
			let day = timestamp.substring(8, 10);
			let hour = timestamp.substring(11, 13);
			let minute = timestamp.substring(14, 16);
			let ampm = hour > 11 ? "PM" : "AM";
			session.normalTime = { day: day, hour: hour, minute: minute, ampm: ampm };
			/*if(index + 1 !== sessions.length ){
				let nextTimestamp = sessions[index + 1];
			} else{
				let session.endNormalTime = -1;
			}*/
			return session;
		});
	};

	getFullAgenda = (pipedSessions) => {
		console.log(this.state);
		//output jsx
		return (
			<section className={`conference-agenda conference-agenda--${this.props.options.show}`}>
				<MainNav desktop={this.props.options.windowwidth > 992}>
					<div className="main-nav__days">
						<div className="container">
							<div className="row">{this.getDayButtons(this.state.metaNumbers.day)}</div>
						</div>
					</div>
					<div className="main-nav__tracks">
						<div className="container">
							{this.props.options.windowwidth > 992 ? (
								<div className="row">
									<div className="col-8 track-col">{this.getTrackButtons(this.state.sessions, this.state.metaNumbers.track)}</div>
									<div className="col-4 control-col">
										<Cta
											key="cta expand"
											curved={false}
											active={this.state.openSessions}
											color="primary"
											handler={this.toggleSessions}
											role="expand">
											Expand all
										</Cta>
										<Cta
											key="cta collapse"
											curved={false}
											active={!this.state.openSessions}
											color="primary"
											handler={this.toggleSessions}
											role="collapse">
											Collapse all
										</Cta>
									</div>
								</div>
							) : (
								<>
									<div className="row ">
										<div className="col-12">{this.getTrackButtons(this.state.sessions, this.state.metaNumbers.track)}</div>
									</div>
									<div className="row">
										<div className="col-12">
											<Cta
												key="cta expand"
												curved={false}
												active={this.state.openSessions}
												color="primary"
												handler={this.toggleSessions}
												value={[true, true]}>
												Expand all
											</Cta>
											<Cta
												key="cta collapse"
												curved={false}
												active={!this.state.openSessions}
												color="primary"
												handler={this.toggleSessions}
												value={[true, false]}>
												Collapse all
											</Cta>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</MainNav>
				<Body>
					<div className="container">
						<div className="row">
							{this.props.options.windowwidth > 992 ? (
								<>
									<div className="col-8">{this.getSlides(pipedSessions)}</div>
									<div className="col-4">
										<StickyNav>
											<h3>Search</h3>
											<SearchInput handler={this.setQuery} value={this.state.filters.query} />
											{this.props.options.convincepdf != undefined ? (
												<Cta key="cta convince your boss" size="max" color="primary">
													CONVINCE YOUR BOSS
												</Cta>
											) : (
												""
											)}
											{this.props.options.downloadagenda != undefined ? (
												<Cta key="cta pdf agenda" size="max" color="primary">
													DOWNLOAD PDF AGENDA
												</Cta>
											) : (
												""
											)}
											{this.props.options.reglink != undefined ? (
												<Cta key="cta reg button" size="max">
													REGISTER FOR FREE
												</Cta>
											) : (
												""
											)}
											{this.getOptionalFilters(this.props.options.additionalfilters)}
										</StickyNav>
									</div>
								</>
							) : (
								<div className="col-12">{this.getSlides(pipedSessions)}</div>
							)}
						</div>
					</div>
				</Body>
			</section>
		);
	};

	sfGet = async (id, mode = "full-agenda") => {
		if (mode == "full-agenda") {
			let url = `./rest/confman.php?call[]=presentation&call[]=session&confId=${id}`;
			try {
				let response = await fetch(url, {
					method: "GET", // *GET, POST, PUT, DELETE, etc.
					mode: "same-origin", // no-cors, *cors, same-origin
					cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
					credentials: "same-origin", // include, *same-origin, omit
					headers: {
						"Content-Type": "application/json",
					},
				});
				let sessions;
				await response.json().then((data) => {
					//match presentations to sessions
					let presentations = data.presentation;
					data = data.session.map((session) => {
						//check if any presentations match the session id
						session.presentations = [];
						while (presentations.find((presentation) => presentation.Session__c == session.Id) != undefined) {
							let found = presentations.find((presentation) => {
								return presentation.Session__c == session.Id;
							});
							let index = presentations.indexOf(found);
							if (index > -1) {
								presentations.splice(index, 1);
							}
							session.presentations.push(found);
						}
						return session;
					});
					sessions = data;
				});
				return sessions;
			} catch (e) {
				console.error(e);
				return e;
			}
		}
	};

	componentDidMount = () => {
		//Initial loading
		switch (this.props.options.mode) {
			case "full-agenda":
				this.sfGet(this.props.options.conf, "full-agenda").then((data) => {
					console.log("Returned");
					console.log(data);
					let maxTracks = 0;
					let maxDays = 0;
					data.forEach((session) => {
						if (session.Day__c > maxDays) {
							maxDays = session.Day__c;
						}
						if (session.Track_Number__c > maxTracks) {
							maxTracks = session.Track_Number__c;
						}
					});
					//order by time
					data = data.sort((a, b) => {
						if (a.Day__c > b.Day__c) {
							return 1;
						}
						if (a.Day__c < b.Day__c) {
							return -1;
						}
						return 0;
					});
					data = this.normaliseTimeStamps(data);
					data = data.sort((a, b) => {
						if (a.normalTime.hour + a.normalTime.minute > b.normalTime.hour + b.normalTime.minute) {
							return 1;
						}
						if (a.normalTime.hour + a.normalTime.minute < b.normalTime.hour + b.normalTime.minute) {
							return 1;
						}
						return 0;
					});
					data = data.map((session) => {
						session.Synopsis__c = session.Synopsis__c == null ? "" : session.Synopsis__c;
						return session;
					});
					this.setState((prevState) => {
						prevState.sessions = data;
						prevState.mode = this.props.options.mode;
						prevState.metaNumbers = { track: maxTracks, day: maxDays };
						prevState.loading = false;
						return prevState;
					});
				});
				break;
		}
	};

	render() {
		if (this.state.loading) {
			return (
				<div className="conference-agenda conference-agenda--loading d-flex justify-content-center align-items-center">
					<Spinner />
				</div>
			);
		} else {
			if (this.state.sessions != null) {
				return this.getRenderList();
			}
		}
	}
}
export default App;
