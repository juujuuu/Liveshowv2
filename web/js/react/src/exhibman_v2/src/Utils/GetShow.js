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
        case "ABM":
            return "Adhesives & Bondingexpo Expo Mexico"; 
          
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
        case "abm":
            return "https://www.adhesivesandbondingexpo-mexico.com/";
        default:
            return "Acronym not found";
    }
};
const getSiteFromId = expo => {
    expo = expo.replaceAll("'", "");
   // console.log("get site: ", expo);
    switch (expo) {
        case "a1xUK000001V7Kn":
            return "https://www.foam-expo.com/";
        case "a1xUK000001TqsH":
            return "https://www.adhesivesandbondingexpo.com/";
        case "a1xUK000001magX":
            return "https://www.foam-expo-europe.com/";
        case "a1xUK000001Tqtt":
            return "https://www.adhesivesandbondingexpo-europe.com/";
        case "a1x4V0000026O9B":
        case "a1xUK00000254mb":
        case "a1xUK000001TQpl":
            return "https://www.ceramicsexpousa.com/";
        case "a1xUK000001UDGz":
        case "a1xUK000002GrOz":
            return "https://www.spacetechexpo.com/";
        case "a1xUK000001hXEf":
            return "https://www.spacetechexpo-europe.com/";
        case "a1xUK000000RaaT":
        case "a1xUK00000254oD":
        case "a1xUK000001TQo9":
            return "https://www.thermalmanagementexpo.com/";
        case "chinaExhibitorList":
            return "https://www.foam-expo-china.com/";
        case "a1xUK000001mabi":
            return "https://www.thermalmanagementexpo-europe.com/";
        case "a1xUK000000qisz":
            return "https://www.adhesivesandbondingexpo-mexico.com/";
        default:
            return "ID not found";
    }
};
const getShowNameFromId = id => {
    id = id.replaceAll("'", "");
    switch (id) {
        case "a1xUK000001V7Kn":
            // return "Foam Expo North America";
           return "Foam Expo";
        case "a1xUK000001TqsH":
            return "Adhesives & Bonding Expo";
        case "a1xUK000001magX":
            return "Foam Expo Europe";
        case "a1xUK000001Tqtt":
            return "Adhesives & Bonding Expo Europe";
        case "a1x4V0000026O9B":
        case "a1xUK00000254mb":
        case "a1xUK000001TQpl":
            return "Ceramics Expo";
        case "a1xUK000001UDGz":
        case "a1xUK000002GrOz":
            return "Space Tech Expo";
        case "a1xUK000001hXEf":
            return "Space Tech Expo Europe";
        case "a1xUK000000RaaT":
        case "a1xUK00000254oD":
        case "a1xUK000001TQo9":
            return "Thermal Management Expo";
        case "chinaExhibitorList":
            return "Foam Expo China";
        case "a1xUK000001mabi":
            return "Thermal Management Expo Europe";
            case "a1xUK000000qisz":
            return "https://www.adhesivesandbondingexpo-mexico.com/";
        default:
            return "ID not found";
    }
};
const getAcronymFromId = id => {
    ///hereeeee
    id = id.replaceAll("'", "");
    switch (id) {
        case "a1xUK000001V7Kn":
            return "FMX";
        case "a1xUK000001TqsH":
            return "ABX";
        case "a1xUK000001magX":
            return "FME";
        case "a1xUK000001Tqtt":
            return "ABE";
        case "a1x4V0000026O9B":
        case "a1xUK00000254mb":
            case "a1xUK000001TQpl":
            return "CEX";
        case "a1xUK000001UDGz":
        case "a1xUK000002GrOz":
            return "SPC";
        case "a1xUK000001hXEf":
            return "BRE";
        case "a1xUK000000RaaT":
         case  "a1xUK00000254oD":
            return "TME";
        case "chinaExhibitorList":
            return "FMC";
        case "a1xUK000001mabi":
            return "TEE";
             case "a1xUK000000qisz":
            return "ABM";
            
        default:
            return "ID not found";
    }
};
export { getShowNameFromAcronym, getShowNameFromId, getAcronymFromId, getSiteFromAcronym, getSiteFromId };
