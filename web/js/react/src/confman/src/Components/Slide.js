import React from "react";

class Slide extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
	}

	handleClick = (event) => {
		this.setState((prevState) => {
			prevState.show = !prevState.show;
			return prevState;
		});
	};

	render() {
		return (
			<div className="accordion-item">
				<h2 className="accordion-header">
					<button className={`accordion-button ${!this.state.show ? "collapsed" : ""}`} type="button">
						Accordion Item #{this.props.test}
					</button>
				</h2>
				<div className={`accordion-collapse collapse ${this.state.show ? "show" : ""}`}>
					<div className="accordion-body">
						Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the
						first item's accordion body.
					</div>
				</div>
			</div>
		);
	}
}

export default Slide;
