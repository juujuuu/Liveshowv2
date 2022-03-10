const setError = (boolean) =>{
    return {
        type: "SET_ERROR",
        payload: boolean
    };
}

export default setError;