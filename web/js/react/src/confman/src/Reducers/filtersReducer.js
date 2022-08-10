const filtersReducer = (state = { track: [], day: 1, query: "", letter: -1 }, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SET_TRACK":
            if (state.track.find(t => t === payload) !== undefined) {
                let newTracks = state.track.filter(t => t !== payload);
                return { ...state, track: newTracks };
            } else {
                return { ...state, track: [...state.track, payload] };
            }
        case "SET_LETTER":
        case "SET_QUERY":
        case "RESET_FILTERS":
        case "SET_DAY":
            return { ...state, letter: payload };
        default:
            return state;
    }
};

export default filtersReducer;
