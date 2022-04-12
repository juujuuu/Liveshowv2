import React, { useEffect } from "react";
import { connect } from "react-redux";

import Body from "../../../common_components/Body";
import Cta from "../../../common_components/Cta";
import Spinner from "../../../common_components/Spinner";
import StickyNav from "../../../common_components/StickyNav";
import SearchInput from "../../../common_components/SearchInput";

import MainNav from "./MainNav";
import MainNavButton from "./MainNavButton";
import Slide from "./Slide";
import CheckBoxFilter from "./CheckBoxFilter";

import getConfPdfLink from "../Utils/getConfPdf";
import { getSiteFromAcronym } from "../Utils/getSite";

import {
	fetchConference,
	setLoading,
	setOpenSlides,
	setDay,
	setTrack,
	setLetter,
	setDealtWithInitialParams,
	setQuery,
	resetFiltersAction,
	setError,
} from "../Actions";
import getModal from "../Utils/getModal";
import { getOnDemandCode } from "../Utils/getOnDemand";

const FullAgenda = props => {
	const {
		loading,
		fetchConference,
		sessions,
		options,
		setLoading,
		setQuery,
		setLetter,
		setDay,
		setTrack,
		maxTracks,
		maxDays,
		openSlides,
		dealtWithInitialParams,
		setDealtWithInitialParams,
		setOpenSlides,
		filters,
		setError,
		resetFiltersAction,
	} = props;

	const {
		conf,
		show,
		convincepdf,
		downloadagenda,
		reglink,
		reginterest,
		additionalfilters,
		generalenquiry,
		topNav,
		daynameoverride,
		ondemand,
		continent,
		parameters,
	} = options;

	useEffect(() => {
		if (loading) {
			fetchConference(getSiteFromAcronym(show), conf).then(response => {
				setLoading(false);
			});
			///if (null !== parameters) {
			if (show === "SPC" || show === "NZB") {
				setDay(0);
			}
			//}
			if (ondemand) {
				getModal({ role: "on-demand-modal", odcode: getOnDemandCode(show) });
			}
		}
	}, []);
	useEffect(() => {
		if (!dealtWithInitialParams && !loading) {
			if (parameters.find(param => param[0] == "session-id")) {
				const [name, sessionId] = parameters.find(param => param[0] == "session-id");

				try {
					const sessionDay = sessions.find(_session => _session.Id === sessionId).Day__c;
					setDay(sessionDay);
					setDealtWithInitialParams(true);
					setOpenSlides(true);
					setTimeout(() => {
						const el = document.querySelector(`#${sessionId} .session__anchor`);
						el.scrollIntoView({ behavior: "smooth" });
					}, 0);
				} catch (error) {
					console.error("Problem trying to load session param", error);
					setError(true);
				}
			}
		}
	}, [loading]);

	const getDayButtons = numberOfDays => {
		let colNum = 12 / numberOfDays;
		let index = 0;
		let dayButtons = [];
		for (index = 0; index < numberOfDays; index++) {
			dayButtons.push(
				<div className={`col-${colNum}`}>
					<MainNavButton
						options={options}
						key={`day-button-${index + 1}`}
						active={filters.day === index + 1}
						value={index + 1}
						handler={setDay}>
						{/* {daynameoverride == undefined || window.innerWidth < 992
							? `Day ${index + 1}`
							: `Day ${index + 1} - ${daynameoverride[index]}`} */}
						{daynameoverride[index]}
					</MainNavButton>
				</div>
			);
		}
		return <>{dayButtons}</>;
	};

	const getTrackButtons = numberOfTracks => {
		let i = 0;
		let buttons = [];
		for (i = 0; i < numberOfTracks; i++) {
			let trackName = sessions.find(session => session.Track_Number__c == i + 1).Track_Long_Title__c;
			buttons.push(
				<CheckBoxFilter
					name={trackName}
					inputClass={`track-${i + 1}`}
					handler={setTrack}
					value={i + 1}
					key={`checkboxfilter ${i + 1}`}
					checked={!filters.track.includes(i + 1)}
				/>
			);
		}
		return <>{buttons}</>;
	};

	const getSlides = data => {
		if (data == null) {
			return;
		}
		if (data.length > 0) {
			let slides = data.map((session, index) => (
				<Slide session={session} windowwidth={window.innerWidth} key={`slide-${index + 1}`} />
			));
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

	const resetFilters = () => {
		setOpenSlides(false);
		resetFiltersAction();
		document.getElementById("confman__search").value = "";
	};

	const filterDays = inputSessions => {
		const { day } = filters;
		if (day !== 0) {
			return inputSessions.filter(session => day === session.Day__c);
		} else {
			return inputSessions;
		}
	};

	const filterTracks = inputSessions => {
		const { track: excludeTracks } = filters;
		if (excludeTracks.length > 0) {
			return inputSessions.filter(session => !excludeTracks.includes(session.Track_Number__c));
		} else {
			return inputSessions;
		}
	};

	const filterQuery = inputSessions => {
		let { query } = filters;
		query = query.toLowerCase();
		if (query !== "") {
			//Check session
			return inputSessions.filter(session => {
				let { Long_Name__c: sessionName, Synopsis__c: sessionSynopsis, presentations } = session;
				sessionName = sessionName.toLowerCase();
				sessionSynopsis = sessionSynopsis.toLowerCase();
				if (sessionName.includes(query) || sessionSynopsis.includes(query)) {
					return true;
				}
				//Check Presentation
				if (presentations.length > 0) {
					const found = presentations.find(presentation => {
						let { Company__c, First_Name__c, Last_Name__c } = presentation;
						Company__c = Company__c.toLowerCase();
						First_Name__c = First_Name__c.toLowerCase();
						Last_Name__c = Last_Name__c.toLowerCase();
						if (
							Company__c.includes(query) ||
							First_Name__c.includes(query) ||
							Last_Name__c.includes(query)
						) {
							return true;
						}
					});
					return found !== undefined;
				}
				return false;
			});
		} else {
			return inputSessions;
		}
	};

	const filterBreaks = inputSessions => {
		inputSessions = [...inputSessions];
		//Stop break sessions from stacking up
		for (let index = 0; index < inputSessions.length; index++) {
			const session = inputSessions[index];
			if (index + 1 < inputSessions.length) {
				if (session.Type__c == "Break") {
					if (
						inputSessions[index + 1].Type__c == "Break" &&
						inputSessions[index].Start_Time__c == inputSessions[index + 1].Start_Time__c
					) {
						inputSessions = inputSessions.filter((inputSession, _index) => _index !== index);
						//inputSessions.splice(inputSessions.indexOf(inputSessions), 1);
					}
				}
			}
		}
		return inputSessions;
	};

	const runFilters = inputSessions => {
		inputSessions = [...inputSessions];
		inputSessions = filterDays(inputSessions);
		inputSessions = filterTracks(inputSessions);
		inputSessions = filterQuery(inputSessions);
		inputSessions = filterBreaks(inputSessions);
		return inputSessions;
	};

	const getUIThemes = (show, day) => {
		let theme = [];
		switch (show) {
			case "FMX":
				switch (day) {
					case 1:
						theme.push("Plenary Mega Trends / Supply Chain Strategy");
						theme.push("Mega Trends");
						break;
					case 2:
						theme.push("Application Development");
						theme.push("Regulations and Sustainability");
						break;
					case 3:
						theme.push("Material Selection and Interaction");
						theme.push("Process Optimization");
						break;
				}
				return (
					<div>
						<p style={{ fontSize: "16px" }}>
							<strong>
								<span style={{ color: "#d52c60" }}>Track 1 Theme</span> - {theme[0]}
							</strong>
						</p>
						<p style={{ fontSize: "16px" }}>
							<strong>
								<span style={{ color: "#5bb7ce" }}>Track 2 Theme</span> - {theme[1]}
							</strong>
						</p>
					</div>
				);
			case "ABX":
				switch (day) {
					case 1:
						theme.push("Plenary Mega Trends / Supply Chain Strategy");
						theme.push("Mega Trends");
						break;
					case 2:
						theme.push("Application Development");
						theme.push("Regulations and Sustainability");
						break;
					case 3:
						theme.push("Material Selection and Interaction");
						theme.push("Process Optimization");
						break;
				}
				return (
					<div>
						<p style={{ fontSize: "16px" }}>
							<strong>
								<span style={{ color: "#d52c60" }}>Track 1 Theme</span> - {theme[0]}
							</strong>
						</p>
						<p style={{ fontSize: "16px" }}>
							<strong>
								<span style={{ color: "#5bb7ce" }}>Track 2 Theme</span> - {theme[1]}
							</strong>
						</p>
					</div>
				);
		}
	};

	if (loading) {
		return (
			<div className="confman conference-agenda conference-agenda--loading d-flex justify-content-center align-items-center">
				<Spinner />
			</div>
		);
	} else {
		const pipedSessions = runFilters(sessions);
		return (
			<section className={`confman conference-agenda conference-agenda--${show}`}>
				<MainNav desktop={window.innerWidth > 992}>
					{topNav ? (
						<div className="main-nav__days">
							<div className={`container${window.innerWidth < 992 ? "-fluid" : ""}`}>
								<div className="row">{getDayButtons(maxDays)}</div>
							</div>
						</div>
					) : (
						""
					)}
					<div className="main-nav__tracks">
						{window.innerWidth > 992 ? (
							<div className="container">
								<div className="row">
									<div className="col-9 track-col">{getTrackButtons(maxTracks)}</div>
									<div className="col-3 control-col">
										<Cta
											key="cta expand"
											curved={false}
											active={openSlides}
											color="primary"
											handler={setOpenSlides}
											role="expand"
											value={true}>
											Expand all
										</Cta>
										<Cta
											key="cta collapse"
											curved={false}
											active={!openSlides}
											color="primary"
											handler={setOpenSlides}
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
												active={openSlides}
												color="primary"
												handler={setOpenSlides}
												role="expand"
												value={true}>
												Expand all
											</Cta>
											<Cta
												key="cta collapse"
												curved={false}
												active={!openSlides}
												color="primary"
												handler={setOpenSlides}
												role="collapse"
												value={false}>
												Collapse all
											</Cta>
										</div>
									</div>
								</div>
								<div className="container-fluid tracks__mob-tracks">
									<div className="row ">
										<div className="col-12 track-col">{getTrackButtons(maxTracks)}</div>
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
								<div className="col-8">
									{show === "FMX" || show === "ABX" ? getUIThemes(show, filters.day) : null}
									{getSlides(pipedSessions)}
								</div>
								<div className="col-4">
									<StickyNav role="conference-agenda-side-nav">
										<div className="side-nav__search">
											<h3>Search</h3>
											<Cta
												key="cta reset"
												size="micro"
												color="black"
												curved={false}
												margin="vertical-margin--0"
												handler={resetFilters}>
												CLEAR FILTERS
											</Cta>
										</div>
										<SearchInput
											handler={setQuery}
											role="conference-search"
											key={`search-conference`}
										/>
										{convincepdf != undefined && convincepdf != "" ? (
											<Cta key="cta convince your boss" size="max" color="primary">
												CONVINCE YOUR BOSS
											</Cta>
										) : (
											""
										)}
										{downloadagenda != undefined ? (
											<>
												{show == "OCS" || show == "SAT" || show == "NZB" ? (
													<Cta
														key="cta pdf agenda"
														size="max"
														color="primary"
														role="pop-form"
														link={generalenquiry}
														download={true}>
														DOWNLOAD PDF AGENDA
													</Cta>
												) : (
													<Cta
														key="cta pdf agenda"
														size="max"
														color="primary"
														link={getConfPdfLink(show)}
														download={true}>
														DOWNLOAD PDF AGENDA
													</Cta>
												)}
											</>
										) : (
											""
										)}
										{reglink != undefined && reglink != "" ? (
											<Cta key="cta reg button" size="max" link={reglink}>
												REGISTER FOR FREE
											</Cta>
										) : (
											""
										)}
										{reginterest != undefined && reginterest != "" ? (
											<Cta
												key="cta reg interest"
												size="max"
												role="pop-form"
												link={reginterest}
												value={options}>
												REGISTER INTEREST
											</Cta>
										) : (
											""
										)}
									</StickyNav>
								</div>
							</div>
						</div>
					) : (
						<div className="container-fluid">
							<div className="row">
								<div className="col-12">{getSlides(pipedSessions)}</div>
							</div>
						</div>
					)}
				</Body>
			</section>
		);
	}
};

const mapStateToProps = (store, ownProps) => {
	return { ...store };
};
export default connect(mapStateToProps, {
	setLoading,
	// dealtWithInitialParams,
	fetchConference,
	setDay,
	setTrack,
	setQuery,
	setOpenSlides,
	setLetter,
	setDealtWithInitialParams,
	resetFiltersAction,
	setError,
})(FullAgenda);
