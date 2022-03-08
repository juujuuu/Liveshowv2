import createAPI from "../Utils/createApi";

const fetchSpeakerList = (site, conferenceId) => async dispatch => {
	const api = createAPI(site);
	let response = await api.get(`/rest/confman.php?call[]=presentation&confId=${conferenceId}`);
	const { data } = response;
	
	dispatch({ type: "FETCH_SPEAKERLIST", payload: data });
};

export default fetchSpeakerList;