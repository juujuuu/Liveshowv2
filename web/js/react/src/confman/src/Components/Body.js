import React from "react";
import react from "react";

class Body extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <section className="conference-agenda__body">{this.props.children}</section>;
	}
}

export default Body;
