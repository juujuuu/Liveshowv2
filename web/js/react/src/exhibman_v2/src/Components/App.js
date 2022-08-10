import React, { Component } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { connect } from "react-redux";

import { getExhibListPath, getProductPath, getProfilePath } from "../Utils/GetPath";

import { fetchExhibs, fetchExhib, setLoading, setQueries, setOptions, setMode, setProduct, setProfile } from "../Actions";

import Spinner from "../../../common_components/Spinner";

import ExhibitorList from "./ExhibitorList";
import Profile from "./Profile/Profile";
import Product from "./Product";
import DesignExhibitorList from "./DesignExhibitorList";

class App extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * Resolve inital params and run the iniital SF lookup
     */
    componentDidMount() {
        const { setMode, setLoading, setQueries, setOptions, queries, initOptions, setProduct, setProfile } = this.props;
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

        const { loading, error, exhibs, exhibitor, mode, options, queries } = this.props;
        const errorMessage = (
            <h1 className="d-flex justify-content-center align-items-center" style={{ minHeight: "500px", textAlign: "center" }}>
                Sorry, an unexpected error has occurred
            </h1>
        );
        if (error) {
            return errorMessage;
        } else if (Object.keys(options).length < 1) {
            //Options not yet set on mount
            return <Spinner />;
        } else if (mode === "DESIGN_LIST") {
            return <DesignExhibitorList />;
        }
        try {
            /**
             * This is how we're doing a SPA.  Basically the Routes component contains a number of routes.
             * This contains a Route which receives a path and an element to render.  This setup kind of acts like a
             * switch case where for each Route, if the current url matches the url in path it will render the route.
             */
            return (
                <Routes>
                    <Route path={getExhibListPath(this.props.options.debug, this.props.options.local)} element={<ExhibitorList />}></Route>
                    <Route path={getProfilePath(this.props.options.debug, this.props.options.local)} element={<Profile />}></Route>
                    <Route path={getProductPath(this.props.options.debug, this.props.options.local)} element={<Product />}></Route>
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
    setProfile,
})(App);
