import createAPI from "../Utils/createApi";

const fetchSpeakerList = (site, conferenceId) => async dispatch => {
	const api = createAPI(site);
	let response = await api.get(`/confman.php?call[]=presentation&confId=${conferenceId}`);
	const { data } = response;
	
	// console.log(data)
	dispatch({ type: "FETCH_SPEAKERLIST", payload: data });
};

export default fetchSpeakerList;