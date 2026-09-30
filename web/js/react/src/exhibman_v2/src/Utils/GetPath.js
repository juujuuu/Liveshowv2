/**
 * Determains what path to get for the router whether it is running in local mode, in the site folder etc
   I have added a switch extra path for the router so that the same page can be visualized under another path post show 
*/
// const getExhibListPath = (debug = false, local = false) => `${!local && debug ? "/site" : ""}/${debug ? "debug-" : ""}exhibitor-list/`;
const getExhibListPath = (debug = false, local = false, postshow = false,  espabm = false) =>`${espabm ? "/es" : ""}${!local && debug ? "/site" : ""}/${debug ? "debug-" : ""}exhibitor-list${postshow ? "-post-show" : ""}/`;
const getLeadRetPath = (debug = false, local = false) => `${!local && debug ? "/site" : ""}/${debug ? "debug-" : ""}lead-retrieval/`;

const getProfilePath = (debug = false, local = false, id = false, postshow=false,espabm = false) =>
    `${espabm ? "/es" : ""}${!local && debug ? "/site" : ""}/${debug ? "debug-" : ""}exhibitor-list${postshow ? "-post-show": ""}/${debug ? "debug-" : ""}exhibitor/${id ? `?boothid=${id}` : ""}`;

    const getProductPath = (debug = false, local = false, ids = false, postshow=false,espabm = false) =>
    `${espabm ? "/es" : ""}${!local && debug ? "/site" : ""}/${debug ? "debug-" : ""}exhibitor-list${postshow ? "-post-show": ""}/${debug ? "debug-" : ""}product/${
        ids ? `?boothid=${ids[0]}&assetid=${ids[1]}` : ""
    }`;

export {getExhibListPath, getProfilePath, getProductPath,getLeadRetPath};


