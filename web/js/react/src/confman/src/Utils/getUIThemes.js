import React from "react";

const getUIThemes = (show, day, extraMode) => {
    let theme = [];
    switch (show) {
        case "FMX":
            if (extraMode === "innovation-agenda") {
                return null;
            } else {
                switch (day) {
                    case 1:
                        theme.push("Plenary Mega Trends / Supply Chain Strategy");
                        theme.push("Mega Trends");
                        break;
                    case 2:
                        theme.push("Application Development");
                        theme.push("Regulations and Sustainability");
                        break;
                    case 3:
                        theme.push("Material Selection and Interaction");
                        theme.push("Process Optimization");
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
        case "ABX":
            if (extraMode === "innovation-agenda") {
                return null;
            } else {
                switch (day) {
                    case 1:
                        theme.push("Plenary Mega Trends / Supply Chain Strategy");
                        theme.push("Mega Trends");
                        break;
                    case 2:
                        theme.push("Application Development");
                        theme.push("Regulations and Sustainability");
                        break;
                    case 3:
                        theme.push("Material Selection and Interaction");
                        theme.push("Process Optimization");
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
    }
};
export default getUIThemes;
