const defaultStateSlidesReducer = (state = { slidesState: [] }, action) => {
  const { type, payload } = action; // payload is expected to be an array

  switch (type) {
    case "SET_DEFAULT_STATE_SLIDES":
      // Create a new array of booleans, initialized to false based on the length of the payload
      return {
        ...state, // Copy the existing state
        slidesState: payload.map(() => false) // For each element in payload, set corresponding state to false
      };
    
    case "SET_STATE_SLIDES_ALL_CLOSED":
      return {
        ...state, // Copy the existing state
        slidesState: state.slidesState.map(() => false) // Set all slides to closed (false)
      };

    case "SET_STATE_SLIDES_ALL_OPEN":
      return {
        ...state, // Copy the existing state
        slidesState: state.slidesState.map(() => true) // Set all slides to open (true)
      };

    default:
      return state; // Return current state if no actions match
  }
};

export default defaultStateSlidesReducer;
