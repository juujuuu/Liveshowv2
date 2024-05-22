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
        case "fmc":
            return "chinaExhibitorList";
        case "TEE":
            return "Thermal Management Expo Europe";
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
        case "fmc":
            return "https://www.foam-expo-china.com/";
        case "tee":
            return "https://www.thermalmanagementexpo-europe.com/";
        default:
            return "Acronym not found";
    }
};
const getSiteFromId = expo => {
    expo = expo.replaceAll("'", "");
   // console.log("get site: ", expo);
    switch (expo) {
        case "a1x4V000001mqRx":
            return "https://www.foam-expo.com/";
        case "a1x4V000001mqS2":
            return "https://www.adhesivesandbondingexpo.com/";
        case "a1x4V000001mqSH":
            return "https://www.foam-expo-europe.com/";
        case "a1x4V000001mqSM":
            return "https://www.adhesivesandbondingexpo-europe.com/";
        case "a1x4V000001mqRm":
            return "https://www.ceramicsexpousa.com/";
        case "a1xUK000000Y2aT":
            return "https://www.spacetechexpo.com/";
        case "a1x4V000001mqS7":
            return "https://www.spacetechexpo-europe.com/";
        case "a1x4V000001mqRh":
            return "https://www.thermalmanagementexpo.com/";
        case "chinaExhibitorList":
            return "https://www.foam-expo-china.com/";
            case "a1x4V000001mqSR":
            return "https://www.thermalmanagementexpo-europe.com/";
        default:
            return "ID not found";
    }
};
const getShowNameFromId = id => {
    id = id.replaceAll("'", "");
    switch (id) {
        case "a1x4V000001mqRx":
            return "Foam Expo North America";
        case "a1x4V000001mqS2":
            return "Adhesives & Bonding Expo";
        case "a1x4V000001mqSH":
            return "Foam Expo Europe";
        case "a1x4V000001mqSM":
            return "Adhesives & Bonding Expo Europe";
        case "a1x4V000001mqRm":
            return "Ceramics Expo";
        case "a1xUK000000Y2aT":
            return "Space Tech Expo";
        case "a1x4V000001mqS7":
            return "Space Tech Expo Europe";
        case "a1x4V000001mqRh":
            return "Thermal Management Expo";
        case "chinaExhibitorList":
            return "Foam Expo China";
        case "a1x4V000001mqSR":
            return "Thermal Management Expo Europe";
        default:
            return "ID not found";
    }
};
const getAcronymFromId = id => {
    ///hereeeee
    id = id.replaceAll("'", "");
    switch (id) {
        case "a1x4V000001mqRx":
            return "FMX";
        case "a1x4V000001mqS2":
            return "ABX";
        case "a1x4V000001mqSH":
            return "FME";
        case "a1x4V000001mqSM":
            return "ABE";
        case "a1x4V000001mqRm":
            return "CEX";
        case "a1xUK000000Y2aT":
            return "SPC";
        case "a1x4V000001mqS7":
            return "BRE";
        case "a1x4V000001mqRh":
            return "TME";
        case "chinaExhibitorList":
            return "FMC";
        case "a1x4V000001mqSR":
            return "TEE";
            
        default:
            return "ID not found";
    }
};
export { getShowNameFromAcronym, getShowNameFromId, getAcronymFromId, getSiteFromAcronym, getSiteFromId };
