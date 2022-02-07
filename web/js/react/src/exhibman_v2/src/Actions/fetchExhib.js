import createAPI from "../Utils/api";

const fetchExhib = (site, id) => async dispatch => {
	const api = createAPI(site);
	let response = await api.get(`/rest/exhib_drilldown.php?booth='${id}'`);
	const { data } = response;
	dispatch({ type: "FETCH_EXHIB", payload: data });
};

export default fetchExhib;
