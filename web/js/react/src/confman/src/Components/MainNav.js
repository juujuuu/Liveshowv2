import React from "react";

class MainNav extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <div className={`conference-agenda__main-nav main-nav--${this.props.desktop ? "desktop" : "mobile"}`}>{this.props.children}</div>;
	}
}
export default MainNav;
