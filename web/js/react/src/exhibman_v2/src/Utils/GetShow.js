/**
 * Utility functions for swapping between show codes, sf ids, urls etc
 */
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
        case "tme":
            return "Thermal Management Expo";
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
            return "https://www.foam-expo-europe.com/";
        case "abe":
            return "https://www.adhesivesandbondingexpo.com/";
        case "cex":
            return "https://www.ceramicsexpousa.com/";
        case "spc":
            return "https://www.spacetechexpo.com/";
        case "bre":
            return "https://www.spacetechexpo-europe.com/";
        case "tme":
            return "https://www.thermalmanagementexpo.com/";
        default:
            return "Acronym not found";
    }
};
const getSiteFromId = expo => {
    expo = expo.replaceAll("'", "");
    console.log("get site: ", expo);
    switch (expo) {
        case "a1x4V00000117tV":
            return "https://www.foam-expo.com/";
        case "a1x4V00000117ta":
            return "https://www.adhesivesandbondingexpo.com/";
        case "a1x4V00000117tf":
            return "https://www.foam-expo-europe.com/";
        case "a1x4V00000117tk":
            return "https://www.adhesivesandbondingexpo-europe.com/";
        case "a1x4V00000118Gz":
            return "https://www.ceramicsexpousa.com/";
        case "a1x4V000000xD1y":
            return "https://www.spacetechexpo.com/";
        case "a1x4V000000xD23":
            return "https://www.spacetechexpo-europe.com/";
        case "a1x4V000001j7Oz":
            return "https://www.thermalmanagementexpo.com/";
        default:
            return "ID not found";
    }
};
const getShowNameFromId = id => {
    id = id.replaceAll("'", "");
    switch (id) {
        case "a1x4V00000117tV":
            return "Foam Expo North America";
        case "a1x4V00000117ta":
            return "Adhesives & Bonding Expo";
        case "a1x4V00000117tf":
            return "Foam Expo Europe";
        case "a1x4V00000117tk":
            return "Adhesives & Bonding Expo Europe";
        case "a1x4V00000118Gz":
            return "Ceramics Expo";
        case "a1x4V000000xD1y":
            return "Space Tech Expo";
        case "a1x4V000000xD23":
            return "Space Tech Expo Europe";
        case "a1x4V000001j7Oz":
            return "Thermal Management Expo";
        default:
            return "ID not found";
    }
};
const getAcronymFromId = id => {
    id = id.replaceAll("'", "");
    switch (id) {
        case "a1x4V00000117tV":
            return "FMX";
        case "a1x4V00000117ta":
            return "ABX";
        case "a1x4V00000117tf":
            return "FME";
        case "a1x4V00000117tk":
            return "ABE";
        case "a1x4V00000118Gz":
            return "CEX";
        case "a1x4V000000xD1y":
            return "SPC";
        case "a1x4V000000xD23":
            return "BRE";
        case "a1x4V000001j7Oz":
            return "TME";
        default:
            return "ID not found";
    }
};
export { getShowNameFromAcronym, getShowNameFromId, getAcronymFromId, getSiteFromAcronym, getSiteFromId };
