const getShowNameFromAcronym = expo => {
	switch (expo) {
		case "fmx":
			return "Foam Expo North America";
		case "abx":
			return "Adhesives & Bonding Expo";
		case "fme":
			return "Foam Expo Europe";
		case "abe":
			return "Adhesives & Bonding Expo Europe";
		case "cex":
			return "Ceramics Expo";
		case "spc":
			return "Space Tech Expo";
		case "bre":
			return "Space Tech Expo Europe";
		default:
			return "Acronym not found";
	}
};
const getSiteFromAcronym = expo => {
	switch (expo) {
		case "fmx":
			return "https://www.foam-expo.com/";
		case "abx":
			return "https://www.adhesivesandbondingexpo.com/";
		case "fme":
			return "https://www.foam-expo.eu/";
		case "abe":
			return "https://www.adhesivesandbondingexpo.com/";
		case "cex":
			return "https://www.ceramicsexpousa.com/";
		case "spc":
			return "https://www.spacetechexpo.com/";
		case "bre":
			return "https://www.spacetechexpo.eu/";
		default:
			return "Acronym not found";
	}
};
const getSiteFromId = expo => {
	expo = expo.replaceAll("'", "");
	console.log(expo)
	switch (expo) {
		case "a1x3A000001FSz9":
			return "https://www.foam-expo.com/";
		case "a1x4V000001YVpeQAG":
			return "https://www.adhesivesandbondingexpo.com/";
		case "a1x4V000001Q9aU":
			return "https://www.foam-expo.eu/";
		case "a1x3A000001FOPe":
			return "https://www.adhesivesandbondingexpo.com/";
		case "a1x4V000001Yg1J":
			return "https://www.ceramicsexpousa.com/";
		case "a1x4V000001Ye1A":
			return "https://www.spacetechexpo.com/";
		case "a1x4V000001YePp":
			return "https://www.spacetechexpo.eu/";
		default:
			return "ID not found";
	}
};
const getShowNameFromId = id => {
	id = id.replaceAll("'", "");
	switch (id) {
		case "a1x3A000001FSz9":
			return "Foam Expo North America";
		case "a1x4V000001YVpeQAG":
			return "Adhesives & Bonding Expo";
		case "a1x4V000001Q9aU":
			return "Foam Expo Europe";
		case "a1x3A000001FOPe":
			return "Adhesives & Bonding Expo Europe";
		case "a1x4V000001Yg1J":
			return "Ceramics Expo";
		case "a1x4V000001Ye1A":
			return "Space Tech Expo";
		case "a1x4V000001YePp":
			return "Space Tech Expo Europe";
		default:
			return "ID not found";
	}
};
const getAcronymFromId = id => {
	id = id.replaceAll("'", "");
	switch (id) {
		case "a1x3A000001FSz9":
			return "Foam Expo North America";
		case "a1x4V000001YVpeQAG":
			return "Adhesives & Bonding Expo";
		case "a1x4V000001Q9aU":
			return "Foam Expo Europe";
		case "a1x3A000001FOPe":
			return "Adhesives & Bonding Expo Europe";
		case "a1x4V000001Yg1J":
			return "Ceramics Expo";
		case "a1x4V000001Ye1A":
			return "Space Tech Expo";
		case "a1x4V000001YePp":
			return "Space Tech Expo Europe";
		default:
			return "ID not found";
	}
};
export {
	getShowNameFromAcronym,
	getShowNameFromId,
	getAcronymFromId,
	getSiteFromAcronym,
	getSiteFromId,
};
