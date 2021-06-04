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
import Letter from "./Letter";
import SpeakerSlide from "./SpeakerSlide";

class App extends React.Component {
	constructor(props) {
		super(props);
		let filtersObj;
		switch (props.options.show) {
			case "CEX":
				//if a filter is -1 ignore
				filtersObj = {
					track: [2], //ignore these tracks
					day: 1, //inverse of this ^^
					query: "",
					letter: "-1",
				};
				break;
			default:
				//if a filter is -1 ignore
				filtersObj = {
					track: [-1], //ignore these tracks
					day: 1, //inverse of this ^^
					query: "",
					letter: "-1",
				};
				break;
		}
		this.state = {
			mode: props.options.mode,
			initialLoad: true,
			sessions: null,
			speakers: null,
			metaNumbers: null,
			filters: filtersObj,
			openSessions: false,
			dealtWithInitialParams: false,
			queryKey: 0, //for forcing state resets on search components
		};
	}
	getRenderList = () => {
		switch (this.state.mode) {
			case "full-agenda":
				let deepCloneSessions = JSON.parse(JSON.stringify(this.state)).sessions;
				let pipedSessions = this.pipeSessions([this.filterDays, this.filterTracks, this.filterQuery, this.filterBreaks], deepCloneSessions);
				return this.getFullAgenda(pipedSessions);
			case "speaker-list":
				let deepCloneSpeakers = JSON.parse(JSON.stringify(this.state)).speakers;
				let pipedSpeakers = this.pipeSpeakers([this.filterAlphabet, this.filterQuery], deepCloneSpeakers);
				return this.getSpeakerList(pipedSpeakers);
				break;
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
	pipeSpeakers = (filterFunctions = [], speakers) => {
		if (filterFunctions.length >= 1) {
			filterFunctions.forEach((filter) => {
				speakers = filter(speakers);
			});
		}
		return speakers;
	};
	toggleSessions = (open) => {
		this.setState((prevState) => {
			prevState.openSessions = open;
			return prevState;
		});
	};
	/**
	 *
	 * Setters
	 */
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
	setMode = (mode = "full-agenda") => {
		this.setState((prevState) => {
			prevState.mode = mode;
			return prevState;
		});
		this.getConfman();
	};
	setLetter = (value = -1) => {
		this.setState((prevState) => {
			prevState.filters.letter = value.toLowerCase();
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
	/**
	 * Filters
	 */
	resetFilters = () => {
		this.setState((prevState) => {
			prevState.openSessions = false;
			prevState.filters = {
				track: [-1],
				day: 1,
				query: "",
				letter: "-1",
			};
			prevState.queryKey++;
			return prevState;
		});
	};
	filterBreaks = (sessions) => {
		//Stop break sessions from stacking up
		for (let index = 0; index < sessions.length; index++) {
			const session = sessions[index];
			if (index + 1 < sessions.length) {
				if (session.Type__c == "Break") {
					if (sessions[index + 1].Type__c == "Break" && sessions[index].Start_Time__c == session.Start_Time__c) {
						sessions.splice(sessions.indexOf(session), 1);
					}
				}
			}
		}
		return sessions;
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
	filterAlphabet = (data) => {
		if (this.state.filters.letter == "-1") {
			return data;
		} else {
			return data.filter((item) => {
				return (
					lowercase(item.Last_Name__c).charAt(0) == this.state.filters.letter ||
					lowercase(item.Company__c).charAt(0) == this.state.filters.letter
				);
			});
		}
		function lowercase(input) {
			if (typeof input == "string") {
				input = input.toLowerCase();
			}
			return input;
		}
	};
	filterQuery = (data) => {
		if (this.state.filters.query == "") {
			return data;
		}
		if (this.state.mode == "full-agenda") {
			return data.filter((session) => {
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
		} else if (this.state.mode == "speaker-list") {
			return data.filter((speaker) => {
				return (
					lowercase(speaker.First_Name__c).includes(this.state.filters.query) ||
					lowercase(speaker.Last_Name__c).includes(this.state.filters.query) ||
					lowercase(speaker.Company__c).includes(this.state.filters.query)
				);
			});
		}
		function lowercase(input) {
			if (typeof input == "string") {
				input = input.toLowerCase();
			}
			return input;
		}
	};
	/**
	 * Getters
	 */
	getSlides = (data) => {
		if (data == null) {
			return;
		}
		if (data.length > 0) {
			let slides = data.map((session, index) => {
				return (
					<Slide
						session={session}
						windowwidth={window.innerWidth}
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
		} else {
			return (
				<div className="conference-agenda__sessions sessions--error-message">
					<h2>No sessions found</h2>
				</div>
			);
		}
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
						{this.props.options.daynameoverride == undefined || window.innerWidth < 992
							? `Day ${index + 1}`
							: `Day ${index + 1} - ${this.props.options.daynameoverride[index]}`}
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
			return session;
		});
	};
	getModal = (data, role = false) => {
		let modal = $.parseHTML(
			'<div class="modal fade" id="modal modal--speaker-list" role="dialog" tabindex="-1" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"></div></div></div></div>'
		);
		if (role == false) {
			console.error("Role on getModal not set");
		} else if (role == "speaker-modal") {
			let sessionsHtml;
			data.sessions.forEach((session) => {
				let sessionType;
				sessionType = session.roll;
				let link = `${this.props.options.fullagendalocation}?session-id=${session.id}&day=${session.day}`;
				sessionsHtml = `<p><a href="${link}" title="${session.name}">${session.name}</a></p>`;
			});
			console.log(sessionsHtml);
			let modalBody = `<div class="container"><div class="row"><div class="col-12 col-md-2"><img src="${data.Head_Shot_URL__c}" class="img-fluid" alt="${data.First_Name__c} ${data.Last_Name__c}" /></div><div class="col-12 col-md-6"><p style="font-weight: bold;">${data.First_Name__c} ${data.Last_Name__c},</p><p>${data.Job_Title__c},</p><p style="font-weight: bold;">${data.Company__c}</p></div><div class="col-12 col-md-4"><img src="${data.Logo_URL__c}" class="img-fluid" alt="${data.Company__c}" /></div></div><div class="row"><div class="col-12"><h3 style="margin-top: 10px;">Speaker Bio</h3><p>${data.Speaker__r.Biography__c}</p><h3>Speaking at:</h3><div class="sessions">${sessionsHtml}</div></div></div></div>`;
			$(modal).find(".modal-body").append(modalBody);
			$("body").append(modal);
			let myModal = new bootstrap.Modal(document.getElementById("modal modal--speaker-list"));
			myModal.show();
		}
	};
	speakerMerge = (originalSpeakers) => {
		//merge multiple sessions onto one speaker
		const referenceSpeakers = JSON.parse(JSON.stringify(originalSpeakers));
		let outputArray = []; //will container unqique speaker__c

		for (let i = 0; i < referenceSpeakers.length; i++) {
			let element = referenceSpeakers[i];
			if (
				undefined !=
				outputArray.find((speaker) => {
					return element.Speaker__r.Id == speaker.Speaker__r.Id;
				})
			) {
				//array already contains this speaker
				//Push session data to array
				let currentSpeaker = outputArray.find((speaker) => {
					return element.Speaker__r.Id == speaker.Speaker__r.Id;
				});
				let index = outputArray.indexOf(currentSpeaker);
				outputArray[index].sessions.push({
					roll: element.Roll__c,
					id: referenceSpeakers[i].Session__r.Id,
					day: referenceSpeakers[i].Session__r.Day__c,
					name: referenceSpeakers[i].Session__r.Name,
					start: referenceSpeakers[i].Session__r.Start_Time__c,
					track: referenceSpeakers[i].Session__r.Track_Number__c,
				});
			} else {
				//array doesn't container this speaker__c
				element.sessions = [];
				element.sessions.push({
					roll: element.Roll__c,
					id: referenceSpeakers[i].Session__r.Id,
					day: referenceSpeakers[i].Session__r.Day__c,
					name: referenceSpeakers[i].Session__r.Name,
					start: referenceSpeakers[i].Session__r.Start_Time__c,
					track: referenceSpeakers[i].Session__r.Track_Number__c,
				});
				outputArray.push(element);
			}
		}
		return outputArray;
	};
	getLetters = () => {
		let alphabet = "View All|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z".split("|");
		alphabet = alphabet.map((letter, index) => {
			if (letter == "View All") {
				return (
					<Letter handler={this.setLetter} value="-1" key={`letter-View-all`}>
						{letter}
					</Letter>
				);
			} else {
				return (
					<Letter handler={this.setLetter} value={letter} key={`letter-${letter}`}>
						{letter}
					</Letter>
				);
			}
		});
		if ((this.state.mode = "speaker-list")) {
			return <ul>{alphabet}</ul>;
		}
	};
	getSpeakerSlides = (speakers) => {
		if (speakers.length > 0) {
			return speakers.map((speaker, index) => {
				return <SpeakerSlide id={speaker.Id} speaker={speaker} key={`speaker-${speaker.Id}`} modalHandler={this.getModal} />;
			});
		} else {
			return <h2>No Speakers Found</h2>;
		}
	};
	getSpeakerList = (pipedSpeakers) => {
		//output jsx
		return (
			<section className={`confman speaker-list speaker-list--${this.props.options.show}`}>
				<MainNav desktop={window.innerWidth > 992}>
					<div className="container">
						<div className="row">
							<div className="col-12 col-lg-10">
								<SearchInput
									handler={this.setQuery}
									placeholder="Refine By Speaker Or Company Name"
									key="search"
									value={this.state.filters.query}
									key={`search-${this.state.queryKey}`}
								/>
							</div>
							<div className="col-12 col-lg-2">
								<Cta key="cta speaker-clear" curved={false} color="black" handler={this.resetFilters} margin="vertical-margin--0">
									CLEAR SEARCH
								</Cta>
							</div>
						</div>
					</div>
					<div className="container speaker-list__alphabet">
						<div className="row">
							<div className="col-12">{this.getLetters()}</div>
						</div>
					</div>
				</MainNav>
				<Body>
					<div className="container speaker-list__slide-list">{this.getSpeakerSlides(pipedSpeakers)}</div>
				</Body>
			</section>
		);
	};
	getFullAgenda = (pipedSessions) => {
		//output jsx
		return (
			<section className={`confman conference-agenda conference-agenda--${this.props.options.show}`}>
				<MainNav desktop={window.innerWidth > 992}>
					<div className="main-nav__days">
						<div className={`container${window.innerWidth < 992 ? "-fluid" : ""}`}>
							<div className="row">{this.getDayButtons(this.state.metaNumbers.day)}</div>
						</div>
					</div>
					<div className="main-nav__tracks">
						{window.innerWidth > 992 ? (
							<div className="container">
								<div className="row">
									<div className="col-9 track-col">{this.getTrackButtons(this.state.sessions, this.state.metaNumbers.track)}</div>
									<div className="col-3 control-col">
										<Cta
											key="cta expand"
											curved={false}
											active={this.state.openSessions}
											color="primary"
											handler={this.toggleSessions}
											role="expand"
											value={true}>
											Expand all
										</Cta>
										<Cta
											key="cta collapse"
											curved={false}
											active={!this.state.openSessions}
											color="primary"
											handler={this.toggleSessions}
											role="collapse"
											value={false}>
											Collapse all
										</Cta>
									</div>
								</div>
							</div>
						) : (
							<>
								<div className="container-fluid tracks__mob-control">
									<div className="row">
										<div className="col-12 control-col">
											<Cta
												key="cta expand"
												curved={false}
												active={this.state.openSessions}
												color="primary"
												handler={this.toggleSessions}
												role="expand"
												value={true}>
												Expand all
											</Cta>
											<Cta
												key="cta collapse"
												curved={false}
												active={!this.state.openSessions}
												color="primary"
												handler={this.toggleSessions}
												role="collapse"
												value={false}>
												Collapse all
											</Cta>
										</div>
									</div>
								</div>
								<div className="container-fluid tracks__mob-tracks">
									<div className="row ">
										<div className="col-12 track-col">
											{this.getTrackButtons(this.state.sessions, this.state.metaNumbers.track)}
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</MainNav>
				<Body>
					{window.innerWidth > 992 ? (
						<div className="container">
							<div className="row">
								<div className="col-8">{this.getSlides(pipedSessions)}</div>
								<div className="col-4">
									<StickyNav>
										<div className="side-nav__search">
											<h3>Search</h3>
											<Cta
												key="cta reset"
												size="micro"
												color="black"
												curved={false}
												margin="vertical-margin--0"
												handler={this.resetFilters}>
												CLEAR FILTERS
											</Cta>
										</div>
										<SearchInput handler={this.setQuery} role="conference-search" key={`search-${this.state.queryKey}`} />
										{this.props.options.convincepdf != undefined && this.props.options.convincepdf != "" ? (
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
										{this.props.options.reglink != undefined && this.props.options.reglink != "" ? (
											<Cta key="cta reg button" size="max" link={this.props.options.reglink}>
												REGISTER FOR FREE
											</Cta>
										) : (
											""
										)}
										{this.props.options.reginterest != undefined && this.props.options.reginterest != "" ? (
											<Cta
												key="cta reg interest"
												size="max"
												role="pop-form"
												link={this.props.options.reginterest}
												value={this.props.options}>
												REGISTER INTEREST
											</Cta>
										) : (
											""
										)}
										{this.getOptionalFilters(this.props.options.additionalfilters)}
									</StickyNav>
								</div>
							</div>
						</div>
					) : (
						<div className="container-fluid">
							<div className="row">
								<div className="col-12">{this.getSlides(pipedSessions)}</div>
							</div>
						</div>
					)}
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
						session.presentations = session.presentations.sort((a, b) => {
							if (a.Order__c > b.Order__c) {
								return 1;
							}
							if (a.Order__c < b.Order__c) {
								return -1;
							}
							return 0;
						});
						return session;
					});

					sessions = data;
				});
				return sessions;
			} catch (e) {
				console.error(e);
				return e;
			}
		} else if (mode == "speaker-list") {
			let url = `./rest/confman.php?call[]=presentation&confId=${id}`;
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
				let presentations;
				await response.json().then((data) => {
					presentations = data;
				});
				return presentations;
			} catch (e) {
				console.error(e);
				return e;
			}
		}
	};
	getConfman = () => {
		switch (this.state.mode) {
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
					//order by day
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
						if (a.Day__c == b.Day__c) {
							if (a.normalTime.hour + a.normalTime.minute > b.normalTime.hour + b.normalTime.minute) {
								return 1;
							}
							if (a.normalTime.hour + a.normalTime.minute < b.normalTime.hour + b.normalTime.minute) {
								return -1;
							}
							return 0;
						}
						return 0;
					});

					data = data.map((session) => {
						session.Synopsis__c = session.Synopsis__c == null ? "" : session.Synopsis__c;
						return session;
					});
					this.setState((prevState) => {
						prevState.sessions = data;
						prevState.metaNumbers = { track: maxTracks, day: maxDays };
						prevState.initialLoad = false;
						return prevState;
					});
				});
				break;
			case "speaker-list":
				this.sfGet(this.props.options.conf, "speaker-list").then((data) => {
					console.log(data.presentation);

					data = this.speakerMerge(data.presentation);
					console.log(data);
					data = data.sort((a, b) => {
						if (a.Last_Name__c < b.Last_Name__c) {
							return -1;
						}
						if (a.Last_Name__c > b.Last_Name__c) {
							return 1;
						}
						return 0;
					});
					this.setState((prevState) => {
						prevState.speakers = data;
						prevState.initialLoad = false;
						return prevState;
					});
				});
				break;
		}
	};
	componentDidMount = () => {
		//Initial loading
		this.getConfman();
	};

	componentDidUpdate = () => {
		if (!this.state.dealtWithInitialParams) {
			if (this.props.options.parameters !== null) {
				//zap to session
				if (
					undefined !=
						this.props.options.parameters.find((param) => {
							return param[0] == "session-id";
						}) &&
					null != this.state.sessions
				) {
					let sessionid = this.props.options.parameters.find((param) => {
						return param[0] == "session-id";
					})[1];
					let day = this.props.options.parameters.find((param) => {
						return param[0] == "day";
					})[1];
					console.log(this.props.options.parameters);
					console.log(day);
					if (this.state.filters.day != day) {
						this.setState(
							(prevState) => {
								prevState.filters.day = day;
								return prevState;
							},
							() => {
								const el = document.querySelector(`#${sessionid} .session__anchor`);
								el.scrollIntoView({ behavior: "smooth" });
							}
						);
					} else {
						const el = document.querySelector(`#${sessionid} .session__anchor`);
						el.scrollIntoView({ behavior: "smooth" });
					}
				}
			}
			this.setState((prevState) => {
				prevState.dealtWithInitialParams = true;
				return prevState;
			});
		}
	};

	render() {
		if (this.state.initialLoad) {
			return (
				<div className="confman conference-agenda conference-agenda--loading d-flex justify-content-center align-items-center">
					<Spinner />
				</div>
			);
		} else {
			if (this.state.mode == "full-agenda" && this.state.sessions != null) {
				if (this.state.sessions != null) {
					return this.getRenderList();
				} else {
					return (
						<div className="confman conference-agenda conference-agenda--loading d-flex justify-content-center align-items-center">
							<Spinner />
						</div>
					);
				}
			} else if (this.state.mode == "speaker-list") {
				if (this.state.speakers != null) {
					return this.getRenderList();
				} else {
					return (
						<div className="confman conference-agenda conference-agenda--loading d-flex justify-content-center align-items-center">
							<Spinner />
						</div>
					);
				}
			}
		}
	}
}
export default App;
