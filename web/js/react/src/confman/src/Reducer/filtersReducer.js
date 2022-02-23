const filtersReducer = (
	state = { track: [], day: [], query: "", letter: -1 },
	action
) => {
	const { type, payload } = action;
	switch (type) {
		case "SET_DAY":
			if (state.day.find(d => d === payload) !== undefined) {
				let newDays = state.day.filter(d => d !== payload);
				return { ...state, day: newDays };
			} else {
				return { ...state, day: [...state.day, payload] };
			}
		case "SET_TRACK":
			if (state.track.find(t => t === payload) !== undefined) {
				let newTracks = state.track.filter(d => d !== payload);
				return { ...state, day: newTracks };
			} else {
				return { ...state, track: [...state.track, payload] };
			}
		case "SET_LETTER":
			return { ...state, letter: payload };
		case "SET_QUERY":
			return { ...state, query: payload };
		default:
			return state;
	}
};

export default filtersReducer;