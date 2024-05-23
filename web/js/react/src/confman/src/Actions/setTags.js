const setTags = (tags) =>{
    return {
        type: "SET_TAGS",
        payload: tags
    };
}

export default setTags;