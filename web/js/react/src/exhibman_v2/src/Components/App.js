import React, { Component } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Spinner from "../../../common_components/Spinner";
import StickyNav from "../../../common_components/StickyNav";
import Cta from "../../../common_components/Cta";

import {
	getAcronymFromId,
	getShowNameFromAcronym,
	getShowNameFromId,
	getSiteFromAcronym,
	getSiteFromId,
} from "../Utils/GetShow";
import sanitizeUrl from "../Utils/SanitizeUrl";
import createAPI from "../Utils/api";
import sanitizeIds from "../Utils/SanitizeIds";

import fireModal from "../../../common_utils/Bootsrap5Modal";
import ExhibitorList from "./ExhibitorList";
import Profile from "./Profile/Profile";
import Product from "./Product";
import {
	getExhibListPath,
	getProductPath,
	getProfilePath,
} from "../Utils/GetPath";
import { pushPageView } from "../Utils/pushPageView";
import { connect } from "react-redux";

class App extends Component {
	constructor(props) {
		super(props);
		const { mode, ids, profileId, articleId } = props.options;
		this.state = {
			loading: true,
			mode,
			ids,
			profileId,
			articleId,
			exhibsData: [],
			exhibitor: null,
			mountError: false,
			queries: {
				search: "",
				letter: "Show All",
				expo: ids,
			},
		};
		console.log(props);
		console.log("getSite from id:  ", ids instanceof Array ? ids[0] : ids);
		console.log("getSite from id:  ", ids);

		this.api = createAPI(
			getSiteFromId(ids instanceof Array ? ids[0] : ids)
		);
	}

	/**
	 * Resolve inital params and run the iniital SF lookup
	 */
	componentDidMount() {
		const { ids, profileId, articleId, mode } = this.props.options;
		let query;
		console.log("mode: ", mode);
		switch (mode) {
			case "PROFILE":
				query = profileId;
				break;
			case "PRODUCT":
				query = profileId;
				break;
			case "LIST":
				query = ids;
				break;
			default:
				break;
		}

		this.getSF(query, mode)
			.then(response => {
				this.setState(prevState => {
					if (mode === "PROFILE" || mode === "PRODUCT") {
						console.log("getsf response:  ", response);
						prevState.exhibitor = response[0];
					} else {
						prevState.exhibsData = response;
					}
					prevState.loading = false;
					return prevState;
				});
			})
			.catch(error => {
				console.error(error);
				this.setState({ loading: false, mountError: true });
			});
	}

	/** Just in case we have some empty data */
	componentDidUpdate() {
		const { exhibsData, mode, ids } = this.state;
		if (mode === "LIST" && exhibsData.length <= 0) {
			this.getSF(ids, mode)
				.then(response => {
					this.setState(prevState => {
						prevState.exhibsData = response;
						prevState.loading = false;
						return prevState;
					});
				})
				.catch(error => {
					console.error(error);
					this.setState({ loading: false, mountError: true });
				});
		}
	}

