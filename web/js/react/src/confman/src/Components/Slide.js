import React from "react";

class Slide extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="accordion-item">
				<h2 className="accordion-header" id={`flush-heading${this.props.test}`}>
					<button
						className="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target={`#flush-collapse${this.props.test}`}
						aria-expanded="false"
						aria-controls={`flush-collapse${this.props.test}`}>
						Accordion Item #{this.props.test}
					</button>
				</h2>
				<div
					id={`flush-collapse${this.props.test}`}
					className="accordion-collapse collapse"
					aria-labelledby={`flush-heading${this.props.test}`}
					data-bs-parent="#conference-agenda__sessions">
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
