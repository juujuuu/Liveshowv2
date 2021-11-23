import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import TagManager from "react-gtm-module";

let country;
let contactcampaign;
//Show specific stuff
switch (document.querySelector("#root").getAttribute("show")) {
	case "CEX":
		country = "US";
		break;
	case "FMX":
		country = "US";
		break;
	case "ABX":
		country = "US";
		break;
	case "TTE":
		country = "US";
		break;
	case "HPP":
		country = "US";
		break;
	case "SPC":
		country = "US";
		break;
	case "FME":
		country = "GERMANY";
		break;
	case "BRE":
		country = "GERMANY";
		break;
	case "OCS":
		country = "GERMANY";
		break;
	case "SAT":
		country = "GERMANY";
		break;
	case "ABE":
		country = "GERMANY";
		break;
	default:
		country = "US";
		break;
}

let ids, multiExpo;
ids = document.querySelector("#root").getAttribute("expos").split(",");
multiExpo = document.querySelector("#root").getAttribute("expos").split(",").length > 1;

let filters = null;
if (document.querySelector("#root").getAttribute("filters") != null) {
	filters = document.querySelector("#root").getAttribute("filters").split("|");
} else {
	filters = ["ALPHABET", "SEARCH"];
	if (multiExpo) {
		filters.push("EXPO");
	}
}

let extraParams = window.location.href.includes("?") ? window.location.href.split("?")[1].split("&") : null;
if (extraParams) {
	extraParams = extraParams.includes("preview=true") ? null : extraParams;
}
let profileId,
	articleId = null;
if (extraParams) {
	let extraParamsObj = {};
	extraParams = extraParams.forEach((param) => {
		extraParamsObj[param.split("=")[0]] = param.split("=")[1]; //converting to 2d array
	});
	for(const key in extraParamsObj){
		switch (key) {
			case "boothid":
				profileId = extraParamsObj[key];
				break;
			case "assetid":
				articleId = extraParamsObj[key];
				break;
			default:
				break;
		}
	};
}

const options = {
	ids, //Expo ids
	profileId,
	articleId,
	show: document.querySelector("#root").getAttribute("show"), //Show acronym
	regLink: document.querySelector("#root").getAttribute("reglink"), //N200 reg link
	event: document.querySelector("#root").getAttribute("event"), //Long Event name
	contactcampaign: document.querySelector("#root").getAttribute("contactcampaign"),
	gtm: document.querySelector("#root").getAttribute("gtm"), //Google Tag Manager ID
	country, //US or Germany
	mode: document.querySelector("#root").getAttribute("mode"), //Exhibitor list, profile or article
	convincepdf: document.querySelector("#root").getAttribute("bosspdf"), //Convince your boss pdf
	filters,
	multiExpo, //multiple expo ids detected
	extraParams, //extra arguments in the url, null if none
	debug: document.querySelector("#root").getAttribute("debug") == "true" ? true: false
};

console.log("OPTIONS: ", options);

TagManager.initialize({ gtmId: document.querySelector("#root").getAttribute("gtm") });
ReactDOM.render(<App options={options} />, document.querySelector("#root"));
