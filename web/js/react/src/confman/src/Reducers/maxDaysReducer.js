const maxDaysReducer = (state = 0, action) => {
	switch (action.type) {
		case "SET_MAX_DAYS":
			return action.payload;
		default:
			return state;
	}
};

export default maxDaysReducer;
