import "regenerator-runtime/runtime.js";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';

var options = {
    boothid: window.location.search.substring(1).split("&")[0].split("=")[1],
    assetid: window.location.search.substring(1).split("&")[1].split("=")[1],
    expo: document.querySelector("#root").getAttribute("expo"),
    show: document.querySelector("#root").getAttribute("show"),
    pdf: document.querySelector("#root").getAttribute("pdf"),
    reglink: document.querySelector("#root").getAttribute("reglink"),
    event: document.querySelector("#root").getAttribute("event"),
    contactcampaign: document.querySelector("#root").getAttribute("contactcampaign"),
    contactobject: "00N30000004mdGe",
    enhancedtext: document.querySelector("#root").getAttribute("enhancedtext"),
    continent: document.querySelector("#root").getAttribute("continent")
};

//Fix for test sites
if(options.show.includes("-Test")){
    options.show = options.show.replace("-Test", "");
}

ReactDOM.render(<App options={options} />, document.querySelector('#root'));