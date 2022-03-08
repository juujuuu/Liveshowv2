import React from "react";
import MainNav from "./MainNav";
import MainNavButton from "./MainNavButton";
import Spinner from "../../../common_components/Spinner";
import Cta from "../../../common_components/Cta";
import StickyNav from "../../../common_components/StickyNav";
import SearchInput from "../../../common_components/SearchInput";
import Slide from "./Slide";
import CheckBoxFilter from "../../../common_components/CheckBoxFilter";
import Body from "../../../common_components/Body";
import Letter from "./Letter";
import SpeakerSlide from "./SpeakerSlide";

import axios from "axios";
import { getOnDemandCode } from "../Utils/getOnDemand";
import FullAgenda from "./FullAgenda";
import { connect } from "react-redux";
import { setDealtWithInitialParams, setLoading, setOptions } from "../Actions";
class App extends React.Component {
	constructor(props) {
		super(props);
		this.setup = false;
		props.options.odcode = getOnDemandCode(props.options.show);
		let filtersObj;
		switch (props.options.show) {
			case "CEX":
				filtersObj = {
					track: [-1], //ignore these tracks
					day: -1, //inverse of this ^^
					query: "",
					letter: "-1",
				};
				break;
			case "SPC":
				filtersObj = {
					track: [-1], //ignore these tracks
					day: -1, //inverse of this ^^
					query: "",
					letter: "-1",
				};
				break;
			case "NZB":
				filtersObj = {
					track: [-1], //ignore these tracks
					day: -1, //inverse of this ^^
					query: "",
					letter: "-1",
				};
				break;
			case "OCS":
				filtersObj = {
					track: [-1], //ignore these tracks
					day: 1, //inverse of this ^^
					query: "",
					letter: "-1",
				};
				break;
			case "SAT":
				filtersObj = {
					track: [-1], //ignore these tracks
					day: 1, //inverse of this ^^
					query: "",
					letter: "-1",
				};
				break;
			case "FMX":
				filtersObj = {
					track: [-1], //ignore these tracks
					day: -1, //inverse of this ^^
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
			//dealtWithInitialParams: false,
			queryKey: 0, //for forcing state resets on search components
		};
	}
	getRenderList = () => {
		switch (this.state.mode) {
			case "speaker-list":
				let deepCloneSpeakers = JSON.parse(JSON.stringify(this.state)).speakers;
				let pipedSpeakers = this.pipeSpeakers([this.filterAlphabet, this.filterQuery], deepCloneSpeakers);
				return this.getSpeakerList(pipedSpeakers);
		}
	};

	pipeSpeakers = (filterFunctions = [], speakers) => {
		if (filterFunctions.length >= 1) {
			filterFunctions.forEach(filter => {
				speakers = filter(speakers);
			});
		}
		return speakers;
	};
	setMode = (mode = "full-agenda") => {
		this.setState(prevState => {
			prevState.mode = mode;
			return prevState;
		});
		this.getConfman();
	};
	/**
	 * Filters
	 */
	resetFilters = () => {
		this.setState(prevState => {
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
	filterAlphabet = data => {
		if (this.state.filters.letter == "-1") {
			return data;
		} else {
			return data.filter(item => {
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
	filterQuery = data => {
		if (this.state.filters.query == "") {
			return data;
		}
		if (this.state.mode == "speaker-list") {
			return data.filter(speaker => {
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

	normaliseTimeStamps = sessions => {
		return sessions.map((session, index) => {
			let timestamp = session.Start_Time__c;
			let day = timestamp.substring(8, 10);
			let hour = timestamp.substring(11, 13);
			let minute = timestamp.substring(14, 16);
			let ampm = hour > 11 ? "PM" : "AM";
			session.normalTime = { day, hour, minute, ampm };
			return session;
		});
	};
	speakerMerge = originalSpeakers => {
		//merge multiple sessions onto one speaker
		const referenceSpeakers = JSON.parse(JSON.stringify(originalSpeakers));
		let outputArray = []; //will container unqique speaker__c

		for (let i = 0; i < referenceSpeakers.length; i++) {
			let element = referenceSpeakers[i];
			if (
				undefined !=
				outputArray.find(speaker => {
					return element.Speaker__r.Id == speaker.Speaker__r.Id;
				})
			) {
				//array already contains this speaker
				//Push session data to array
				let currentSpeaker = outputArray.find(speaker => {
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
	getSpeakerSlides = speakers => {
		if (speakers.length > 0) {
			return speakers.map((speaker, index) => {
				return (
					<SpeakerSlide
						id={speaker.Id}
						speaker={speaker}
						key={`speaker-${speaker.Id}`}
						modalHandler={this.getModal}
					/>
				);
			});
		} else {
			return <h2>No Speakers Found</h2>;
		}
	};
	getSpeakerList = pipedSpeakers => {
		//output jsx
		const { queryKey } = this.state;
		const { query } = this.state.filters;
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
									value={query}
									key={`search-${queryKey}`}
								/>
							</div>
							<div className="col-12 col-lg-2">
								<Cta
									key="cta speaker-clear"
									curved={false}
									color="black"
									handler={this.resetFilters}
									margin="vertical-margin--0">
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

	componentDidMount = () => {
		this.setup = true;
		this.props.setOptions(this.props.initOptions);
		this.props.initOptions.parameters ? setDealtWithInitialParams(false) : setDealtWithInitialParams(true);
	};

	render() {
		console.log("Store: ", this.props);
		const errorJSX = (
			<div className="confman conference-agenda conference-agenda--loading d-flex justify-content-center align-items-center">
				<h1 style={{ marginTop: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
					An unexpected error occurred
				</h1>
			</div>
		);
		try {
			if (!this.setup) {
				return (
					<div className="confman conference-agenda conference-agenda--loading d-flex justify-content-center align-items-center">
						<Spinner />
					</div>
				);
			} else if (this.props.error) {
				return errorJSX;
			} else {
				return <FullAgenda />;
			}
		} catch (error) {
			return errorJSX;
		}
	}
}
const mapStateToProps = (store, ownProps) => {
	return { ...store };
};
export default connect(mapStateToProps, {
	setLoading,
	setOptions,
	setDealtWithInitialParams,
})(App);
