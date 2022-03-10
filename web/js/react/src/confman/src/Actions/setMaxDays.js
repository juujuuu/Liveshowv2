const setMaxDays = sessions => {
	let maxNumber = 0;
	sessions.forEach(session => {
		const { Day__c } = session;
		maxNumber = Day__c > maxNumber ? Day__c : maxNumber;
	});

	return {
		type: "SET_MAX_DAYS",
		payload: maxNumber,
	};
};

export default setMaxDays;
