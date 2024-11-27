/**
 *
 * @param {string} show - The show acronym
 * @param {*} conf - extra param for things like having 2 conferences in a show
 * @returns A link to the conference pdf.
 */
const getConfPdfLink = (show, conf = false) => {
    const baseString = "./assets/resources/shared/pdfs/conference/Conference Agenda ";
    /* || in switch case gets compiled out???? */
    switch (show) {
        case "FMX":
        case "ABX":
            if (conf === "'a3iUK0000007jy5'") {
                return baseString + "Solutions Innovation" + ".pdf";
            } else {
                return baseString + "FMX ABX" + ".pdf";
            }
        case "FME":
        case "ABE":
        case "TEE":
            
            if (conf === "'What ever the sf id of the solutions innovation agenda ends up being'") {
                return baseString + "Solutions Innovation" + ".pdf";
            } else {
                return baseString + "FME ABE TEE" + ".pdf";
            }
        case "OCS":
        case "SAT":
            return baseString + "OCS SAT" + ".pdf";
        default:
            return baseString + show + ".pdf";
    }
};

export default getConfPdfLink;
