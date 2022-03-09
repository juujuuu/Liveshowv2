import React from "react";

const MainNav = ({ desktop, children }) => {
	return <div className={`confman__main-nav main-nav--${desktop ? "desktop" : "mobile"}`}>{children}</div>;
};
export default MainNav;
