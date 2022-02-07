import createAPI from "../Utils/api";

const fetchExhibs = (site, expos) => async dispatch => {
	const api = createAPI(site);
	let response = await api.get(`/rest/exhibman.php?expos=${expos}`);
	const { data } = response;
	dispatch({ type: "FETCH_EXHIBS", payload: data });
};

export default fetchExhibs;
