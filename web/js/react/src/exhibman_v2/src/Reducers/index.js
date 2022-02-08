import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import exhibReducer from "./exhibReducer";
import exhibsReducer from "./exhibsReducer";
import loadingReducer from "./loadingReducer";
import modeReducer from "./modeReducer";
import productReducer from "./productReducer";
import optionsReducer from "./optionsReducer";
import queriesReducer from "./queriesReducer";

export default combineReducers({
	exhibs: exhibsReducer,
	exhibitor: exhibReducer,
	product: productReducer,
	queries: queriesReducer,
    options: optionsReducer,
	mode: modeReducer,
	loading: loadingReducer,
	error: errorReducer,
});
