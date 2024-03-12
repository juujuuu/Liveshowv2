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
                        theme = [...theme, "Supply Chain and Workforce / Application Comfort Optimization", "Application Safety & Security"];
                        break;
                    case 2:
                        theme = [...theme, "Sustainability / Carbon Reduction", "Recycling"];
                        break;
                    case 3:
                        theme = [...theme, "Data and Industry 4.0", "Manufacturing and Production"];
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
        case "TEE":
         
            if (extraMode === "innovation-agenda") {
                console.log(extraMode)
                return null;
            } else {
                
                switch (day) {
                    case 1:
                        theme = ["Materials & Supply Chain Collaboration", "Automotive & Aerospace"];
                        break;
                    case 2:
                        theme = ["Sustainability", "Electronics"];
                        break;
                    case 3:
                        theme = ["Product Development & Manufacturing", "Thermal Management & Adhesives"];
                        break;
                }
                return (
                    <div>
                        <p style={{ fontSize: "16px" }}>
                            <strong style={{ color: "#934694" }}>Stage 1 Theme: </strong>
                            <span>{theme[0]}</span>
                        </p>
                        {/* {day !== 3 ? ( */}
                            <p style={{ fontSize: "16px" }}>
                                <strong style={{ color: "#6fc5cb" }}>Stage 2 Theme: </strong>
                                <span>{theme[1]}</span>
                            </p>
                        {/* ) : ( */}
                            {/* <p>{""}</p>
                        )} */}
                    </div>
                );
            }
        case "BRE":
            switch (day) {
                case 1:
                    theme = [
                        "Europe’s Sovereignty in Space",
                        "Scaling up Smallsats",
                        "Secure and Autonomous SATCOM",
                        "Products and Services Presentations",
                    ];
                    break;
                case 2:
                    theme = [
                        "Space Sustainability",
                        "Space for Earth",
                        "Ground Segments and Mega Trends",
                        "Products and Services Presentations"
                    ];
                    break;
                case 3:
                    theme = [
                        "Software, Digitisation and Security",
                        "Security and Software Innovation",
                        "Security and Software Innovation",
                        "Products and Services Presentations"
                    ];
                    break;
            }
            return (
                <div>
                    {!track.includes(1) ? (
                        <p style={{ fontSize: "16px" }}>
                            <strong>
                                <span style={{ color: "#146259" }}>Industry Conference: </span>  {theme[0]}
                            </strong>
                        </p>
                    ) : null}
                    {!track.includes(2) ? (
                        <p style={{ fontSize: "16px" }}>
                            <strong>
                                <span style={{ color: "#41b9eb" }}>Smallsats Conference: </span>  {theme[1]}
                            </strong>
                        </p>
                    ) : null}
                    {!track.includes(3) ? (
                        <p style={{ fontSize: "16px" }}>
                            <strong>
                                <span style={{ color: "#426ab3" }}>Mobility Connectivity Conference: </span>  {theme[2]}
                            </strong>
                        </p>
                    ) : null}
                        {!track.includes(4) ? (
                        <p style={{ fontSize: "16px" }}>
                            <strong>
                                <span style={{ color: "#f09d00" }}>Exhibitor Technology Forum: </span>  {theme[3]}
                            </strong>
                        </p>
                    ) : null}
                </div>
            );
    }
};
export default getUIThemes;
