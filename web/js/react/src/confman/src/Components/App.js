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
			metaNumbers: null,
			renderList: null,
			//if a filter is -1 ignore
			filters: {
				track: -1,
				day: -1,
			},
		};
	}
	getRenderList = () => {
		if (this.props.options.mode === "full-agenda") {
			let pipedSessions = this.pipeSessions([], this.state.sessions);
			return this.getFullAgenda(pipedSessions);
		}
	};

	pipeSessions = (filterFunctions = [], pipedSessions) => {
		if (filterFunctions.length >= 1) {
			filterFunctions.forEach((filter) => {
				pipedSessions = filter(pipedSessions);
			});
		}
		return pipedSessions;
	};
	setTrack = (value = -1) => {
		this.setState((prevState) => {
			prevState.filters.track = value;
			return prevState;
		});
	};
	setDay = (value = -1) => {
		this.setState((prevState) => {
			prevState.filters.day = value;
			return prevState;
		});
	};

	getSlides = (data) => {
		if (data == null) {
			return;
		}
		console.log("get slides");
		console.log(data);
		let slides = data.map((session, index) => {
			return <Slide session={session} key={`slide-${index + 1}`} />;
		});
		return (
			<div className="accordion accordion-flush conference-agenda__sessions" id="accordionFlushExample">
				{slides}
			</div>
		);
	};
	getOptionalFilters = (adFilterList) => {
		if (adFilterList != undefined) {
			return;
		}
	};
	getDayButtons = (numberOfDays) => {
		let colNum = 12 / numberOfDays;
		let index = 0;
		let dayButtons = [];
		for (index = 0; index < numberOfDays; index++) {
			dayButtons.push(
				<div className={`col-${colNum}`}>
					<MainNavButton options={this.props.options} key={`day-button-${index + 1}`}>
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
			buttons.push(<CheckBoxFilter name={trackName} class={`track-${i + 1}`} handler={this.setTrack} key={`checkboxfilter ${i + 1}`} />);
		}
		return <>{buttons}</>;
	};

	normaliseTimeStamps = (sessions) => {
		let returner = sessions.map((session) => {
			let timestamp = session.Start_Time__c;
			let day = timestamp.substring(8, 10);
			let hour = timestamp.substring(11, 13);
			let minute = timestamp.substring(14, 16);
			let ampm = hour > 11 ? "PM" : "AM";
			session.normalTime = { day: day, hour: hour, minute: minute, ampm: ampm };
			return session;
		});
		return returner;
	};

	getFullAgenda = (pipedSessions) => {
		console.log(this.state);
		//output jsx
		return (
			<section className={`conference-agenda conference-agenda--${this.props.options.show}`}>
				<MainNav desktop={this.props.windowwidth > 992}>
					<div className="container">
						<div className="row">{this.getDayButtons(this.state.metaNumbers.day)}</div>
					</div>
					<div className="container">
						{this.props.options.windowwidth > 992 ? (
							<div className="row main-nav__desktop">
								<div className="col-9">{this.getTrackButtons(this.state.sessions, this.state.metaNumbers.track)}</div>
								<div className="col-3">
									<Cta key="cta expand" curved="false" active="true">
										Expand all
									</Cta>
									<Cta key="cta collapse" curved="false" active="true">
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
										<Cta key="cta expand" curved="false">
											Expand all
										</Cta>
										<Cta key="cta collapse" curved="false">
											Collapse all
										</Cta>
									</div>
								</div>
							</>
						)}
					</div>
				</MainNav>
				<Body>
					<div className="container">
						<div className="row">
							{this.props.options.windowwidth > 992 ? (
								<>
									<div className="col-9">{this.getSlides(pipedSessions)}</div>
									<div className="col-3">
										<StickyNav>
											<SearchInput />
											{this.props.options.convincepdf != undefined ? (
												<Cta key="cta convince your boss" curved="true">
													CONVINCE YOUR BOSS
												</Cta>
											) : (
												""
											)}
											{this.props.options.downloadagenda != undefined ? (
												<Cta key="cta pdf agenda" curved="true">
													DOWNLOAD PDF AGENDA
												</Cta>
											) : (
												""
											)}
											{this.props.options.reglink != undefined ? (
												<Cta key="cta reg button" curved="true">
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
