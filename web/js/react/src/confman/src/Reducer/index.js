import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import loadingReducer from "./loadingReducer";
import optionsReducer from "./optionsReducer";
import filtersReducer from "./filtersReducer";

export default combineReducers({
    error: errorReducer,
    loading: loadingReducer,
    options: optionsReducer,
    filters: filtersReducer,
});