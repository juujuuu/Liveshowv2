import React from "react";

class StickyNav extends React.Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
		this.state = { offsetTop: 0, offsetBottom: 0, offsetWidth: false };
	}
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
		if (this.state.offsetTop < 0 && this.state.offsetTop + document.body.clientHeight > 2000) {
			return "affix";
		} else {
			return "fixed-top";
		}
	};
	render() {
		return (
			<div className="sticky-container" ref={this.ref}>
				<div
					className={`conference-agenda__secondary-nav secondary-nav--${this.getAffix()}`}
					style={this.state.offsetWidth != false ? { width: this.state.offsetWidth } : {}}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default StickyNav;
