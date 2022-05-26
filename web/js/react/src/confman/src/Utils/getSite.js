const getSiteFromAcronym = (show) => {
    switch (show.toLowerCase()) {
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

const getSiteFromId = (conferenceId) => {
    switch (conferenceId) {
        case "a3i4V000001pJMf":
            return "FMX";
        case "a3i4V000001tXtn":
            return "FMX";
        case "a3i4V000001hXhE":
            return "FMX";
        case "a3i4V000001pJMf":
            return "ABX";
        case "a3i4V000001hXhE":
            return "ABX";
        case "a3i4V000001pPTc":
            return "FME";
        case "a3i4V000001pJWy":
        case "a3i4V000000bqIX":
            return "CEX";
        case "a3i4V000000bqIc":
            return "SPC";
        case "a3i4V000001pORm":
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
        case "TODO":
            return "ABE";
        default:
            throw "Acrnym not found";
    }
};

const getShowNameFromAcronym = (show) => {
    switch (show) {
        case "fmx":
            return "https://www.foam-expo.com/";
        case "abx":
            return "https://www.adhesivesandbondingexpo.com/";
        case "fme":
            return "https://www.foam-expo.eu/";
        case "abe":
            return "https://adhesivesandbondingexpo.eu/";
        case "cex":
            return "https://www.ceramicsexpousa.com/";
        case "hpp":
            return "https://www.highperformanceplasticsexpo.com/";
        case "spc":
            return "https://www.spacetechexpo.com/";
        case "bre":
            return "http://www.spacetechexpo.eu/";
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
