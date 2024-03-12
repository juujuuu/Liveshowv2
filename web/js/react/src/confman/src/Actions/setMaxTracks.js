const setMaxTracks = sessions => {
	let maxNumber = 0;
	sessions.forEach(session => {
		const { Track_Number__c } = session;		
		maxNumber = Track_Number__c > maxNumber ? Track_Number__c : maxNumber;
	});
	return {
		type: "SET_MAX_TRACKS",
		payload: maxNumber,
	};
};

export default setMaxTracks;
