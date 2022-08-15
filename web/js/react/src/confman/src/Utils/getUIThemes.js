import React from "react";

/**
 *
 * @param {String} show - Show acronym.
 * @param {Number} day - Current day.
 * @param {String} extraMode - stuff like the innovation agenda.
 * @returns Theme for that day to show.
 */
const getUIThemes = (show, day, track = [], extraMode) => {
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
        case "BRE":
            switch (day) {
                case 1:
                    theme = [
                        "Securing and Strengthening European Space Prosperity",
                        "Getting to LEO, and Beyond",
                        "Making Maritime and Aviation Connectivity More Accessible",
                    ];
                    break;
                case 2:
                    theme = [
                        "Exploring Developments of the Final Frontier",
                        "Earth Observation: Shaping the New Paradigm for Space and Earth",
                        "Combining Terrestrial and Non-Terrestrial Network Capabilities to Advance Mobility Connectivity",
                    ];
                    break;
                case 3:
                    theme = [
                        "Developing a Circular Economy in Space",
                        "Bolstering Smallsat Manufacturing Capabilities",
                        "Securing Data Assets for Future Mobility",
                    ];
                    break;
            }
            return (
                <div>
                    {!track.includes(1) ? (
                        <p style={{ fontSize: "16px" }}>
                            <strong>
                                <span style={{ color: "#146259" }}>Industry Conference: </span> - {theme[0]}
                            </strong>
                        </p>
                    ) : null}
                    {!track.includes(2) ? (
                        <p style={{ fontSize: "16px" }}>
                            <strong>
                                <span style={{ color: "#41b9eb" }}>Smallsats Conference: </span> - {theme[1]}
                            </strong>
                        </p>
                    ) : null}
                    {!track.includes(3) ? (
                        <p style={{ fontSize: "16px" }}>
                            <strong>
                                <span style={{ color: "#426ab3" }}>Mobility Connectivity Conference: </span> - {theme[2]}
                            </strong>
                        </p>
                    ) : null}
                </div>
            );
    }
};
export default getUIThemes;
