import ReactGA from "react-ga";
const pushPageView = function () {
    ReactGA.pageview(window.location.pathname + window.location.search);
    
};
export { pushPageView };
