/**
 * Most helpful series of functions on earth
 * @param {String} show - Show acronym.
 * @returns The url of the site using that show acronym.
 */
const getSiteFromAcronym = show => {
    switch (show.toLowerCase()) {
        case "fmx":
            return "https://www.foam-expo.com/";
        case "abx":
            return "https://www.adhesivesandbondingexpo.com/";
        case "fme":
            return "https://www.foam-expo-europe.com/";
        case "abe":
            return "https://www.adhesivesandbondingexpo-europe.com/";
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

/**
 *
 * @param {String} conferenceId - Salesforce Id of the conference
 * @returns The site Url of that conference.
 */
const getSiteFromId = conferenceId => {
    switch (conferenceId) {
        case "a3i4V000001pJMf":
        case "a3i4V000001tXtn":
        case "a3i4V000001hXhE":
            return "FMX";
        case "a3i4V000001pJMf":
        case "a3i4V000001hXhE":
            return "ABX";
        case "a3i4V000001pPTc":
        case "What ever the sf id of the solutions innovation agenda ends up being":
            return "FME";
        case "a3i4V000001pJWy":
        case "a3i4V000000bqIX":
            return "CEX";
        case "a3i4V00000222YG":
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

/**
 *
 * @param {String} acronym -The show acronym.
 * @returns The full show name.
 */
const getShowNameFromAcronym = acronym => {
    switch (acronym.toLowerCase()) {
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
        case "tme":
            return "Thermal Management Expo";
        case "ocs":
            return "Onboard  Connectivity Summit";
        case "sat":
            return "Satellite Connectivity Summit";
        default:
            return "Acronym not found";
    }
};

export { getSiteFromId, getSiteFromAcronym, getShowNameFromAcronym };
