import React, { Component } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { connect } from "react-redux";


import {
	getExhibListPath,
	getProductPath,
	getProfilePath,
} from "../Utils/GetPath";

import {
	fetchExhibs,
	fetchExhib,
	setLoading,
	setQueries,
	setOptions,
	setMode,
	setProduct,
	setProfile,
} from "../Actions";

import Spinner from "../../../common_components/Spinner";
import StickyNav from "../../../common_components/StickyNav";
import Cta from "../../../common_components/Cta";

import ExhibitorList from "./ExhibitorList";
import Profile from "./Profile/Profile";
import Product from "./Product";

class App extends Component {
	constructor(props) {
		super(props);
	}

	/**
	 * Resolve inital params and run the iniital SF lookup
	 */
	componentDidMount() {
		const {
			setMode,
			setLoading,
			setQueries,
			setOptions,
			queries,
			initOptions,
			setProduct,
			setProfile
		} = this.props;
		const { ids, profileId, articleId, mode } = initOptions;

		setOptions(initOptions);
		setProduct(articleId);
		setProfile(profileId);
		setQueries({
			search: queries.search,
			letter: queries.letter,
			expo: ids,
		});
		setMode(mode);

		switch (mode) {
			case "PROFILE":
				// fetchExhib(siteURL, profileId).then(response => {
				// 	setLoading(false);
				// });
				break;
			case "PRODUCT":
				//query = profileId;
				break;
			case "LIST":
				// let expos = sanitizeIds(ids);
				// fetchExhibs(siteURL, expos).then(response => {
				// 	setLoading(false);
				// });
				break;
			default:
				break;
		}
	}

	showAppInfo = boolean => {
		boolean = boolean ? "block" : "none";
		try {
			document.getElementById("exhib_header").style.display = boolean;
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
		if (error) {
			return errorMessage;
		} else if(Object.keys(options).length < 1){
			//Options not yet set on mount
			return <Spinner/>
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
					<Route
						path={getProfilePath(
							this.props.options.debug,
							this.props.options.local
						)}
						element={<Profile />}></Route>
					<Route
						path={getProductPath(
							this.props.options.debug,
							this.props.options.local
						)}
						element={<Product />}></Route>
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
	fetchExhib,
	setLoading,
	setQueries,
	setOptions,
	setMode,
	setProduct,
	setProfile
})(App);
