import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Spinner from "../../../common_components/Spinner";

import FullAgenda from "./FullAgenda";
import SpeakerList from "./SpeakerList";

import { setDealtWithInitialParams, setLoading, setOptions } from "../Actions";

const App = props => {
	const { options, setOptions, setDealtWithInitialParams, setLoading, initOptions, error } = props;

	const [setup, setSetup] = useState(false);

	useEffect(() => {
		setSetup(true);
		setOptions(initOptions);
		initOptions.parameters ? setDealtWithInitialParams(false) : setDealtWithInitialParams(true);
	}, []);

	console.log("Store: ", props);

	const errorJSX = (
		<div className="confman conference-agenda conference-agenda--loading d-flex justify-content-center align-items-center">
			<h1 style={{ marginTop: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
				An unexpected error occurred
			</h1>
		</div>
	);

	try {
		if (!setup) {
			return (
				<div className="confman conference-agenda conference-agenda--loading d-flex justify-content-center align-items-center">
					<Spinner />
				</div>
			);
		} else if (error) {
			return errorJSX;
		} else if (options.mode === "full-agenda") {
			return <FullAgenda />;
		} else if (options.mode === "speaker-list") {
			return <SpeakerList />;
		}
	} catch (error) {
		return errorJSX;
	}
};
const mapStateToProps = (store, ownProps) => {
	return { ...store };
};
export default connect(mapStateToProps, {
	setLoading,
	setOptions,
	setDealtWithInitialParams,
})(App);
