import React from "react";

const MainNav = ({ desktop, children }) => {
	const style = desktop ? {} : {position: "relative"};
	return <div style={style} className={`confman__main-nav main-nav--${desktop ? "desktop" : "mobile"}`}>{children}</div>;
};
export default MainNav;