	/**
	 * Salesforce Query
	 * @returns Salesforce data in an array
	 */
	getSF = async (ids = null, mode = null) => {
		if (!ids || mode === false) {
			throw "ID OR MODE AREN'T SET";
		}
		let url;
		const newIds = sanitizeIds(ids);
		switch (mode) {
			case "LIST":
				url = `/rest/exhibman.php?expos=${newIds}`;
				break;
			case "PROFILE":
				url = `/rest/exhib_drilldown.php?booth='${newIds}'`;
				break;
			case "PRODUCT":
				url = `/rest/exhib_drilldown.php?booth='${newIds}'`;
				break;
			default:
				url = `/rest/exhibman.php?expos=${newIds}`;
				break;
		}
		try {
			console.log("url", url);
			let response = await this.api.get(url);
			response = response.data;
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
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		pushPageView();
		//LIST set mode, call sf, laoding true, re render
		switch (mode) {
			case "PROFILE":
				this.showAppInfo(false);
				this.setState(prevState => {
					prevState.loading = true;
					prevState.mode = "PROFILE";
					return prevState;
				});
				this.getSF(payload, mode).then(data => {
					this.setState(prevState => {
						prevState.exhibitor = data[0];
						prevState.loading = false;
						console.log("GET SF Profile data:  ", data[0]);
						return prevState;
					});
				});
				break;
			case "PRODUCT":
				//payload = [Booth ID, Asset ID]
				this.showAppInfo(false);
				this.setState(prevState => {
					prevState.loading = true;
					prevState.mode = "PRODUCT";
					return prevState;
				});
				this.getSF(payload[0], mode).then(data => {
					this.setState(prevState => {
						prevState.exhibitor = data[0];
						prevState.articleId = payload[1];
						prevState.loading = false;
						console.log("GET SF Profile data:  ", data[0]);
						return prevState;
					});
				});
				break;
			case "LIST":
				this.showAppInfo(true);
				this.setState(prevState => {
					prevState.loading = true;
					prevState.mode = "LIST";
					return prevState;
				});
				this.getSF(payload, mode).then(data => {
					this.setState(prevState => {
						prevState.exhibsData = data;
						prevState.loading = false;
						return prevState;
					});
				});
				break;
			default:
				break;
		}
	};

	setLetter = letter => {
		this.setState(prevState => {
			prevState.queries.letter = letter;
			return prevState;
		});
	};

	setExpo = expoString => {
		const { expo } = this.state.queries;
		let newExpo;
		if (expo.includes(expoString)) {
			newExpo = expo.filter(id => expoString != id);
		} else {
			newExpo = [...expo, expoString];
		}
		this.setState(prevState => {
			prevState.queries.expo = newExpo;
			return prevState;
		});
	};

	setSearch = term => {
		this.setState(prevState => {
			prevState.queries.search = term;
			return prevState;
		});
	};

	expoFilter = exhibitors => {
		const expo = this.state.queries.expo.map(id => id.replaceAll("'", ""));
		return exhibitors.filter(exhibitor => {
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
		return exhibitors.filter(exhibitor => {
			const cats = exhibitor["exhibitor-cat"].toLowerCase();
			const pagetitle = exhibitor.pagetitle.toLowerCase();
			const content = exhibitor.content.toLowerCase();
			if (
				cats.includes(search) ||
				pagetitle.includes(search) ||
				content.includes(search)
			) {
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

		return exhibitors.filter(exhibitor => {
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
		this.setState(prevState => {
			prevState.queries.search = "";
			prevState.queries.letter = "Show All";
			return prevState;
		});
	};

	getMetaCol = (exhibitor, options, order = "order-1 order-md-2") => {
		const { contactcampaign, ids } = options;
		const {
			Expo__c,
			url,
			Twitter__c,
			Facebook__c,
			Linkedin__c,
			Company_City__c,
			Company_State__c,
			Company_Address__c,
			Youtube_channel__c,
			Exhibitor_listing_type__c,
			country,
		} = exhibitor;
		const boothnum = exhibitor["exhibitor-booth"];
		const enhanced = Exhibitor_listing_type__c != "Standard";
		const getUrl = url => {
			if (url) {
				return (
					<p>
						<strong>
							<a
								href={sanitizeUrl(url)}
								target="_blank"
								rel="noreferrer">
								<i className="bi bi-link-45deg"></i> Website
							</a>
						</strong>
					</p>
				);
			} else {
				return null;
			}
		};
		const getLinkedIn = Linkedin__c => {
			if (Linkedin__c) {
				return (
					<p>
						<strong>
							<a
								href={Linkedin__c}
								target="_blank"
								rel="noreferrer">
								<i className="bi bi-linkedin"></i> Linkedin
							</a>
						</strong>
					</p>
				);
			} else {
				return null;
			}
		};
		const getFacebook = Facebook__c => {
			if (Facebook__c) {
				<p>
					<strong>
						<a href={Facebook__c} target="_blank" rel="noreferrer">
							<i className="bi bi-facebook"></i> Facebook
						</a>
					</strong>
				</p>;
			} else {
				return null;
			}
		};
		const getTwitter = Twitter__c => {
			if (Twitter__c) {
				return (
					<p>
						<strong>
							<a
								href={Twitter__c}
								target="_blank"
								rel="noreferrer">
								<i className="bi bi-twitter"></i> Twitter
							</a>
						</strong>
					</p>
				);
			} else {
				return null;
			}
		};
		const getYoutube = Youtube_channel__c => {
			if (Youtube_channel__c) {
				return (
					<p>
						<strong>
							<a
								href={Youtube_channel__c}
								target="_blank"
								rel="noreferrer">
								<i className="bi bi-youtube"></i>Youtube
							</a>
						</strong>
					</p>
				);
			} else {
				return null;
			}
		};
		const getAddressField = field => {
			if (field) {
				return (
					<p>
						<strong>{field},</strong>
					</p>
				);
			} else {
				return null;
			}
		};
		return (
			<nav className={`col-12 col-md-3 ${order} meta-info-col`}>
				<StickyNav endAffix={1800} disable={window.innerWidth < 992}>
					{window.innerWidth < 992 ? (
						<Link
							className="router-link"
							to={getExhibListPath(options.debug, options.local)}
							onClick={() => this.switchMode("LIST", ids)}>
							<Cta
								size="reg"
								curved={false}
								bonusClass={`profile-back-to-list left`}
								key={`Mob back to Exhibitor List`}
								color="black">
								Back to Exhibitor List
							</Cta>
						</Link>
					) : null}
					{enhanced ? (
						<div className="meta-info-col__button">
							<Cta
								size={"max"}
								color="cex-red"
								handler={() =>
									fireModal(
										[exhibitor, contactcampaign],
										"contact-exhibitor",
										"lg"
									)
								}
								bonusClass="center">
								Contact Exhibitor
							</Cta>
						</div>
					) : null}
					<div
						className="meta-info-col__booth-num"
						style={enhanced ? { marginTop: "10px" } : null}>
						<h4>Booth Number: {boothnum}</h4>
					</div>
					<div className="meta-info-col__contact-list">
						<h4>Contact</h4>
						{getUrl(url)}
						{enhanced ? (
							<>
								{getLinkedIn(Linkedin__c)}
								{getFacebook(Facebook__c)}
								{getTwitter(Twitter__c)}
								{getYoutube(Youtube_channel__c)}{" "}
							</>
						) : null}
					</div>
					{Company_Address__c ? (
						<div className="meta-info-col__address">
							<p>
								<i className="bi bi-house-door-fill"></i>{" "}
								Address:{" "}
							</p>
							{getAddressField(Company_Address__c)}
							{getAddressField(Company_City__c)}
							{getAddressField(Company_State__c)}
							{getAddressField(country)}
						</div>
					) : null}
				</StickyNav>
			</nav>
		);
	};

	showAppInfo = boolean => {
		boolean = boolean ? "block" : "none";
		try {
			document.getElementById("info").style.display = boolean;
		} catch (error) {
			console.error("Exhib Info block not found.  ", error);
		}
	};

	render() {
		const { loading, mode, profileId, articleId, mountError } = this.state;
		const errorMessage = (
			<h1
				className="d-flex justify-content-center align-items-center"
				style={{ minHeight: "500px", textAlign: "center" }}>
				Sorry, an unexpected error has occurred
			</h1>
		);
		if (loading) {
			return <Spinner />;
		} else if (mountError) {
			return errorMessage;
		}
		try {
			const {
				resetFilters,
				setSearch,
				setLetter,
				switchMode,
				alphabetFilter,
				searchFilter,
				expoFilter,
				getMetaCol,
			} = this;
			const functionsBundle = {
				resetFilters,
				setSearch,
				setLetter,
				switchMode,
				alphabetFilter,
				searchFilter,
				expoFilter,
				getMetaCol,
			};
			console.log();
			return (
				<Routes>
					<Route
						path={getExhibListPath(
							this.props.options.debug,
							this.props.options.local
						)}
						element={
							<ExhibitorList
								inputState={this.state}
								options={this.props.options}
								functionsBundle={functionsBundle}
							/>
						}></Route>
					<Route
						path={getProfilePath(
							this.props.options.debug,
							this.props.options.local
						)}
						element={
							<Profile
								inputState={this.state}
								options={this.props.options}
								functionsBundle={functionsBundle}
							/>
						}></Route>
					<Route
						path={getProductPath(
							this.props.options.debug,
							this.props.options.local
						)}
						element={
							<Product
								inputState={this.state}
								options={this.props.options}
								functionsBundle={functionsBundle}
							/>
						}></Route>
				</Routes>
			);
		} catch (error) {
			console.error("Full error:  ", error);
			return errorMessage;
		}
	}
}
//export default App;
const mapStateToProps = (store, ownProps) => {
	console.log("store", store);
	return store;
};
export default connect(mapStateToProps)(App);
