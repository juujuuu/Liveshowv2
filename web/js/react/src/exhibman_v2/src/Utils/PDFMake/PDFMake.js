//import "./pdfmake_src";
import Base64Images from "./Base64Store";

/**
 * Super bastardised code for making exhibitor pdfs.
 * If somethings broken with the odfs, 99% chance it's something in a switch case around here.
 */
class PDFMake {
    constructor(options, data) {
        this.data = data;
        this.options = options;
        //this.options.show = "CEX"; //debug
        console.log(this.data);
        console.log(this.options);
        this.printPDF();
    }
    printPDF = () => {
        let docDefinition = {};
        let content = [];
        let body = [];
        body.push([
            {
                text: "COMPANY",
                style: "tableheader",
            },
            {
                text: "BOOTH",
                style: "tableheader",
            },
            {
                text: "PRODUCTS / SERVICES",
                style: "tableheader",
            },
            {
                text: "SHOW",
                style: "tableheader",
            },
        ]);
        this.data.forEach(element => {
            //TODO may need to debug - make show name dependant on booth expo
            switch (this.options.show) {
                case "FMX":
                    var showName = "Foam Expo";
                    break;
                case "FME":
                    var showName = "Foam Expo Europe";
                    break;
                case "ABE":
                    var showName = "Adhesives Bonding Expo Europe";
                    break;
                case "ABX":
                    var showName = "Adhesives Bonding Expo";
                    break;
                case "CEX":
                    var showName = "Ceramics Expo";
                    break;
                case "TME":
                    var showName = "Thermal Management Expo";
                    break;
                case "SPC":
                    var showName = "Space Tech Expo";
                    break;
                case "BRE":
                    var showName = "Space Tech Expo Europe";
                    break;
                case "SAT":
                    var showName = "Satellite Connectivity Expo";
                    break;
            }
            let title = element.pagetitle;
            let booth = element["exhibitor-booth"];
            let cat = element["exhibitor-cat"].toString();
            body.push([
                {
                    text: title,
                    style: "exhib",
                },
                {
                    text: "Booth: " + booth,
                    style: "row",
                },
                {
                    text: cat,
                    style: "row",
                },
                {
                    text: showName,
                    style: "row",
                },
            ]);
        });

        if (body != []) {
            switch (this.options.show) {
                case "FMX":
                    var pdfColour = "#4E8891";
                    break;
                case "FME":
                    var pdfColour = "#ed6839";
                    break;
                case "ABE":
                    var pdfColour = "#ed6839";
                    break;
                case "ABX":
                    var pdfColour = "#4E8891";
                    break;
                case "CEX":
                    var pdfColour = "#2c3364";
                    break;
                case "TME":
                    var pdfColour = "#2c3364";
                    break;
                case "SPC":
                    var pdfColour = "#0C3353";
                    break;
                case "BRE":
                    var pdfColour = "#0c3353";
                    break;
                case "SAT":
                    var pdfColour = "#0c3353";
                    break;
            }
            var styles = {
                header: {
                    margin: [0, 0, 0, 20],
                },
                exhib: {
                    bold: true,
                    fontSize: 8,
                },
                row: {
                    bold: true,
                    fontSize: 8,
                },
                tableheader: {
                    color: pdfColour,
                },
            };

            let image = {
                image: "",
                width: 500,
                style: "header",
            };

            //IMAGE.IMAGE ==...
            image.image = new Base64Images(this.options.show).getImage();
            console.log(image.image);
            content.push(image);
            let table = {};
            table.table = {
                body: body,
                widths: [160, 70, 140, "*"],
            };
            table.layout = "lightHorizontalLines";
            content.push(table);
            docDefinition.content = content;
            docDefinition.styles = styles;

            docDefinition.defaultStyle = {
                bold: false,
            };
            let pdfTitle = "Exhibitor List.pdf";
            pdfMake.createPdf(docDefinition).download(pdfTitle);
        }
    };
}

export default PDFMake;
