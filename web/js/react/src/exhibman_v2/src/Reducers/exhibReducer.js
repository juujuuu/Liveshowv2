const exhibReducer = (state = {}, action) => {
	switch (action.type) {
		case "FETCH_EXHIB":
			return action.payload;
		default:
			return state;
	}
};

export default exhibReducer;
