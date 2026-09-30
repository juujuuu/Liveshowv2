import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./Reducers";

import App from "./Components/App";
import TagManager from "react-gtm-module";
import { BrowserRouter } from "react-router-dom";

import ReactGA from "react-ga";
ReactGA.initialize(document.querySelector("#root").getAttribute("gtm"));

let country;
//Show specific stuff.  This might be redundant now actually?  CBA to check.
switch (document.querySelector("#root").getAttribute("show")) {
    case "CEX":
    case "FMX":
    case "ABX":
    case "TTE":
    case "HPP":
    case "SPC":
        country = "US";
        break;
    case "FME":
    case "BRE":
    case "OCS":
    case "SAT":
    case "ABE":
        country = "GERMANY";
        break;
    default:
        country = "US";
        break;
}
/*
	Very similar setup to Confman, look there if you want more insight, i'm not righting the same stuff twice.
*/
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
    extraParams = extraParams.forEach(param => {
        extraParamsObj[param.split("=")[0]] = param.split("=")[1]; //converting to 2d array
    });
    for (const key in extraParamsObj) {
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
    }
}

const options = {
    ids, //Expo ids
    profileId: !profileId ? "" : profileId,
    articleId: !articleId ? "" : articleId,
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
    debug: document.querySelector("#root").getAttribute("debug") == "true" ? true : false,
    local: document.querySelector("#root").getAttribute("local") == "true" ? true : false,
    postshow: document.querySelector("#root").getAttribute("postshow") == "true" ? true : false,
    espabm: document.querySelector("#root").getAttribute("espabm") == "true" ? true : false,
};

//console.log("OPTIONS: ", options);

TagManager.initialize({
    gtmId: document.querySelector("#root").getAttribute("gtm"),
});

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App initOptions={options} />
        </BrowserRouter>
    </Provider>,
    
    document.querySelector("#root")
);
