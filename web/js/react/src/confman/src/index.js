import "regenerator-runtime/runtime.js";
import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";

var params = null;
if(window.location.href.includes("?")){
    params = window.location.href.split("?")[1];
    params = params.split("&");
    params = params.map((param) => {
        param = param.split("=");
        return param;
    });
}

var options = {
	conf: document.querySelector("#root").getAttribute("conf"),
	show: document.querySelector("#root").getAttribute("show"),
	reglink: document.querySelector("#root").getAttribute("reglink"),
	reginterest: document.querySelector("#root").getAttribute("reginterest"),
	event: document.querySelector("#root").getAttribute("event"),
	contactcampaign: document.querySelector("#root").getAttribute("contactcampaign"),
	continent: document.querySelector("#root").getAttribute("continent"),
	mode: document.querySelector("#root").getAttribute("mode"),
	downloadagenda: document.querySelector("#root").getAttribute("downloadagenda"),
	convincepdf: document.querySelector("#root").getAttribute("convincepdf"),
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

ReactDOM.render(<App options={options} />, document.querySelector("#root"));
