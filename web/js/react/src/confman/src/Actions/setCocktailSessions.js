const setCocktailSessions = (sessions) =>{
    return {
        type: "SET_COCKTAIL_SESSIONS",
        payload: sessions
    };
}

export default setCocktailSessions;