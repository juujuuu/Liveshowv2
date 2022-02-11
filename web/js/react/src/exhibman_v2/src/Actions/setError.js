const setError = bool =>{
    return{
        type: 'SET_ERROR',
        payload: bool
    };
};

export default setError;