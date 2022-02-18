import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import exhibReducer from "./exhibReducer";
import exhibsReducer from "./exhibsReducer";
import loadingReducer from "./loadingReducer";
import modeReducer from "./modeReducer";
import productReducer from "./productReducer";
import optionsReducer from "./optionsReducer";
import queriesReducer from "./queriesReducer";
import profileReducer from "./profileReducer";
import setDownloadListReducer from "./setDownloadListReducer";

export default combineReducers({
	exhibs: exhibsReducer,
	exhibitor: exhibReducer,
	productId: productReducer,
	queries: queriesReducer,
    options: optionsReducer,
	mode: modeReducer,
	loading: loadingReducer,
	error: errorReducer,
	profileId: profileReducer,
	downloadList: setDownloadListReducer
});
