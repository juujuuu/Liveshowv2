const getShowNameFromAcronym = (expo) => {
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
		default:
			return "Acronym not found";
	}
};
const getShowNameFromId = (id)=>{
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
        default:
            return "Expo not found";
    }
};
export {getShowNameFromAcronym, getShowNameFromId};
