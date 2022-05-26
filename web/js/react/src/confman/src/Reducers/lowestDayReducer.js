const lowestDayReducer = (state = 0, action) => {
    switch (action.type) {
        case "SET_LOWEST_DAY":
            return action.payload;
        default:
            return state;
    }
};

export default lowestDayReducer;
