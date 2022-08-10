import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import loadingReducer from "./loadingReducer";
import optionsReducer from "./optionsReducer";
import filtersReducer from "./filtersReducer";
import openSlidesReducer from "./openSidesReducer";
import fetchConferenceReducer from "./fetchConferenceReducer";
import fetchSpeakersReducer from "./fetchSpeakersReducer";
import maxDaysReducer from "./maxDaysReducer";
import maxTracksReducer from "./maxTracksReducer";
import initialParamsReducer from "./initialParamsReducer";
import lowestDayReducer from "./lowestDayReducer";

/**
 * Our redux store.  (Sometimes it's erroneously called state).
 */
export default combineReducers({
    error: errorReducer,
    loading: loadingReducer,
    options: optionsReducer,
    filters: filtersReducer,
    openSlides: openSlidesReducer,
    sessions: fetchConferenceReducer,
    speakers: fetchSpeakersReducer,
    maxDays: maxDaysReducer,
    maxTracks: maxTracksReducer,
    dealtWithInitialParams: initialParamsReducer,
    lowestDay: lowestDayReducer,
});
