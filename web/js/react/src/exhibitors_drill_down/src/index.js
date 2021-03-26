import "regenerator-runtime/runtime.js";
import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import TagManager from "react-gtm-module";

var options = {
	boothid: window.location.search.substring(1).split("&")[0].split("=")[1],
	expo: document.querySelector("#root").getAttribute("expo"),
	show: document.querySelector("#root").getAttribute("show"),
	pdf: document.querySelector("#root").getAttribute("pdf"),
	reglink: document.querySelector("#root").getAttribute("reglink"),
	event: document.querySelector("#root").getAttribute("event"),
	contactcampaign: document.querySelector("#root").getAttribute("contactcampaign"),
	contactobject: "00N30000004mdGe",
	enhancedtext: document.querySelector("#root").getAttribute("enhancedtext"),
	hidenhanced: Boolean(document.querySelector("#root").getAttribute("hidenhanced")),
	gtmcode: document.querySelector("#root").getAttribute("gtmcode"),
	continent: document.querySelector("#root").getAttribute("continent")
};
//Fix for test sites
if(options.show.includes("-Test")){
    options.show = options.show.replace("-Test", "");
}

const tagManagerArgs = {
	gtmId: options.gtmcode,
};
TagManager.initialize(tagManagerArgs);

ReactDOM.render(<App options={options} />, document.querySelector("#root"));
