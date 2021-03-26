import React from "react";

class Cta extends React.Component {
	constructor(props) {
		super(props);
	}
	static defaultProps = {
		clickHandler: () => {
			return;
		},
		size: "reg",
		text: "",
	};
	handleClick = () => {
		console.log("click");
		if (typeof this.props.clickHandler === undefined) {
			return;
		}
		this.props.clickHandler();
	};
	render() {
		let type = this.props.type !== null ? `enhanced-exhibitors__cta--${this.props.type}` : ``;
		let classes = `enhanced-exhibitors__cta enhanced-exhibitors__cta--${this.props.size} ${type}`;
		return (
			<button className={classes} onClick={this.handleClick}>
				{this.props.text}
				{this.props.children}
			</button>
		);
	}
}

export default Cta;
