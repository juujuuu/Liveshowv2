import React from "react";

/**
 * Another containery component.  Probably could be refactored out.
 * @param {object} props
 * @returns
 */
const MainNav = ({ desktop, children }) => {
    const style = desktop ? {} : { position: "relative" }; //Relative on mobile.

    return (
        <div style={style} className={`confman__main-nav main-nav--${desktop ? "desktop" : "mobile"}`}>
            {children}
        </div>
    );
};
export default MainNav;
