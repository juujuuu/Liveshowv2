import createAPI from "../Utils/api";

const fetchConference = (site, conferenceId) => async dispatch => {
	const api = createAPI(site);
	let response = await api.get(`/confman.php?call[]=presentation&call[]=session&confId=${conferenceId}`);
	const { data } = response;
	
	dispatch({ type: "FETCH_CONFERENCE", payload: data });
};

export default fetchConference;