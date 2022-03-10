const openSlidesReducer = (state = false, action) => {
	switch (action.type) {
		case "SET_OPENSLIDES":
			return action.payload;
		default:
			return state;
	}
};

export default openSlidesReducer;
