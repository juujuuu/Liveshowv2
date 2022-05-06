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
        case "spc":
            return "Space Tech Expo";
        case "bre":
            return "Space Tech Expo Europe";
        case "tme":
            return "Thermal Management Expo";
        default:
            return "Acronym not found";
    }
};
const getSiteFromAcronym = (expo) => {
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
        case "tme":
            return "https://www.thermalmanagementexpo.com/";
        default:
            return "Acronym not found";
    }
};
const getSiteFromId = (expo) => {
    expo = expo.replaceAll("'", "");
    console.log("get site: ", expo);
    switch (expo) {
        case "a1x3A000001FSz9":
            return "https://www.foam-expo.com/";
        case "a1x4V000001YVpe":
            return "https://www.adhesivesandbondingexpo.com/";
        case "a1x4V000001YVpy":
            return "https://www.foam-expo.eu/";
        case "a1x4V000000xCSR":
            return "https://www.adhesivesandbondingexpo.eu/";
        case "a1x4V000001Yg1J":
            return "https://www.ceramicsexpousa.com/";
        case "a1x4V000001Ye1A":
            return "https://www.spacetechexpo.com/";
        case "a1x4V000001YePp":
            return "https://www.spacetechexpo.eu/";
        case "a1x4V000001V7dG":
            return "https://www.thermalmanagementexpo.com/";
        default:
            return "ID not found";
    }
};
const getShowNameFromId = (id) => {
    id = id.replaceAll("'", "");
    switch (id) {
        case "a1x3A000001FSz9":
            return "Foam Expo North America";
        case "a1x4V000001YVpe":
            return "Adhesives & Bonding Expo";
        case "a1x4V000001YVpy":
            return "Foam Expo Europe";
        case "a1x4V000000xCSR":
            return "Adhesives & Bonding Expo Europe";
        case "a1x4V000001Yg1J":
            return "Ceramics Expo";
        case "a1x4V000001Ye1A":
            return "Space Tech Expo";
        case "a1x4V000001YePp":
            return "Space Tech Expo Europe";
        case "a1x4V000001V7dG":
            return "Thermal Management Expo";
        default:
            return "ID not found";
    }
};
const getAcronymFromId = (id) => {
    id = id.replaceAll("'", "");
    switch (id) {
        case "a1x3A000001FSz9":
            return "FMX";
        case "a1x4V000001YVpe":
            return "ABX";
        case "a1x4V000001YVpy":
            return "FME";
        case "a1x4V000000xCSR":
            return "ABE";
        case "a1x4V000001Yg1J":
            return "CEX";
        case "a1x4V000001Ye1A":
            return "SPC";
        case "a1x4V000001YePp":
            return "BRE";
        case "a1x4V000001V7dG":
            return "TME";
        default:
            return "ID not found";
    }
};
export { getShowNameFromAcronym, getShowNameFromId, getAcronymFromId, getSiteFromAcronym, getSiteFromId };
