const setLoading = (bool = true) =>{
    return{
        type: 'SET_LOADING',
        payload: bool
    };
};

export default setLoading;