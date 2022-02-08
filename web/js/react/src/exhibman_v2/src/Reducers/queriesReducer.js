const queriesReducer = (state = {search: "", letter: "Show All", expo: ""}, action) => {
	switch (action.type) {
		case "SET_QUERY":
			return action.payload;
		default:
			return state;
	}
};

export default queriesReducer;
