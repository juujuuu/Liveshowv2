
const optionsReducer = (state = {}, action) => {
	switch (action.type) {
		case "SET_OPTIONS":
			return action.payload;
		default:
			return state;
	}
};

export default optionsReducer;
