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
        case "tee":
            return "https://www.thermalmanagementexpo-europe.com/";
        case "abm":
            return "https://www.adhesivesandbondingexpo-mexico.com/";
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
        case "a3iUK0000007jy5":
            return "FMX";
        case "a3i4V000001pJMf":
        case "a3i4V000001hXhE":
        case "a3iUK0000007jy5":
            return "ABX";
              case "a1xUK000000qisz":
            return "ABM";
        case "a1xUK000000qisz":
        case "What ever the sf id of the solutions innovation agenda ends up being":
            return "FME";
        case "a3i4V000001pJWy":
        case "a3i4V000000bqIX":
        case "a3i4V00000222Y6":
            
            return "CEX";
        case "a3i4V00000222YG":
        case "a3iUK00000001s9":
            return "SPC";
        case "a3i4V000001pORm":
        case "a3i4V000000bqIh":
        case "a3i4V00000222PA":
        case "a3i4V000000nXcp":
        case "a3iUK0000001a9V":
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
        case "a3i4V000000nXh9":
        case "What ever the sf id of the solutions innovation agenda ends up being":
            return "TEE";
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
        case "foam":
            return "https://oda0cs26.modx.dev/assets/resources/shared/web/apps/confman/showLogos/fme-thin.png";
        case "adhesives eu":
            return "https://oda0cs26.modx.dev/assets/resources/shared/web/apps/confman/showLogos/abe-thin.png";
        case "thermal eu":
            return "https://oda0cs26.modx.dev/assets/resources/shared/web/apps/confman/showLogos/tee-thin.png";
        case "ceramics":
            return "https://oda0cs26.modx.dev/assets/resources/shared/web/apps/confman/showLogos/cex-thin.png";
        case "spc":
            return "Space Tech Expo";
        case "bre":
            return "Space Tech Expo Europe";
        case "thermal management":
            return "https://oda0cs26.modx.dev/assets/resources/shared/web/apps/confman/showLogos/tme-thin.png";
        case "solutions innovation stage":
            return  "https://oda0cs26.modx.dev/assets/resources/shared/web/apps/confman/showLogos/sis-thin.png";
        case "ocs":
            return "Onboard  Connectivity Summit";
        case "sat":
            return "Satellite Connectivity Summit";
             case "abm":
            return "Adhesives & Bondingexpo Expo Mexico";
        
        default:
            return "Acronym not found";
    }
};

const getShowNameFromAcronymOnlyText = acronym => {
    switch (acronym.toLowerCase()) {
        case "fmx":
            return "Foam Expo North America";
        case "abx":
            return "Adhesives & Bonding Expo";
        case "fme":
            return "Foam Expo Europe";
        case "abe":
            return "Adhesives & Bonding Expo Europe";
        case "tee":
            return "Thermal Management Expo Europe";
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
            case "abm":
            return "Adhesives & Bondingexpo Expo Mexico";
        
        default:
            return "Acronym not found";
    }
};



//not used , just for testing can be deleteted
const getShowNameFromAcronymMultyExpoSlide = acronym => {
    switch (acronym.toLowerCase()) {
        case "fme":
            return "Foam";
        case "abe":
            return "Adhesives & Bonding";
        case "tee":
            return "Thermal Management";
        case "abe-fme":
            return "Adhesives & Bonding - Foam";
        case "fme-tee":
            return "Foam - Thermal Management";
        case "abe-tee":
            return "Adhesives & Bonding - Thermal Management";
        case "abe-fme-tee":
            return "Adhesives & Bonding - Foam - Thermal Management";
            // case null:
            //     return "Adhesives & Bonding - Foam - Thermal Management";
        default:
            return "";
    }
};






export { getSiteFromId, getSiteFromAcronym, getShowNameFromAcronym, getShowNameFromAcronymMultyExpoSlide, getShowNameFromAcronymOnlyText};
