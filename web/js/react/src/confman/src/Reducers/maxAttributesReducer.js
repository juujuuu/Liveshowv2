const maxAttributesReducer = (state = 0, action) => {
	switch (action.type) {
		case "SET_MAX_TRACKS":
			return action.payload;
		case "SET_MAX_DAYS":
			return action.payload;

		default:
			return state;
	}
};

export default maxAttributesReducer;
