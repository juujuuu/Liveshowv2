const maxShowsReducer = (state = [], action) => {
	switch (action.type) {
		case "SET_MAX_SHOWS":
			
			//removed the empty value and skip creating a new button
			const filterredPayload = [...action.payload].filter(n=>n)
			console.log(filterredPayload ,"SET_MAX_SHOWS")
			return  filterredPayload;
		
		default:
			return state;
	}
};

export default maxShowsReducer;
