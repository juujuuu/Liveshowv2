import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Spinner from "../../../common_components/Spinner";
import StickyNav from "../../../common_components/StickyNav";
import Cta from "../../../common_components/Cta";

import VideoSanitizer from "../Utils/PDFMake/VideoSanitizer";
import { getShowNameFromAcronym, getShowNameFromId } from "../Utils/GetShow";
import fireModal from "../../../common_utils/Bootsrap5Modal";
import ExhibitorList from "./ExhibitorList";
import Profile from "./Profile";
import Product from "./Product";
import { getExhibListPath, getProductPath, getProfilePath } from "../Utils/GetPath";

class App extends Component {
	constructor(props) {
		super(props);
		const { mode, ids, profileId, articleId } = props.options;
		this.state = {
			loading: true,
			mode,
			profileId,
			articleId,
			exhibsData: [],
			exhibitor: null,
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

		this.getSF(query, mode).then((response) => {
			this.setState((prevState) => {
				if (mode === "PROFILE" || mode === "PRODUCT") {
					console.log("getsf response:  ", response);
					prevState.exhibitor = response[0];
				} else {
					prevState.exhibsData = response;
				}
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
		if (!ids || mode === false) {
			console.error("ID OR MODE AREN'T SET");
			return null;
		}
		let url;
		switch (mode) {
			case "LIST":
				let newIds;
				console.log("ids: ", ids);
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
			case "PRODUCT":
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
	switchMode = (mode = "LIST", payload, state) => {
		//TODO LIST, PROFILE, PRODCUT
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		//LIST set mode, call sf, laoding true, re render
		switch (mode) {
			case "PROFILE":
				this.showAppInfo(false);
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
			case "PRODUCT":
				//payload = [Booth ID, Asset ID]
				this.showAppInfo(false);
				this.setState((prevState) => {
					prevState.loading = true;
					prevState.mode = "PRODUCT";
					return prevState;
				});
				const { id } = this.state.exhibitor;
				if (this.state.exhibitor && payload[0] == id) {
					//Already have exhibitor loaded
					this.setState((prevState) => {
						prevState.articleId = payload[1];
						prevState.loading = false;
						return prevState;
					});
				} else {
					this.getSF(payload[0], mode).then((data) => {
						this.setState((prevState) => {
							prevState.exhibitor = data[0];
							prevState.articleId = payload[1];
							prevState.loading = false;
							console.log("GET SF Profile data:  ", data[0]);
							return prevState;
						});
					});
				}
				break;
			case "LIST":
				this.showAppInfo(true);
				this.setState((prevState) => {
					prevState.loading = true;
					prevState.mode = "LIST";
					return prevState;
				});
				if (state.exhibsData.length === 0) {
					this.getSF(payload, mode).then((data) => {
						this.setState((prevState) => {
							prevState.exhibsData = data;
							prevState.loading = false;
							return prevState;
						});
					});
				} else {
					this.setState((prevState) => {
						prevState.loading = false;
						return prevState;
					});
				}
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

	getMetaCol = (exhibitor, options, state, order = "order-1 order-md-2") => {
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
			country,
		} = exhibitor;
		const boothnum = exhibitor["exhibitor-booth"];
		return (
			<nav className={`col-12 col-md-3 ${order} meta-info-col`}>
				<StickyNav endAffix={1800} disable={window.innerWidth < 992}>
					{window.innerWidth < 992 ? (
						<Cta
							size="reg"
							curved={false}
							bonusClass={`profile-back-to-list left`}
							key={`Mob Back to Exhibitor List`}
							color="black"
							handler={() => this.switchMode("LIST", ids, state)}>
							Back to Exhibitor List
						</Cta>
					) : null}
					<div className="meta-info-col__button">
						<Cta
							size={"max"}
							color="cex-red"
							handler={() => fireModal([exhibitor, contactcampaign], "contact-exhibitor", "lg")}
							bonusClass="center">
							Contact Exhibitor
						</Cta>
					</div>
					<div className="meta-info-col__booth-num">
						<h4>Booth Number: {boothnum}</h4>
					</div>
					<div className="meta-info-col__contact-list">
						<h4>Contact</h4>
						{url ? (
							<p>
								<strong>
									<a href={url} target="_blank" rel="noreferrer">
										<i className="bi bi-link-45deg"></i> Website
									</a>
								</strong>
							</p>
						) : null}
						{Linkedin__c ? (
							<p>
								<strong>
									<a href={Linkedin__c} target="_blank" rel="noreferrer">
										<i className="bi bi-linkedin"></i> Linkedin
									</a>
								</strong>
							</p>
						) : null}
						{Facebook__c ? (
							<p>
								<strong>
									<a href={Facebook__c} target="_blank" rel="noreferrer">
										<i className="bi bi-facebook"></i> Facebook
									</a>
								</strong>
							</p>
						) : null}
						{Twitter__c ? (
							<p>
								<strong>
									<a href={Twitter__c} target="_blank" rel="noreferrer">
										<i className="bi bi-twitter"></i> Twitter
									</a>
								</strong>
							</p>
						) : null}
						{Youtube_channel__c ? (
							<p>
								<strong>
									<a href={Youtube_channel__c} target="_blank" rel="noreferrer">
										<i className="bi bi-youtube"></i>Youtube
									</a>
								</strong>
							</p>
						) : null}
					</div>
					{Company_Address__c ? (
						<div className="meta-info-col__address">
							<p>
								<i className="bi bi-house-door-fill"></i> Address:{" "}
							</p>
							{Company_Address__c ? (
								<p>
									<strong>{Company_Address__c},</strong>
								</p>
							) : null}
							{Company_City__c ? (
								<p>
									<strong>{Company_City__c},</strong>
								</p>
							) : null}
							{Company_State__c ? (
								<p>
									<strong>{Company_State__c},</strong>
								</p>
							) : null}
							{country ? (
								<p>
									<strong>{country}</strong>
								</p>
							) : null}
						</div>
					) : null}
				</StickyNav>
			</nav>
		);
	};

	/**
	 *
	 * @param {Array} assets Exhibitor Assets Array
	 * @param {String} type Type of assets to output
	 */
	getAssets = (assets, type, exhibId = false, state) => {
		assets = assets.filter((asset) => asset.Asset_Type__c == type);

		return assets.map((asset) => {
			const { Id, Body__c, File_Type__c, Intro__c, Link__c, Name, Thumbnail_Link__c, Title__c } = asset;
			switch (type) {
				case "Product":
					return (
						<div className="profile-product row" key={`product--${Id}`}>
							<div className="profile-product__thumb col-md-3">
								<img className="img-fluid" src={Thumbnail_Link__c} alt="Thumbnail" />
							</div>
							<div className="profile-product__text col-md-9">
								<h5 onClick={() => this.switchMode("PRODUCT", [exhibId, Id], state)}>{Title__c}</h5>
								<p>
									{Intro__c}
									{"  "}
									<span onClick={() => this.switchMode("PRODUCT", [exhibId, Id], state)}>Read more...</span>
								</p>
							</div>
						</div>
					);
				case "News":
					return (
						<div className="profile-news row" key={`news--${Id}`}>
							<div className="profile-news__thumb col-md-3">
								<img className="img-fluid" src={Thumbnail_Link__c} alt="Thumbnail" />
							</div>
							<div className="profile-news__text col-md-9">
								<h5 onClick={() => this.switchMode("PRODUCT", [exhibId, Id], state)}>{Title__c}</h5>
								<p>
									{Intro__c}
									{"  "}
									<span onClick={() => this.switchMode("PRODUCT", [exhibId, Id], state)}>Read more...</span>
								</p>
							</div>
						</div>
					);
				case "Video":
					let video = VideoSanitizer.getVideo(Link__c);
					if (!video) {
						return null;
					} else {
						return (
							<div className="profile-video col-md-4">
								<div>
									<iframe
										src={video}
										title={Name}
										frameBorder="0"
										style={{ border: "0" }}
										allowFullScreen
										data-name={Name}
										data-id={Id}></iframe>
								</div>
								<p>{Title__c}</p>
							</div>
						);
					}
				case "Downloadable Resource":
					let fileType;
					switch (File_Type__c) {
						case "application/pdf":
							fileType = "pdf";
							break;
						default:
							break;
					}
					return (
						<div className="profile-downloadable col-md-4">
							<div>
								<a
									href={Link__c}
									target="_blank"
									title={Title__c}
									data-id={Id}
									data-name={this.state.exhibitor.pagetitle}
									data-type="Downloadable"
									rel="noreferrer">
									<img className="img-fluid" src={Thumbnail_Link__c} alt="Downloadable" />
									<div className={`fi fi-size-lg fi-${fileType}`}>
										<div className="fi-content">{fileType}</div>
									</div>
								</a>
								<p>{Title__c}</p>
							</div>
						</div>
					);
				default:
					break;
			}
		});
	};

	showAppInfo = (boolean) => {
		boolean = boolean ? "block" : "none";
		try {
			document.getElementById("info").style.display = boolean;
		} catch (error) {
			console.error("Exhib Info block not found.  ", error);
		}
	};

	render() {
		const { loading, mode, profileId, articleId } = this.state;
		if (loading) {
			return <Spinner />;
		}
		const errorMessage = (
			<h1 className="d-flex justify-content-center align-items-center" style={{ minHeight: "500px", textAlign: "center" }}>
				Sorry, an unexpected error has occurred
			</h1>
		);
		try {
			const { resetFilters, setSearch, setLetter, switchMode, alphabetFilter, searchFilter, expoFilter, getMetaCol, getAssets } = this;
			const functionsBundle = {
				resetFilters,
				setSearch,
				setLetter,
				switchMode,
				alphabetFilter,
				searchFilter,
				expoFilter,
				getMetaCol,
				getAssets,
			};

			let component;
			switch (mode) {
				case "LIST":
					component = <ExhibitorList inputState={this.state} options={this.props.options} functionsBundle={functionsBundle} />;
					break;
				case "PROFILE":
					component = <Profile inputState={this.state} options={this.props.options} functionsBundle={functionsBundle} />;
					break;
				case "PRODUCT":
					component = <Product inputState={this.state} options={this.props.options} functionsBundle={functionsBundle} />;
					break;
			}
			console.log("Exhib List Path: ", getExhibListPath(this.props.options.debug));
			console.log("Profile Path: ", getProfilePath(profileId, this.props.options.debug));
			return (
				<Routes>
					<Route
						exact
						path={getExhibListPath(this.props.options.debug)}
						element={<ExhibitorList inputState={this.state} options={this.props.options} functionsBundle={functionsBundle} />}></Route>
					<Route						
						path={getProfilePath(profileId, this.props.options.debug)}
						element={<Profile inputState={this.state} options={this.props.options} functionsBundle={functionsBundle} />}></Route>
					<Route						
						path={getProductPath([profileId, articleId], this.props.options.debug)}
						element={<Product inputState={this.state} options={this.props.options} functionsBundle={functionsBundle} />}></Route>
				</Routes>
			);
		} catch (error) {
			console.error("Full error:  ", error);
			return errorMessage;
		}
	}
}
export default App;
