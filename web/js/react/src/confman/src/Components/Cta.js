import React from "react";

class Cta extends React.Component {
	constructor(props) {
		super(props);
	}
	static defaultProps = {
		link: false,
		handler: false,
		children: "CTA",
		/* max, reg , micro*/
		size: "reg",
		curved: true,
		/*primary == override
		ocs-blue==OCS
		sat-blue==SAT
		sat-dark-blue==SAT Dark Blue
		fmc==FMC
		cex-gold==CEX Gold
		cex-purple==CEX Purple
		cex-secondary==CEX White
		cex-red==CEX Red
		black==black*/
		color: "cex-red",
		active: true,
		value: false,
		role: false,
		margin: "vertical-margin--10",
	};
	handleClick = () => {
		if (this.props.handler != false) {
			if (this.props.role == false) {
				this.props.handler();
			} else if (this.props.role == "expand") {
				this.props.handler(this.props.value);
			} else if (this.props.role == "collapse") {
				this.props.handler(this.props.value);
			} else if (this.props.role == "pop-form") {
				//handle by site jquery
			}
		}
		return;
	};
	render() {
		if (this.props.role != "pop-form") {
			return (
				<button
					className={`confman__cta curved-cta curved-cta--${this.props.size} ${!this.props.curved ? "curved-cta--hard" : ""} curved-cta--${
						this.props.color
					} ${this.props.active ? "active" : ""} ${this.props.margin}`}
					onClick={this.handleClick}>
					{this.props.link != false ? (
						<a className="cta__link" href={this.props.link} title={this.props.children}>
							{this.props.children}
						</a>
					) : (
						<a className="cta__link" title={this.props.children}>
							{this.props.children}
						</a>
					)}
				</button>
			);
		} else {
			/* modal pop up form */
			return (
				<button
					className={`confman__cta curved-cta confman__cta--reg-pop curved-cta--${this.props.size} ${
						!this.props.curved ? "curved-cta--hard" : ""
					} curved-cta--${this.props.color} ${this.props.active ? "active" : ""} ${this.props.margin}`}>
					<a className="cta__link" href={this.props.link} title={this.props.children}>
						{this.props.children}
					</a>
				</button>
			);
		}
	}
}
export default Cta;
