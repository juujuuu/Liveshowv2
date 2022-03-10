const setLetter = letter => {
	letter = letter === "-1" ? Number("-1") : letter;
	return {
		type: "SET_LETTER",
		payload: letter,
	};
};

export default setLetter;
