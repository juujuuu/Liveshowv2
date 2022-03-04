import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import loadingReducer from "./loadingReducer";
import optionsReducer from "./optionsReducer";
import filtersReducer from "./filtersReducer";
import openSlidesReducer from "./openSidesReducer";
import fetchConferenceReducer from "./fetchConferenceReducer";
import fetchSpeakersReducer from "./fetchSpeakersReducer";
import maxAttributesReducer from "./maxAttributesReducer";
import initialParamsReducer from "./initialParamsReducer";

export default combineReducers({
	error: errorReducer,
	loading: loadingReducer,
	options: optionsReducer,
	filters: filtersReducer,
	openSlides: openSlidesReducer,
	sessions: fetchConferenceReducer,
	speakers: fetchSpeakersReducer,
	maxDays: maxAttributesReducer,
	maxTracks: maxAttributesReducer,
	initialParams: initialParamsReducer
});
