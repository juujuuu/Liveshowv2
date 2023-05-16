const filtersReducer = (state = { track: [], day: 1, query: "", letter: -1 }, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SET_TRACK":
            if (typeof payload == "object") {
                return { ...state, track: payload };
            } else if (state.track.find(t => t === payload) !== undefined) {
                let newTracks = state.track.filter(t => t !== payload);
                return { ...state, track: newTracks };
            } else {
                return { ...state, track: [...state.track, payload] };
            }
        case "SET_LETTER":
            return { ...state, letter: payload };
        case "SET_QUERY":
            return { ...state, query: payload };
        case "RESET_FILTERS":
            return { ...state,track: [], day: 1, query: "", letter: -1 };
            
        case "SET_DAY":
            return { ...state, day: payload };
        default:
            return state;
    }
};

export default filtersReducer;
