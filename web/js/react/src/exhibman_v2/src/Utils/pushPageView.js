import ReactGA from "react-ga";
/**
 * Google analytics utility for Multi page app.
 */
const pushPageView = function () {
    ReactGA.pageview(window.location.pathname + window.location.search);
};
export { pushPageView };
