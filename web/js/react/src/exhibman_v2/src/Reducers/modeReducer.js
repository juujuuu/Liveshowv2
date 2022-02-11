const modeReducer = (state = "LIST", action) => {
	switch (action.type) {
		case "SET_MODE":
			console.log("MODE REDUCER: ", action.payload);
			return action.payload;
		default:
			return state;
	}
};

export default modeReducer;
