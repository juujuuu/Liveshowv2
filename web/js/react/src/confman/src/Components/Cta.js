import React from "react";

class Cta extends React.Component {
	constructor(props) {
		super(props);
	}
	static defaultProps = {
		link: false,
		clickhandler: false,
		children: "CTA",
		size: "reg",
		curved: true,
		color: "primary",
		active: true,
	};
	handleClick = () => {
		if (this.props.clickHandler != false) {
			this.props.clickHandler();
		}
		return;
	};
	render() {
		return (
			<button
				className={`conference-agenda__cta cta--${this.props.size} cta--${this.props.curved ? "curved" : "hard"} cta--${this.props.color}`}
				clickHandler={this.handleClick}>
				<a href={this.props.link != false ? this.props.link : ""} title={this.props.children}>
					{this.props.children}
				</a>
			</button>
		);
	}
}
export default Cta;
