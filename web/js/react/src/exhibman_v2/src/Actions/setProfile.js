const setProfile = id =>{
    return{
        type: 'SET_PROFILE',
        payload: id
    };
};

export default setProfile;