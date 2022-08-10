import createAPI from "../Utils/api";

/**
 * Async action creator to for getting exhibitors.
 * @param {String} site - url to use as the endpoint.
 * @param {String} expos - String of expos.
 */
const fetchExhibs = (site, expos) => async dispatch => {
    const api = createAPI(site);
    let { data } = await api.get(`/rest/exhibman.php?expos=${expos}`);

    //Alphabetical sort
    data.sort((a, b) => {
        if (a.pagetitle.toLowerCase() < b.pagetitle.toLowerCase()) {
            return -1;
        }
        if (a.pagetitle.toLowerCase() < b.pagetitle.toLowerCase()) {
            return 1;
        }
        return 0;
    });
    dispatch({ type: "FETCH_EXHIBS", payload: data });
};

export default fetchExhibs;
