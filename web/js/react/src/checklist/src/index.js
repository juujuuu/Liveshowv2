import React from "react";
import { createRoot } from "react-dom/client";

import App from "./Components/App";

var options = {
    booth: document.querySelector("#checklist-root").getAttribute("data-booth"),
    expo: document.querySelector("#checklist-root").getAttribute("data-expo"),
    context: document.querySelector("#checklist-root").getAttribute("data-context"),
};

const root = createRoot(document.querySelector("#checklist-root"));
root.render(<App initOptions={options} />);
