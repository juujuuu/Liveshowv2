import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./Reducers";

import App from "./Components/App";

var params = null;
if (window.location.href.includes("?")) {
	params = window.location.href.split("?")[1];
	params = params.split("&");
	params = params.map(param => {
		param = param.split("=");
		return param;
	});
}

let speakerAgendaLinks =
	document.querySelector("#root").getAttribute("speakeragendalinks") != undefined
		? document.querySelector("#root").getAttribute("speakeragendalinks").toLowerCase()
		: false;

speakerAgendaLinks = speakerAgendaLinks === "true" ? true : false;

var options = {
	conf: document.querySelector("#root").getAttribute("conf"),
	show: document.querySelector("#root").getAttribute("show"),
	reglink: document.querySelector("#root").getAttribute("reglink"),
	reginterest: document.querySelector("#root").getAttribute("reginterest"),
	event: document.querySelector("#root").getAttribute("event"),
	topNav: document.querySelector("#root").getAttribute("topnav") == "true" ? true : false,
	contactcampaign: document.querySelector("#root").getAttribute("contactcampaign"),
	continent: document.querySelector("#root").getAttribute("continent"),
	mode: document.querySelector("#root").getAttribute("mode"),
	downloadagenda: document.querySelector("#root").getAttribute("downloadagenda"),
	generalenquiry: document.querySelector("#root").getAttribute("generalenquiry"),
	convincepdf: document.querySelector("#root").getAttribute("convincepdf"),
	ondemand: JSON.parse(document.querySelector("#root").getAttribute("ondemand")),
	fullagendalocation: document.querySelector("#root").getAttribute("fullagendalocation"),
	speakerAgendaLinks,
	additionalfilters:
		document.querySelector("#root").getAttribute("additionalfilters") != undefined
			? document.querySelector("#root").getAttribute("additionalfilters").split(" | ")
			: false,
	daynameoverride:
		document.querySelector("#root").getAttribute("daynameoverride") != ""
			? document.querySelector("#root").getAttribute("daynameoverride").split(" | ")
			: undefined,
	parameters: params,
};

//Fix for test sites
if (options.show.includes("-Test")) {
	options.show = options.show.replace("-Test", "");
}

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<App initOptions={options} />
	</Provider>,
	document.querySelector("#root")
);
