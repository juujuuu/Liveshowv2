// slideReducer.js

import { TOGGLE_SLIDE, OPEN_ALL_SLIDES, CLOSE_ALL_SLIDES,GET_SESSIONS__SLIDE__STATE} from "./slideActions";

const initialState = {
  slides: [false, false, false], // Adjust array length based on the number of slides
};

// Reducer to handle actions
const slideReducer = (state = initialState, action) => {



  switch (action.type) {

    case GET_SESSIONS__SLIDE__STATE:
      return {
        ...state,
        slides: state.slides.map((isOpen, index) =>
          index === action.payload ? !isOpen : isOpen
        ),
      };

    case TOGGLE_SLIDE:
        return {
            ...state,
            slides: state.slides.map((isOpen, index) =>
              index === action.payload ? !isOpen : isOpen
            ),
          };
    case OPEN_ALL_SLIDES:
      return {
        ...state,
        slides: state.slides.map(() => true),
      };
    case CLOSE_ALL_SLIDES:
      return {
        ...state,
        slides: state.slides.map(() => false),
      };
    default:
      return state;
  }
};

export default slideReducer;
