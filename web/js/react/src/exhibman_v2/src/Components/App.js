import React, { Component } from "react";

import Spinner from "../../../common_components/Spinner";
import Slide from "./Slide";
import Alphabet from "../../../common_components/Alphabet";
import StickyNav from "../../../common_components/StickyNav";
import Cta from "../../../common_components/Cta";
import SearchInput from "../../../common_components/SearchInput";

import PDFMake from "../Utils/PDFMake/PDFMake";

class App extends Component {
	constructor(props) {
		super(props);
		const { mode, ids, profileId } = props.options;
		this.state = {
			loading: true,
			mode,
			profileId: profileId,
			exhibsData: [],
			exhibitor: null,
			product: null,
			queries: {
				search: "",
				letter: "Show All",
				expo: ids,
			},
		};
	}

	/**
	 * Resolve inital params and run the iniital SF lookup
	 */
	componentDidMount() {
		const { ids, mode } = this.props.options;
		this.getSF(ids, mode).then((response) => {
			this.setState((prevState) => {
				prevState.exhibsData = response;
				prevState.loading = false;
				return prevState;
			});
		});
	}

	/**
	 * Salesforce Query
	 * @returns Salesforce data in an array
	 */
	getSF = async (ids = null, mode = null) => {
		if (ids === false || mode === false) {
			console.error("ID OR MODE AREN'T SET");
			return null;
		}
		let url;
		switch (mode) {
			case "LIST":
				let newIds;
				if (ids.length > 1) {
					ids.forEach((id) => {
						newIds = newIds + id + ", ";
					});
					newIds = newIds.substring(0, newIds.length - 1);
				} else {
					newIds = ids[0];
				}
				url = `/rest/exhibman.php?expos=${newIds}`;
				break;
			case "PROFILE":
				url = `/rest/exhib_drilldown.php?booth='${ids}'`;
				break;
			default:
				if (ids.length > 1) {
					ids.forEach((id) => {
						newIds = `${newIds},`;
					});
					newIds = newIds.substring(0, newIds.length - 1);
				} else {
					newIds = ids[0];
				}
				url = `/rest/exhibman.php?expos=${newIds}`;
		}
		try {
			let response;
			await fetch(url, {
				method: "GET", // *GET, POST, PUT, DELETE, etc.
				mode: "same-origin", // no-cors, *cors, same-origin
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, *same-origin, omit
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((data) => data.json())
				.then((data) => {
					response = data;
				});
			if (mode == "LIST") {
				response.sort((a, b) => {
					if (a.pagetitle < b.pagetitle) {
						return -1;
					}
					if (a.pagetitle > b.pagetitle) {
						return 1;
					}
					return 0;
				});
			}
			return response;
		} catch (error) {
			console.error("Salesforce Controller failed:  ", error);
		}
	};

	/**
	 * Switch mode
	 * @param {*} mode mode to switch to
	 * @param {*} payload depends on mode
	 */
	switchMode = (mode = "LIST", payload) => {
		//TODO LIST, PROFILE, PRODCUT
		//LIST set mode, call sf, laoding true, re render
		switch (mode) {
			case "PROFILE":
				this.setState((prevState) => {
					prevState.loading = true;
					prevState.mode = "PROFILE";
					return prevState;
				});
				this.getSF(payload, mode).then((data) => {
					this.setState((prevState) => {
						prevState.exhibitor = data[0];
						prevState.loading = false;
						console.log("GET SF Profile data:  ", data[0]);
						return prevState;
					});
				});
				break;

			default:
				break;
		}
	};

	setLetter = (letter) => {
		this.setState((prevState) => {
			prevState.queries.letter = letter;
			return prevState;
		});
	};

	setExpo = (expoString) => {
		const { expo } = this.state.queries;
		let newExpo;
		if (expo.includes(expoString)) {
			newExpo = expo.filter((id) => expoString != id);
		} else {
			newExpo = [...expo, expoString];
		}
		this.setState((prevState) => {
			prevState.queries.expo = newExpo;
			return prevState;
		});
	};

	setSearch = (term) => {
		this.setState((prevState) => {
			prevState.queries.search = term;
			return prevState;
		});
	};

	filterExhibitors = (exhibitors, filters, queries) => {
		exhibitors = [...exhibitors];
		filters.forEach((filter) => {
			if (filter == "SEARCH") {
				exhibitors = this.searchFilter(exhibitors, queries.search);
			} else if (filter == "ALPHABET") {
				exhibitors = this.alphabetFilter(exhibitors, queries.letter);
			}
		});
		if (this.props.multiExpo) {
			exhibitors = this.expoFilter(exhibitors);
		}
		return exhibitors;
	};

	expoFilter = (exhibitors) => {
		const expo = this.state.queries.expo.map((id) => id.replaceAll("'", ""));
		return exhibitors.filter((exhibitor) => {
			//overrride for abe
			if (exhibitor.Expo__c == "a1x3A000001FOPe") {
				const cat = exhibitor["exhibitor-cat"];
				if (
					expo.includes(exhibitor.Expo__c) ||
					cat.includes("Adhesives and Sealants") ||
					cat.includes("Bonding Solutions / Technology Provider")
				) {
					return true;
				}
			}
			return expo.includes(exhibitor.Expo__c);
		});
	};

	searchFilter = (exhibitors, search) => {
		if (search.trim() == "") {
			return exhibitors;
		}
		search = search.toLowerCase();
		return exhibitors.filter((exhibitor) => {
			const cats = exhibitor["exhibitor-cat"].toLowerCase();
			const pagetitle = exhibitor.pagetitle.toLowerCase();
			const content = exhibitor.content.toLowerCase();
			if (cats.includes(search) || pagetitle.includes(search) || content.includes(search)) {
				return true;
			} else {
				return false;
			}
		});
	};

	alphabetFilter = (exhibitors, letter) => {
		letter = letter.toLowerCase();

		if (letter == "show all") {
			return exhibitors;
		}

		return exhibitors.filter((exhibitor) => {
			const { pagetitle } = exhibitor;
			const name = pagetitle.toLowerCase();

			if (letter == "0-9") {
				return !isNaN(name.charAt(0));
			} else if (letter.match(/[a-z]/i)) {
				//is a letter
				return letter == name.charAt(0);
			} else {
				return true;
			}
		});
	};

	resetFilters = () => {
		document.getElementById("react__search").value = "";
		this.setState((prevState) => {
			prevState.queries.search = "";
			prevState.queries.letter = "Show All";
			return prevState;
		});
	};

	getSlides = (exhibitors, options) => {
		if (exhibitors.length < 1) {
			return <h2 className="no-exhibs-message d-flex justify-content-center align-items-center">No exhibitors found</h2>;
		}
		return exhibitors.map((exhibitor, index) => {
			const { id } = exhibitor;
			return <Slide key={`slide--${id}--${index}`} payload={exhibitor} switchMode={this.switchMode} />;
		});
	};
	getExtraNavButtons = (options) => {
		const { show, regLink, event, gtm, mode, convincepdf, multiExpo, filters } = options;
		let jsx = [];

		const newJsx = (
			<Cta
				size="max"
				color="black"
				handler={() => new PDFMake(options, this.state.exhibsData)}
				key={"download list"}
				bonusClass="control-col__download-list">
				Download Full List PDF
			</Cta>
		);
		jsx = [...jsx, newJsx];
		if (regLink) {
			const newJsx = (
				<Cta size="max" color="cex-red" link={regLink} bonusClass="control-col__reg-link" key={"register to attend"}>
					Register To Attend
				</Cta>
			);
			jsx = [...jsx, newJsx];
		}
		return jsx;
	};

	getMultiExpo = (options) => {
		const { ids, show, event, multiExpo } = options;
		const { expo } = this.state.queries;
		if (!multiExpo) {
			return null;
		} else {
			let jsx = [];

			ids.forEach((showId) => {
				let text;
				let sanitisedShowId = showId.replaceAll("'", "");
				switch (sanitisedShowId) {
					case "a1x3A000001FSz9":
						text = "Foam Expo North America";
						break;
					case "a1x4V000001YVpeQAG":
						text = "Adhesives & Bonding Expo";
						break;
					case "a1x4V000001Q9aU":
						text = "Foam Expo Europe";
						break;
					case "a1x3A000001FOPe":
						text = "Adhesives & Bonding Expo Europe";
						break;
					case "a1x4V000001Yg1J":
						text = "Ceramics Expo USA";
						break;
					default:
						text = "Expo not found";
						break;
				}
				let newShowButton = (
					<Cta
						size="max"
						curved={false}
						active={expo.includes(showId)}
						bonusClass={`control-col__show-filter control-col__show-filter--${sanitisedShowId}`}
						key={`show-filter-${showId}`}
						handler={this.setExpo}
						role="expo-query"
						value={showId}>
						<span>{text}</span>
						{expo.includes(showId) ? (
							<img className="img-fluid" src="../assets/web/js/react/src/exhibman_v2/Assets/tick.png" alt="tick" />
						) : null}
					</Cta>
				);
				jsx = [...jsx, newShowButton];
			});
			return jsx;
		}
	};

	getExhibList = (exhibitors, options, queries, loading) => {
		if (loading) {
			return <Spinner></Spinner>;
		}

		const { show, filters } = options;
		const filteredExhibitors = this.filterExhibitors(exhibitors, filters, queries);

		return (
			<section className={`exhibmanV2 exhibmanV2--${show} row`}>
				<nav className="col-12 col-md-4 control-col">
					<StickyNav>
						<div className="control-col__header">
							<h3>
								<strong>Refine Results</strong>
							</h3>
							<Cta bonusClass="control-col__reset" handler={this.resetFilters} size="micro" color="black" margin="vertical-margin--0">
								Clear Filters
							</Cta>
						</div>
						<div className="control-col__search vertical-margin--10">
							<SearchInput handler={this.setSearch} value={filters.search} bonusClass="form-control" placeholder="Refine by Keyword" />
							{this.getMultiExpo(options)}
						</div>
						{this.getExtraNavButtons(options)}
					</StickyNav>
				</nav>
				<div className="col-md-8 viewport-col">
					<div className="alphabet-filter">
						<Alphabet activeLetter={queries.letter} handler={this.setLetter} />
					</div>
					<div className="row viewport__header">
						<h3>
							<strong>Exhibitors A-Z</strong>
						</h3>
					</div>
					<div className="slide-list">{this.getSlides(filteredExhibitors, options)}</div>
				</div>
			</section>
		);
	};
	getProfile = (exhibitor, loading, options) => {		
		if (loading) {
			return <Spinner></Spinner>;
		}
		const { show } = options;
		const { pagetitle, content, Company_Bio_Enhanced__c } = exhibitor;
		const cats = exhibitor["exhibitor-cat"];
		
		return (
			<section className={`exhibmanV2 exhibmanV2--${show} exhibman-profile row`}>
				<div className="col-12 col-md-8 profile">
					<h1 className="profile-title">{pagetitle}</h1>
					<nav>QUICK MENU</nav>
					<div className="profile-summary">
						<div className="profile-logo"></div>
						<div className="profile-bios">
							<p className="profile-bios__short-bio">{content}</p>
							{Company_Bio_Enhanced__c ? (
								<div className="profile-bios__long-bio" dangerouslySetInnerHTML={{ __html: Company_Bio_Enhanced__c }}></div>
							) : null}
							<p className="profile-bios__cats">
								<i><strong>Categories:  </strong>{cats}</i>
							</p>
						</div>
					</div>
				</div>
				<nav className="col-12 col-md-4 meta-info"></nav>
			</section>
		);
	};

	render() {
		const { exhibsData, exhibitor, product, queries, loading, mode } = this.state;
		switch (mode) {
			case "LIST":
				return this.getExhibList(exhibsData, this.props.options, queries, loading);
			case "PROFILE":
				return this.getProfile(exhibitor, loading, this.props.options);
			default:
				break;
		}
	}
}
export default App;
