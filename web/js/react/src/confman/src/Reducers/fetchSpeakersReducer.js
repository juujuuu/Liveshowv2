const fetchSpeakersReducer = (state = [], action) => {
	const { type } = action;
	let { payload: data } = action;
	switch (type) {
		case "FETCH_SPEAKERLIST":
			let { presentation: presentations } = data;
			console.log("Speaker List Reducer receiving: ", presentations);
			//Merge multiple speakers into one newSpeaker
			const referenceSpeakers = [...presentations];
			let newSpeakers = [];

			for (let i = 0; i < referenceSpeakers.length; i++) {
				let newSpeaker = referenceSpeakers[i];

				if (undefined != newSpeakers.find(speaker => newSpeaker.Speaker__r.Id == speaker.Speaker__r.Id)) {
					//array already contains this speaker
					//Push session data to array
					let currentSpeaker = newSpeakers.find(speaker => newSpeaker.Speaker__r.Id == speaker.Speaker__r.Id);
					let index = newSpeakers.indexOf(currentSpeaker);
					if (referenceSpeakers[i].Session__r) {
						newSpeakers[index].sessions.push({
							roll: newSpeaker.Roll__c,
							id: referenceSpeakers[i].Session__r.Id,
							day: referenceSpeakers[i].Session__r.Day__c,
							name: referenceSpeakers[i].Session__r.Name,
							start: referenceSpeakers[i].Session__r.Start_Time__c,
							track: referenceSpeakers[i].Session__r.Track_Number__c,
						});
					}
				} else {
					//array doesn't container this speaker__c
					newSpeaker.sessions = [];
					if (referenceSpeakers[i].Session__r) {
						newSpeaker.sessions.push({
							roll: newSpeaker.Roll__c,
							id: referenceSpeakers[i].Session__r.Id,
							day: referenceSpeakers[i].Session__r.Day__c,
							name: referenceSpeakers[i].Session__r.Name,
							start: referenceSpeakers[i].Session__r.Start_Time__c,
							track: referenceSpeakers[i].Session__r.Track_Number__c,
						});
					}
					newSpeakers.push(newSpeaker);
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
			return newSpeakers;
		default:
			return state;
	}
};

export default fetchSpeakersReducer;
