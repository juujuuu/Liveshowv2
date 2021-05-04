import React from "react";

class MainNavButton extends React.Component {
	constructor(props) {
		super(props);
	}
	static defaultProps = {
		children: "XXX",
		active: false,
		handler: false,
		value: -1,
		active: false
	};
	handleClick = (event)=>{
		if(this.props.handler != false){
			this.props.handler(this.props.value);
		}
	}
	render() {
		return (
			<div className={`main-nav__nav-button day-${this.props.value} ${this.props.active ? "active" : ""}`} onClick={this.handleClick}>
				<h3>{this.props.children}</h3>
			</div>
		);
	}
}
export default MainNavButton;
