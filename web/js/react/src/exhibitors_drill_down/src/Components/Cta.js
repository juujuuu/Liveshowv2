import React from "react";
import ContactModal from "./ContactModal";

class Cta extends React.Component {
	constructor(props) {
		super(props);
	}

	handleClick = (event) => {
		if (this.props.clickHandler === null || this.props.clickHandler === undefined) {
			return;
		}
		this.props.clickHandler();
	};

	render() {
		let type = this.props.type !== null ? `exhibitor-drilldown__cta--${this.props.type}` : ``;
		let classes = `exhibitor-drilldown__cta exhibitor-drilldown__cta--${this.props.size} ${type}`;
		return (
			<button className={classes} onClick={this.handleClick}>
				{this.props.text}
			</button>
		);
	}
}

export default Cta;
