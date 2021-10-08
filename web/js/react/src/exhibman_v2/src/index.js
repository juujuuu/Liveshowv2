import "regenerator-runtime";
import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";

let country;

//GET COUNTRY
switch (document.querySelector("#root").getAttribute("show")) {
	case "CEX" || "FMX" || "ABX" || "TTE" || "HPP" || "SPC":
		country = "US";
		break;
	case "FME" || "BRE" || "OCS" || "SAT" || "ABE":
		country = "GERMANY";
		break;
	default:
		country = "US";
		break;
}

let extraParams = window.location.href.includes("?") ? window.location.href.split("?")[1].split("&") : null;
if (extraParams) {
	extraParams = extraParams.includes("preview=true") ? null : extraParams;
}
let ids, multiExpo;
if (document.querySelector("#root").getAttribute("mode") === "LIST") {
	ids = document.querySelector("#root").getAttribute("expos").replace(/'/g, "").split(",");
	multiExpo = document.querySelector("#root").getAttribute("expos").replace(/'/g, "").split(",").length > 1;
} else {
	ids = extraParams.find((param) => param.includes("ref="));
	ids = ids.split("=")[1];
	multiExpo = false;
	extraParams = extraParams.filter((param) => !param.includes("ref="));
}

if (extraParams) {
	extraParams = extraParams.forEach((param) => {
		extraParams[param.split("=")[0]] = param.split("=")[1]; //converting to 2d array
	});
}

const options = {
	ids, //Expo ids
	show: document.querySelector("#root").getAttribute("show"), //Show acronym
	reglink: document.querySelector("#root").getAttribute("reglink"), //N200 reg link
	event: document.querySelector("#root").getAttribute("event"), //Long Event name
	contactcampaign: document.querySelector("#root").getAttribute("contactcampaign"), //Contact exhib camp id
	gtm: document.querySelector("#root").getAttribute("gtm"), //Google Tag Manager ID
	country, //US or Germany
	mode: document.querySelector("#root").getAttribute("mode"), //Exhibitor list, profile or article
	convincepdf: document.querySelector("#root").getAttribute("bosspdf"), //Convince your boss pdf
	multiExpo, //multiple expo ids detected
	extraParams, //extra arguments in the url, null if none
};

console.log("OPTIONS: ", options);

ReactDOM.render(<App options={options} />, document.querySelector("#root"));
