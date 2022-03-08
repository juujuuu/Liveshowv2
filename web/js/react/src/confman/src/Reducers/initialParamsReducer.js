const initialParamsReducer = (state = false, action) => {
	switch (action.type) {
		case "SET_DEALT_INITIAL_PARAMS":
			return action.payload;
		default:
			return state;
	}
};

export default initialParamsReducer;
