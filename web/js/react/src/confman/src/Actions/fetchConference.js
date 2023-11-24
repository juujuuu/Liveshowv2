import createAPI from "../Utils/createApi";
import setLowestDay from "./setLowestDay";
import setMaxDays from "./setMaxDays";
import setMaxTracks from "./setMaxTracks";
/**
 * So to use async stuff in a redux action creator and other action creators you have to use a middleware called thunk which lets you return an async function from the action creator.
 * @param {String} site - Full site url.
 * @param {String} conferenceId - SF conference Id.
 * @returns Conference sessions.
 */
const fetchConference = (site, conferenceId) => async dispatch => {
    const api = createAPI(site);
    let response = await api.get(`/confman.php?call[]=presentation&call[]=session&confId=${conferenceId}`);
    const { data } = response;
    const { session } = data;
// console.log(response,"data fetch")
// console.log(data, "data")
    //Dispatch these actions.
    dispatch({ type: "FETCH_CONFERENCE", payload: data });
    dispatch(setMaxDays(session));
    dispatch(setLowestDay(session));
    dispatch(setMaxTracks(session));
};

export default fetchConference;
