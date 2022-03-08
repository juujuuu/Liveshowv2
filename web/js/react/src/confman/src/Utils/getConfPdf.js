const getConfPdfLink = show => {
    const baseString =
        "./assets/resources/shared/pdfs/conference/Conference Agenda ";
    /* || in switch case gets compiled out???? */
    switch (show) {       
        case "FMX":
            return baseString + "FMX ABX" + ".pdf";
        case "ABX":
            return baseString + "FMX ABX" + ".pdf";
        case "FME":
            return baseString + "FME ABE" + ".pdf";
        case "ABE":
            return baseString + "FME ABE" + ".pdf";
        case "OCS":
            return baseString + "OCS SAT" + ".pdf";
        case "SAT":
            return baseString + "OCS SAT" + ".pdf";
        default:
            return baseString + show + ".pdf";
    }
};

export default getConfPdfLink;