const getExhibListPath = (debug = false, local = false) => {
	return `${!local && debug ? "/site" : ""}/${
		debug ? "debug-" : ""
	}exhibitor-list/`;
};
const getProfilePath = (debug = false, local = false, id = false) => {
	return `${!local && debug ? "/site" : ""}/${
		debug ? "debug-" : ""
	}exhibitor-list/${debug ? "debug-" : ""}exhibitor/${
		id ? `?boothid=${id}` : ""
	}`;
};
const getProductPath = (debug = false, local = false, ids = false) => {
	return `${!local && debug ? "/site" : ""}/${
		debug ? "debug-" : ""
	}exhibitor-list/${debug ? "debug-" : ""}product/${
		ids ? `?boothid=${ids[0]}&assetid=${ids[1]}` : ""
	}`;
};

export { getExhibListPath, getProfilePath, getProductPath };
