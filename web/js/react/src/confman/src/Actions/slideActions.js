// slideActions.js

export const TOGGLE_SLIDE = "TOGGLE_SLIDE";
export const OPEN_ALL_SLIDES = "OPEN_ALL_SLIDES";
export const CLOSE_ALL_SLIDES = "CLOSE_ALL_SLIDES";
export const GET_SESSIONS__SLIDE__STATE ="GET_SESSIONS__SLIDE__STATE"

// Action to toggle a single slide
export const sessionsSlideState = (index) => ({
    type: GET_SESSIONS__SLIDE__STATE,
    payload: index,
  });

// Action to toggle a single slide
export const toggleSlide = (index) => ({
  type: TOGGLE_SLIDE,
  payload: index,
});

// Action to open all slides
export const openAllSlides = () => ({
  type: OPEN_ALL_SLIDES,
});

// Action to close all slides
export const closeAllSlides = () => ({
  type: CLOSE_ALL_SLIDES,
});
