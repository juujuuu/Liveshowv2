const setQueries = (search, letter, expo) => {
	return {
		type: "SET_QUERY",
		payload: { search, letter, expo },
	};
};

export default setQueries;
