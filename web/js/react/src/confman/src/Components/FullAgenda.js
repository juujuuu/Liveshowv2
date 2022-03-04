import React from "react";
import Body from "../../../common_components/Body";
import Cta from "../../../common_components/Cta";

import Spinner from "../../../common_components/Spinner";
import StickyNav from "../../../common_components/StickyNav";
import {
	fetchConference,
	setLoading,
	setMaxDays,
	setOpenSlides,
	setDay,
	setTrack,
	setLetter,
	setQuery,
} from "../Actions";
import MainNav from "./MainNav";
import Slide from "./Slide";
import getConfPdfLink from "./Utils/getConfPdf";
import { getSiteFromAcronym } from "./Utils/getSite";

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
		setMaxDays,
		setMaxTracks,
		openSlides,
		initialParams,
		setOpenSlides,
		filters,
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
	} = options;

	useEffect(() => {
		if (sessions.length > 0) {
			setLoading(false);
		} else {
			fetchConference(getSiteFromAcronym(conf), conf).then(response => {
				setLoading(false);
				setMaxDays(sessions);
				setMaxTracks(sessions);
			});
		}
	}, []);

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
						active={filters.day.includes(index + 1)}
						value={index + 1}
						handler={setDay}>
						{daynameoverride == undefined || window.innerWidth < 992
							? `Day ${index + 1}`
							: `Day ${index + 1} - ${daynameoverride[index]}`}
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
			let trackName = sessions.find(
				session => session.Track_Number__c == i + 1
			).Track_Long_Title__c;
			buttons.push(
				<CheckBoxFilter
					name={trackName}
					class={`track-${i + 1}`}
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
			let slides = data.map((session, index) => {
				return (
					<Slide
						session={session}
						windowwidth={window.innerWidth}
						key={`slide-${index + 1}`}
					/>
				);
			});
			return (
				<div
					className="accordion accordion-flush conference-agenda__sessions"
					id="conference-agenda__sessions">
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
		setTrack([]);
		setDay([]);
		setLetter(-1);
		setQuery("");
	};

	const filterDays = inputSessions => {
		const { day: excludeDays } = filters;
		if (excludeDays.length > 0) {
			return inputSessions.filter(session => {
				excludeDays.forEach(day => {
					if (session.Day__c === day) {
						return false;
					}
				});
				return true;
			});
		} else {
			return inputSessions;
		}
	};

	const filterTracks = inputSessions => {
		const { track: excludeTracks } = filters;
		if (excludeTracks.length > 0) {
			return inputSessions.filter(session => {
				excludeTracks.forEach(track => {
					if (session.Track_Number__c === track) {
						return false;
					}
				});
				return true;
			});
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
				let {
					Long_Name__c: sessionName,
					Synopsis__c: sessionSynopsis,
					presentations,
				} = session;
				sessionName = sessionName.toLowerCase();
				sessionSynopsis = sessionSynopsis.toLowerCase();
				if (
					sessionName.includes(query) ||
					sessionSynopsis.includes(query)
				) {
					return true;
				}
				//Check Presentation
				if (presentations.length > 0) {
					const found = presentations.find(presentation => {
						let { Company__c, First_Name__c, Last_Name__c } =
							presentation;
						let Company__c = Company__c.toLowerCase();
						let First_Name__c = First_Name__c.toLowerCase();
						let Last_Name__c = Last_Name__c.toLowerCase();
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
		//Stop break sessions from stacking up
		for (let index = 0; index < inputSessions.length; index++) {
			const session = inputSessions[index];
			if (index + 1 < inputSessions.length) {
				if (session.Type__c == "Break") {
					if (
						inputSessions[index + 1].Type__c == "Break" &&
						inputSessions[index].Start_Time__c ==
							inputSessions.Start_Time__c
					) {
						inputSessions.splice(
							inputSessions.indexOf(inputSessions),
							1
						);
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

	if (loading) {
		return (
			<div className="confman conference-agenda conference-agenda--loading d-flex justify-content-center align-items-center">
				<Spinner />
			</div>
		);
	} else {
		const pipedSessions = runFilters(sessions);
		return (
			<section
				className={`confman conference-agenda conference-agenda--${show}`}>
				<MainNav desktop={window.innerWidth > 992}>
					{topNav ? (
						<div className="main-nav__days">
							<div
								className={`container${
									window.innerWidth < 992 ? "-fluid" : ""
								}`}>
								<div className="row">
									{getDayButtons(maxDays)}
								</div>
							</div>
						</div>
					) : (
						""
					)}
					<div className="main-nav__tracks">
						{window.innerWidth > 992 ? (
							<div className="container">
								<div className="row">
									<div className="col-9 track-col">
										{getTrackButtons(maxTracks)}
									</div>
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
										<div className="col-12 track-col">
											{getTrackButtons(setMaxTracks)}
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
								<div className="col-8">
									{this.getSlides(pipedSessions)}
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
											handler={this.setQuery}
											role="conference-search"
											key={`search-conference`}
										/>
										{convincepdf != undefined &&
										convincepdf != "" ? (
											<Cta
												key="cta convince your boss"
												size="max"
												color="primary">
												CONVINCE YOUR BOSS
											</Cta>
										) : (
											""
										)}
										{downloadagenda != undefined ? (
											<>
												{show == "OCS" ||
												show == "SAT" ? (
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
														link={getConfPdf(show)}
														download={true}>
														DOWNLOAD PDF AGENDA
													</Cta>
												)}
											</>
										) : (
											""
										)}
										{reglink != undefined &&
										reglink != "" ? (
											<Cta
												key="cta reg button"
												size="max"
												link={reglink}>
												REGISTER FOR FREE
											</Cta>
										) : (
											""
										)}
										{reginterest != undefined &&
										reginterest != "" ? (
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
								<div className="col-12">
									{getSlides(pipedSessions)}
								</div>
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
	dealtWithInitialParams,
	fetchConference,
	setMaxDays,
	setMaxTracks,
	setDay,
	setTrack,
	setQuery,
	setLetter,
})(FullAgenda);
