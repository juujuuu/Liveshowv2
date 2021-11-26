const getExhibListPath = (debug = false) => {
	return `/${debug ? "site/debug-" : ""}exhibitor-list/`;
};
const getProfilePath = (id, debug = false) => {
	return `/${debug ? "site/debug-" : ""}exhibitor-list/${debug ? "debug-" : ""}exhibitor?boothid=${id}`;
};
const getProductPath = (ids, debug = false) => {
	return `/${debug ? "site/debug-" : ""}exhibitor-list/${debug ? "debug-" : ""}product?boothid=${ids[0]}&assetid=${ids[1]}`;
};

export { getExhibListPath, getProfilePath, getProductPath };
