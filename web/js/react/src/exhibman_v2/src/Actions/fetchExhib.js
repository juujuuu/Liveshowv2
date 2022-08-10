import createAPI from "../Utils/api";

/**
 * Async action creator for fetching an exhibitor
 * @param {String} site - Url of site to use as an endpoint.
 * @param {String} id - SF exhibitor id.
 */
const fetchExhib = (site, id) => async dispatch => {
    const api = createAPI(site);
    let { data } = await api.get(`/rest/exhib_drilldown.php?booth='${id}'`);
    dispatch({ type: "FETCH_EXHIB", payload: data[0] });
};

export default fetchExhib;
