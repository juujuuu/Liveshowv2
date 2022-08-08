/**
 * The custom folder is basically here to contain misc JavaScript which can't be categorsied into a web app.
 * It compiles into a bundle.js file in the js root directory.
 * JQuery can be used here as this script is added to the DOM afer JQuery is loaded.
 */

import "regenerator-runtime/runtime"; //Little hack to allow async functions and promises.
import "./form";
import "./search";
import "./header-lock";
import "./nav-highlight";
import "./countdown";
