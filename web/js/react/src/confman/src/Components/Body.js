import React from "react";

class Body extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <section className="confman__body">{this.props.children}</section>;
	}
}

export default Body;
