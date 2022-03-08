const fetchSpeakersReducer = (state = [], action) => {
	const { type } = action;
	let { payload: data } = action;
	switch (type) {
		case "FETCH_SPEAKERLIST":
			let { presentation: presentations } = data;
			console.log("Speaker List Reducer receiving: ", presentations);
			//Merge multiple speakers into one element
			const referenceSpeakers = [...presentations];
			let newSpeakers = [];
			for (let i = 0; i < referenceSpeakers.length; i++) {
				let element = referenceSpeakers[i];
				if (
					undefined !=
					newSpeakers.find(
						speaker =>
							element.Speaker__r.Id == speaker.Speaker__r.Id
					)
				) {
					//array already contains this speaker
					//Push session data to array
					let currentSpeaker = newSpeakers.find(
						speaker =>
							element.Speaker__r.Id == speaker.Speaker__r.Id
					);
					let index = newSpeakers.indexOf(currentSpeaker);
					newSpeakers[index].sessions.push({
						roll: element.Roll__c,
						id: referenceSpeakers[i].Session__r.Id,
						day: referenceSpeakers[i].Session__r.Day__c,
						name: referenceSpeakers[i].Session__r.Name,
						start: referenceSpeakers[i].Session__r.Start_Time__c,
						track: referenceSpeakers[i].Session__r.Track_Number__c,
					});
				} else {
					//array doesn't container this speaker__c
					element.sessions = [];
					element.sessions.push({
						roll: element.Roll__c,
						id: referenceSpeakers[i].Session__r.Id,
						day: referenceSpeakers[i].Session__r.Day__c,
						name: referenceSpeakers[i].Session__r.Name,
						start: referenceSpeakers[i].Session__r.Start_Time__c,
						track: referenceSpeakers[i].Session__r.Track_Number__c,
					});
					newSpeakers.push(element);
				}
			}
			//Alphabetize
			newSpeakers = newSpeakers.sort((a, b) => {
				if (a.Last_Name__c < b.Last_Name__c) {
					return -1;
				}
				if (a.Last_Name__c > b.Last_Name__c) {
					return 1;
				}
				return 0;
			});
			//Switching 18bit id to 15
			newSpeakers = newSpeakers.map(speaker => {
				speaker.sessions = speaker.sessions.map(session => {
					session.id = session.id.substring(0, session.id.length - 3);
					return session;
				});
				return speaker;
			});
		default:
			return state;
	}
};

export default fetchSpeakersReducer;
