import React from "react";

class Body extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <section className="react__body">{this.props.children}</section>;
	}
}

export default Body;
