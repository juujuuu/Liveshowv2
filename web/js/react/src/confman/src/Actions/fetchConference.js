import createAPI from "../Utils/createApi";
import setLowestDay from "./setLowestDay";
import setMaxDays from "./setMaxDays";
import setMaxTracks from "./setMaxTracks";

const fetchConference = (site, conferenceId) => async (dispatch) => {
    const api = createAPI(site);
    let response = await api.get(`/confman.php?call[]=presentation&call[]=session&confId=${conferenceId}`);
    const { data } = response;

    dispatch({ type: "FETCH_CONFERENCE", payload: data });
    dispatch(setMaxDays(data.session));
    dispatch(setLowestDay(data.session));
    dispatch(setMaxTracks(data.session));
};

export default fetchConference;
