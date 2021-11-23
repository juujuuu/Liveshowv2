import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';

//List of options from the dom loader for show specific behaviours
var options = {
    expo: document.querySelector("#root").getAttribute("expo"),
    show: document.querySelector("#root").getAttribute("show"),
    pdf: document.querySelector("#root").getAttribute("pdf"),
    enhancedtext: document.querySelector("#root").getAttribute("enhancedtext"),
    reglink: document.querySelector("#root").getAttribute("reglink"),
    continent: document.querySelector("#root").getAttribute("continent"),
    multiExpo: document.querySelector("#root").getAttribute("expo").replace(/'/g,'').split(","), //length > 1 if more than one expo code
}
//Fix for test sites
if(options.show.includes("-Test")){
    options.show = options.show.replace("-Test", "");
}

console.log(options);
ReactDOM.render(<App options={options} />, document.querySelector('#root'));