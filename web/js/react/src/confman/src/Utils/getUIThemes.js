import React from "react";

/**
 *
 * @param {String} show - Show acronym.
 * @param {Number} day - Current day.
 * @param {String} extraMode - stuff like the innovation agenda.
 * @returns Theme for that day to show.
 */
const getUIThemes = (show, day, extraMode) => {
    let theme = [];
    switch (show) {
        case "FMX":
        case "ABX":
            if (extraMode === "innovation-agenda") {
                return null;
            } else {
                switch (day) {
                    case 1:
                        theme = [...theme, "Plenary Mega Trends / Supply Chain Strategy", "Mega Trends"];
                        break;
                    case 2:
                        theme = [...theme, "Application Development", "Regulations and Sustainability"];
                        break;
                    case 3:
                        theme = [...theme, "Material Selection and Interaction", "Process Optimization"];
                        break;
                }
                return (
                    <div>
                        <p style={{ fontSize: "16px" }}>
                            <strong>
                                <span style={{ color: "#d52c60" }}>Track 1 Theme</span> - {theme[0]}
                            </strong>
                        </p>
                        <p style={{ fontSize: "16px" }}>
                            <strong>
                                <span style={{ color: "#5bb7ce" }}>Track 2 Theme</span> - {theme[1]}
                            </strong>
                        </p>
                    </div>
                );
            }
        case "FME":
        case "ABE":
            if (extraMode === "innovation-agenda") {
                return null;
            } else {
                switch (day) {
                    case 1:
                        theme = [" Industry Megatrends and Environmental Sustainability", " Material Development and Selection"];
                        break;
                    case 2:
                        theme = [" Material Properties and Application Development", " Regulation and Additives"];
                        break;
                    case 3:
                        theme = [" Logistics and Manufacturing Efficiency", "Logistics and Manufacturing Efficacy"];
                        break;
                }
                return (
                    <div>
                        <p style={{ fontSize: "16px" }}>
                            <strong style={{ color: "#934694" }}>Main Stage Theme: </strong>
                            <span>{theme[0]}</span>
                        </p>
                        {day !== 3 ? (
                            <p style={{ fontSize: "16px" }}>
                                <strong style={{ color: "#6fc5cb" }}>360 Stage Theme: </strong>
                                <span>{theme[1]}</span>
                            </p>
                        ) : (
                            <p>{""}</p>
                        )}
                    </div>
                );
            }
    }
};
export default getUIThemes;
