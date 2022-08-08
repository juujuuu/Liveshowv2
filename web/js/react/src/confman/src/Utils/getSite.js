const getSiteFromAcronym = show => {
    switch (show.toLowerCase()) {
        case "fmx":
            return "https://www.foam-expo.com/";
        case "abx":
            return "https://www.adhesivesandbondingexpo.com/";
        case "fme":
            return "https://www.foam-expo-europe.com/";
        case "abe":
            return "https://www.adhesivesandbondingexpo.com/";
        case "cex":
            return "https://www.ceramicsexpousa.com/";
        case "spc":
            return "https://www.spacetechexpo.com/";
        case "bre":
            return "https://www.spacetechexpo-europe.com/";
        case "ocs":
            return "https://www.onboardconnectivitysummit.com/";
        case "sat":
            return "https://www.satelliteconnectivitysummit.com/";
        case "nzb":
            return "https://www.netzerobuildsummit.com/";
        case "tme":
            return "https://www.thermalmanagementexpo.com/";
        default:
            throw "Acrnym not found";
    }
};

const getSiteFromId = conferenceId => {
    switch (conferenceId) {
        case "a3i4V000001pJMf":
        case "a3i4V000001tXtn":
            return "FMX";
        case "a3i4V000001hXhE":
            return "FMX";
        case "a3i4V000001pJMf":
            return "ABX";
        case "a3i4V000001hXhE":
            return "ABX";
        case "a3i4V000001pPTc":
        case "What ever the sf id of the solutions innovation agenda ends up being":
            return "FME";
        case "a3i4V000001pJWy":
        case "a3i4V000000bqIX":
            return "CEX";
        case "a3i4V000000bqIc":
            return "SPC";
        case "a3i4V000001pORm":
        case "a3i4V000000bqIh":
        case "a3i4V00000222PA":
            return "BRE";
        case "a3i4V000001pOUg":
            return "OCS";
        case "a3i4V000001pP9m":
            return "SAT";
        case "a3i4V000001tXpE":
            return "NZB";
        case "a3i4V000000bqIr":
            return "TME";
        case "TODO":
            return "HPP";
        case "a3i4V000000bqIw":
        case "What ever the sf id of the solutions innovation agenda ends up being":
            return "ABE";
        default:
            throw "Acrnym not found";
    }
};

const getShowNameFromAcronym = show => {
    switch (show) {
        case "fmx":
            return "https://www.foam-expo.com/";
        case "abx":
            return "https://www.adhesivesandbondingexpo.com/";
        case "fme":
            return "https://www.foam-expo-europe.com/";
        case "abe":
            return "https://adhesivesandbondingexpo-europe.com/";
        case "cex":
            return "https://www.ceramicsexpousa.com/";
        case "hpp":
            return "https://www.highperformanceplasticsexpo.com/";
        case "spc":
            return "https://www.spacetechexpo.com/";
        case "bre":
            return "http://www.spacetechexpo-europe.com/";
        case "ocs":
            return "https://www.onboardconnectivitysummit.com/";
        case "sat":
            return "https://www.satelliteconnectivitysummit.com/";
        case "nzb":
            return "https://www.netzerobuildsummit.com/";
        case "tme":
            return "https://www.thermalmanagementexpo.com/";
        default:
            throw "Acronym not found";
    }
};

export { getSiteFromId, getSiteFromAcronym, getShowNameFromAcronym };
