const setQuery = (query) =>{
    return {
        type: "SET_QUERY",
        payload: query
    };
}

export default setQuery;