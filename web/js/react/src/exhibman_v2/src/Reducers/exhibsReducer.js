const exhibsReducer = (state = [], action) =>{
    switch(action.type){
        case "FETCH_EXHIBS":
            return action.payload;
        default:
            return state;
    }
};
export default exhibsReducer;