const maxTracksReducer = (state = 0, action) => {
	switch (action.type) {
		case "SET_MAX_TRACKS":
			return action.payload;
		default:
			return state;
	}
};

export default maxTracksReducer;
