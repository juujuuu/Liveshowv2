const fetchConferenceReducer = (state = [], action) => {
	const { type } = action;
	let { payload: data } = action;
	switch (type) {
		case "FETCH_CONFERENCE":
			let { session: sessions, presentation: presentations } = data;
			// console.log(data,"dataaaa")
			//Assign presentations to session
			sessions = sessions.map(session => {
				//check if any presentations match the session id
				session.presentations = [];
				while (
					presentations.find(
						presentation => presentation.Session__c == session.Id
					) != undefined
				) {
					let found = presentations.find(presentation => {
						return presentation.Session__c == session.Id;
					});
					let index = presentations.indexOf(found);
					if (index > -1) {
						presentations.splice(index, 1);
					}
					session.presentations.push(found);
				}
				session.presentations = session.presentations.sort((a, b) => {
					if (a.Order__c > b.Order__c) {
						return 1;
					}
					if (a.Order__c < b.Order__c) {
						return -1;
					}
					return 0;
				});
				return session;
			});
			//order sessions by day
			sessions = sessions.sort((a, b) => {
				if (a.Day__c > b.Day__c) {
					return 1;
				}
				if (a.Day__c < b.Day__c) {
					return -1;
				}
				return 0;
			});
			//Normalise timestamps
			sessions = sessions.map((session, index) => {
				let timestamp = session.Start_Time__c;
				let day = timestamp.substring(8, 10);
				let hour = timestamp.substring(11, 13);
				let minute = timestamp.substring(14, 16);
				let ampm = hour > 11 ? "PM" : "AM";
				session.normalTime = { day, hour, minute, ampm };
				return session;
			});
			//Order sessions by time
			sessions = sessions.sort((a, b) => {
				if (a.Day__c == b.Day__c) {
					if (
						a.normalTime.hour + a.normalTime.minute >
						b.normalTime.hour + b.normalTime.minute
					) {
						return 1;
					}
					if (
						a.normalTime.hour + a.normalTime.minute <
						b.normalTime.hour + b.normalTime.minute
					) {
						return -1;
					}
					return 0;
				}
				return 0;
			});
			//Clean synopsis, convert 18char to 15char id
			sessions = sessions.map(session => {
				session.Synopsis__c =
					session.Synopsis__c == null ? "" : session.Synopsis__c;

				session.Id = session.Id.substring(0, session.Id.length - 3);
				return session;
			});
			return sessions;
		default:
			return state;
	}
};

export default fetchConferenceReducer;
