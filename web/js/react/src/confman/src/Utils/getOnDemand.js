const getOnDemandCode = acronym => {
	switch (acronym) {
		case "SPC":
			return "SPC21OD";
		case "CEX":
			return "CEX21OD";
		case "NZB":
			return "SPC21OD";
		case "FMX":
			return "FA21OD";
		case "ABX":
			return "FA21OD";
		default:
			return "DefaultCode";
	}
};

export { getOnDemandCode };
