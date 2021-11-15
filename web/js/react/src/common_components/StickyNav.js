import React from "react";

class StickyNav extends React.Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
		this.state = { offsetTop: 0, offsetBottom: 0, offsetWidth: false };
	}
	static defaultProps = {
		role: false,
		startAffix: 0,
		endAffix: 2000, //Distance from bottom of page
		disable: false,
	};
	handleScroll = (event) => {
		//something here
		this.setState((prevState) => {
			prevState.offsetTop = this.ref.current.getBoundingClientRect().top;
			prevState.offsetBottom = this.ref.current.getBoundingClientRect().bottom;
			prevState.offsetWidth = this.ref.current.offsetWidth;
			return prevState;
		});
	};
	componentDidMount = () => {
		window.addEventListener("scroll", this.handleScroll);
	};
	getAffix = () => {
		const { offsetTop } = this.state;
		if (offsetTop < 0 && offsetTop + document.body.clientHeight > this.props.endAffix) {
			return "affix";
		} else {
			return "fixed-top";
		}
	};
	render() {
		let jsxClass = "";
		if (this.props.role == "conference-agenda-side-nav") {
			jsxClass = "conference-agenda__secondary-nav";
		}
		return (
			<div className="sticky-container" ref={this.ref}>
				<div
					className={`react__sticky-nav ${jsxClass} ${!this.props.disable ? `nav-affix--${this.getAffix()}` : ""}`}
					style={this.state.offsetWidth != false ? { width: this.state.offsetWidth } : {}}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default StickyNav;
