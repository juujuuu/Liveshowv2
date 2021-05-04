import "regenerator-runtime/runtime.js";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';

var options = {
    conf: document.querySelector("#root").getAttribute("conf"),
    show: document.querySelector("#root").getAttribute("show"),
    reglink: document.querySelector("#root").getAttribute("reglink"),
    event: document.querySelector("#root").getAttribute("event"),
    contactcampaign: document.querySelector("#root").getAttribute("contactcampaign"),
    continent: document.querySelector("#root").getAttribute("continent"),
    mode: document.querySelector("#root").getAttribute("mode"),
    windowwidth: window.innerWidth,
    downloadagenda: document.querySelector("#root").getAttribute("downloadagenda"),
    convincepdf: document.querySelector("#root").getAttribute("convincepdf"),
    additionalfilters: document.querySelector("#root").getAttribute("additionalfilters") != undefined ? document.querySelector("#root").getAttribute("additionalfilters").split(" | ") : false,
    daynameoverride: document.querySelector("#root").getAttribute("daynameoverride") != "" ? document.querySelector("#root").getAttribute("daynameoverride").split(" | ") : undefined
};

//Fix for test sites
if(options.show.includes("-Test")){
    options.show = options.show.replace("-Test", "");
}

ReactDOM.render(<App options={options} />, document.querySelector('#root'));