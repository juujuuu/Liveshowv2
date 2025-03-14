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
        case "a1xUK000000lxB7":
            return "https://www.foam-expo.com/";
        case "a1xUK000000dwqX":
            return "https://www.adhesivesandbondingexpo.com/";
        case "a1xUK000000iHI5":
            return "https://www.foam-expo-europe.com/";
        case "a1xUK000000iHJh":
            return "https://www.adhesivesandbondingexpo-europe.com/";
        case "a1x4V0000026O9B":
            return "https://www.ceramicsexpousa.com/";
        case "a1xUK000000Y2aT":
            return "https://www.spacetechexpo.com/";
        case "a1xUK0000019zen":
            return "https://www.spacetechexpo-europe.com/";
        case "a1xUK000000RaaT":
            return "https://www.thermalmanagementexpo.com/";
        case "chinaExhibitorList":
            return "https://www.foam-expo-china.com/";
            case "a1xUK000001MzNd":
            return "https://www.thermalmanagementexpo-europe.com/";
        default:
            return "ID not found";
    }
};
const getShowNameFromId = id => {
    id = id.replaceAll("'", "");
    switch (id) {
        case "a1xUK000000lxB7":
            // return "Foam Expo North America";
           return "Foam Expo";
        case "a1xUK000000dwqX":
            return "Adhesives & Bonding Expo";
        case "a1xUK000000iHI5":
            return "Foam Expo Europe";
        case "a1xUK000000iHJh":
            return "Adhesives & Bonding Expo Europe";
        case "a1x4V0000026O9B":
            return "Ceramics Expo";
        case "a1xUK000000Y2aT":
            return "Space Tech Expo";
        case "a1xUK0000019zen":
            return "Space Tech Expo Europe";
        case "a1xUK000000RaaT":
            return "Thermal Management Expo";
        case "chinaExhibitorList":
            return "Foam Expo China";
        case "a1xUK000001MzNd":
            return "Thermal Management Expo Europe";
        default:
            return "ID not found";
    }
};
const getAcronymFromId = id => {
    ///hereeeee
    id = id.replaceAll("'", "");
    switch (id) {
        case "a1xUK000000lxB7":
            return "FMX";
        case "a1xUK000000dwqX":
            return "ABX";
        case "a1xUK000000iHI5":
            return "FME";
        case "a1xUK000000iHJh":
            return "ABE";
        case "a1x4V0000026O9B":
            return "CEX";
        case "a1xUK000000Y2aT":
            return "SPC";
        case "a1xUK0000019zen":
            return "BRE";
        case "a1xUK000000RaaT":
            return "TME";
        case "chinaExhibitorList":
            return "FMC";
        case "a1xUK000001MzNd":
            return "TEE";
            
        default:
            return "ID not found";
    }
};
export { getShowNameFromAcronym, getShowNameFromId, getAcronymFromId, getSiteFromAcronym, getSiteFromId };
