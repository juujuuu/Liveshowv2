import React, { Component } from "react";

import Spinner from "../../../common_components/Spinner";
import Slide from "./Slide";
import Alphabet from "../../../common_components/Alphabet";
import StickyNav from "../../../common_components/StickyNav";
import Cta from "../../../common_components/Cta";
import SearchInput from "../../../common_components/SearchInput";

import PDFMake from "../Utils/PDFMake/PDFMake";
import VideoSanitizer from "../Utils/PDFMake/VideoSanitizer";

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
		document.body.scrollTop = document.documentElement.scrollTop = 0;
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
			case "LIST":
				this.setState((prevState) => {
					prevState.loading = true;
					prevState.mode = "LIST";
					return prevState;
				});
				if (this.state.exhibsData.length === 0) {
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
		const { pagetitle, content, Company_Bio_Enhanced__c, logo, Expo__c, Exhibitor_Assets__r } = exhibitor;
		const cats = exhibitor["exhibitor-cat"];

		return (
			<section className={`exhibmanV2 exhibmanV2--${show} exhibman-profile row`}>
				<div className="col-12 col-md-8 profile">
					<Cta
						size="reg"
						curved={false}
						bonusClass={`profile-back-to-list left`}
						key={`Back to Exhibitor List`}
						color="black"
						handler={() => this.switchMode("LIST", Expo__c)}>
						Back to Exhibitor List
					</Cta>
					<h1 className="profile-title">{pagetitle}</h1>
					<nav>QUICK MENU</nav>
					<div className="profile-summary">
						<div className="profile-logo">
							<img className="img-fluid" src={logo} alt="Logo" />
						</div>
						<div className="profile-bios">
							<p className="profile-bios__short-bio">
								<strong>{content}</strong>
							</p>
							{Company_Bio_Enhanced__c ? (
								<div className="profile-bios__long-bio" dangerouslySetInnerHTML={{ __html: Company_Bio_Enhanced__c }}></div>
							) : null}
							<p className="profile-bios__cats">
								<i>
									<strong>Categories: </strong>
									{cats}
								</i>
							</p>
							{/* Products, news, videos , downloads */}

							{Exhibitor_Assets__r.find((asset) => asset.Asset_Type__c === "Product") ? (
								<div className="profile-assets profile-products row">
									<h4>Products</h4>
									{this.getAssets(Exhibitor_Assets__r, "Product")}
								</div>
							) : null}
							{Exhibitor_Assets__r.find((asset) => asset.Asset_Type__c === "News") ? (
								<div className="profile-assets profile-news row">
									<h4>News</h4>
									{this.getAssets(Exhibitor_Assets__r, "News")}
								</div>
							) : null}
							{Exhibitor_Assets__r.find((asset) => asset.Asset_Type__c === "Video") ? (
								<div className="profile-assets profile-videos row">
									<h4>{pagetitle} Videos</h4>
									{this.getAssets(Exhibitor_Assets__r, "Video")}
								</div>
							) : null}
							{Exhibitor_Assets__r.find((asset) => asset.Asset_Type__c === "Video") ? (
								<div className="profile-assets profile-downloadables row">
									<h4>Resource Downloads</h4>
									{this.getAssets(Exhibitor_Assets__r, "Downloadable Resource")}
								</div>
							) : null}
						</div>
					</div>
				</div>
				<nav className="col-12 col-md-4 meta-info"></nav>
			</section>
		);
	};

	/**
	 *
	 * @param {Array} assets Exhibitor Assets Array
	 * @param {String} type Type of assets to output
	 */
	getAssets = (assets, type) => {
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
								<h5>{Title__c}</h5>
								<p>
									{Intro__c}
									{"  "}
									<span>Read more...</span>
								</p>
							</div>
						</div>
					);
					break;
				case "News":
					return (
						<div className="profile-news row" key={`news--${Id}`}>
							<div className="profile-news__thumb col-md-3">
								<img className="img-fluid" src={Thumbnail_Link__c} alt="Thumbnail" />
							</div>
							<div className="profile-news__text col-md-9">
								<h5>{Title__c}</h5>
								<p>
									{Intro__c}
									{"  "}
									<span>Read more...</span>
								</p>
							</div>
						</div>
					);
					break;
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
					break;
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
					break;
				default:
					break;
			}
		});
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
