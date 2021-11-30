const getExhibListPathRoute = (debug = false) => {
	return `/${debug ? "site/debug-" : ""}exhibitor-list/`;
};
const getProfilePathRoute = (debug = false) => {
	return `/${debug ? "site/debug-" : ""}exhibitor-list/${debug ? "debug-" : ""}exhibitor/`;
};
const getProductPathRoute = (debug = false) => {
	return `/${debug ? "site/debug-" : ""}exhibitor-list/${debug ? "debug-" : ""}product/`;
};
const getExhibListPath = (debug = false) => {
	return `/${debug ? "site/debug-" : ""}exhibitor-list/`;
};
const getProfilePath = (id, debug = false) => {
	return `/${debug ? "site/debug-" : ""}exhibitor-list/${debug ? "debug-" : ""}exhibitor/?boothid=${id}`;
};
const getProductPath = (ids, debug = false) => {
	return `/${debug ? "site/debug-" : ""}exhibitor-list/${debug ? "debug-" : ""}product/?boothid=${ids[0]}&assetid=${ids[1]}`;
};

export { getExhibListPathRoute, getProfilePathRoute, getProductPathRoute, getExhibListPath, getProfilePath, getProductPath };
