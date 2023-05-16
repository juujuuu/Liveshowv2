/**
 * Determains what path to get for the router whether it is running in local mode, in the site folder etc
 */
const getExhibListPath = (debug = false, local = false) => `${!local && debug ? "/site" : ""}/${debug ? "debug-" : ""}exhibitor-list/`;

const getLeadRetPath = (debug = false, local = false) => `${!local && debug ? "/site" : ""}/${debug ? "debug-" : ""}lead-retrieval/`;
const getProfilePath = (debug = false, local = false, id = false) =>
    `${!local && debug ? "/site" : ""}/${debug ? "debug-" : ""}exhibitor-list/${debug ? "debug-" : ""}exhibitor/${id ? `?boothid=${id}` : ""}`;

const getProductPath = (debug = false, local = false, ids = false) =>
    `${!local && debug ? "/site" : ""}/${debug ? "debug-" : ""}exhibitor-list/${debug ? "debug-" : ""}product/${
        ids ? `?boothid=${ids[0]}&assetid=${ids[1]}` : ""
    }`;

export { getExhibListPath, getProfilePath, getProductPath,getLeadRetPath  };
