const setInitialShowsFilters = (shows) =>{
    return {
        type: "SET_INITIAL_SHOWS",
        payload: shows
    };
}

export default setInitialShowsFilters;