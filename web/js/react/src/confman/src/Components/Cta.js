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
		cex-red==CEX Red*/
		color: "cex-red",
		active: true,
		value: false,
		role: false
	};
	handleClick = () => {
		if (this.props.handler != false) {
			if(this.props.role == false){
				this.props.handler();
			} else if(this.props.role == "expand"){
				this.props.handler(true, true);
			} else if(this.props.role == "collapse"){
				this.props.handler(true, false);
			}
		}
		return;
	};
	render() {
		return (
			<button
				className={`conference-agenda__cta curved-cta curved-cta--${this.props.size} ${
					!this.props.curved ? "curved-cta--hard" : ""
				} curved-cta--${this.props.color} vertical-margin--10`}
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
	}
}
export default Cta;
