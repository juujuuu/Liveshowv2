import React from "react";

class MainNavButton extends React.Component {
	constructor(props) {
		super(props);
	}
	static defaultProps = {
		children: "XXX",
	};    
	render() {
		return <div className="main-nav__nav-button">{this.props.children}</div>;
	}
}
export default MainNavButton;
