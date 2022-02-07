const modeReducer = (state = "LIST", action) => {
	switch (action.type) {
		case "SET_MODE":
			return action.payload;
		default:
			return state;
	}
};

export default modeReducer;
