const setDownloadListReducer = (state = [], action) => {
	switch (action.type) {
        case "SET_DOWNLOAD_LIST":
            if (
                state.find(download => download.id === action.payload.id) !== undefined &&
				state.find(download => download.size === action.payload.size) !== undefined
                ) {
                    //Already have it
                    const newState = state.filter(download=>{
                        const {id, size} = download;                        
                        return id !== action.payload.id && size !== action.payload.size;
                    });
                    return newState;
                } else{
                    //Don't have it, add it
                return [...state, action.payload]
            }			
		default:
			return state;
	}
};

export default setDownloadListReducer;
