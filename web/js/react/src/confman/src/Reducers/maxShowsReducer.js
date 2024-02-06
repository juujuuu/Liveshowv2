const maxShowsReducer = (state = [], action) => {
	switch (action.type) {
		case "SET_MAX_SHOWS":
			
			//removed the empty value and skip creating a new button 
			//* I have removed this and added it to showsNamesSanitised in fetchConference*
			// const filterredPayload = [...action.payload].filter(n=>n)
			// 
			return  action.payload;
		
		default:
			return state;
	}
};

export default maxShowsReducer;
