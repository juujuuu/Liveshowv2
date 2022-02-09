import React, { Component } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { connect } from "react-redux";

import fireModal from "../../../common_utils/Bootsrap5Modal";

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
import { pushPageView } from "../Utils/pushPageView";
import {
	getExhibListPath,
	getProductPath,
	getProfilePath,
} from "../Utils/GetPath";

import { fetchExhibs, setLoading, setQueries, setOptions } from "../Actions";

import Spinner from "../../../common_components/Spinner";
import StickyNav from "../../../common_components/StickyNav";
import Cta from "../../../common_components/Cta";

import ExhibitorList from "./ExhibitorList";
import Profile from "./Profile/Profile";
import Product from "./Product";

class App extends Component {
	constructor(props) {
		super(props);

		console.log("Constructor props: ", props);		
	}

	/**
	 * Resolve inital params and run the iniital SF lookup
	 */
	componentDidMount() {
		const { fetchExhibs, setLoading, setQueries, setOptions, queries, initOptions } = this.props;
		const { ids, profileId, articleId, mode } = initOptions;

		setOptions(initOptions);

		const siteURL = getSiteFromId(ids instanceof Array ? ids[0] : ids);
		switch (mode) {
			case "PROFILE":
				query = profileId;
				break;
			case "PRODUCT":
				query = profileId;
				break;
			case "LIST":
				let expos = sanitizeIds(ids);
				fetchExhibs(siteURL, expos).then(response=>{
					setQueries({
						search: queries.search,
						letter: queries.letter,
						expo: ids,
					});
					setLoading(false);
				});
				break;
			default:
				break;
		}
	}


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


	showAppInfo = boolean => {
		boolean = boolean ? "block" : "none";
		try {
			document.getElementById("info").style.display = boolean;
		} catch (error) {
			console.error("Exhib Info block not found.  ", error);
		}
	};

	render() {
		console.log("Render Store: ", this.props);
		// const { loading, mode, profileId, articleId, mountError } = this.state;
		const { loading, error, exhibs, exhibitor, mode, options, queries } =
			this.props;
		const errorMessage = (
			<h1
				className="d-flex justify-content-center align-items-center"
				style={{ minHeight: "500px", textAlign: "center" }}>
				Sorry, an unexpected error has occurred
			</h1>
		);
		if (loading) {
			return <Spinner />;
		} else if (error) {
			return errorMessage;
		}
		try {
			return (
				<Routes>
					<Route
						path={getExhibListPath(
							this.props.options.debug,
							this.props.options.local
						)}
						element={<ExhibitorList />}></Route>
					{/* <Route
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
						}></Route> */}
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
	return { ...store };
};
export default connect(mapStateToProps, {
	fetchExhibs,
	setLoading,
	setQueries,
	setOptions
})(App);
