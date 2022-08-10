/**
 *
 * @param {String} acronym - Show acronym code
 * @returns Pw for the on demand modals
 */
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
        case "FME":
            return "FME21OD";
        case "ABE":
            return "FME21OD";
        default:
            return "DefaultCode";
    }
};

export { getOnDemandCode };
