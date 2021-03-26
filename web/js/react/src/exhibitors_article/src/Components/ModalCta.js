import React from "react";
import ContactModal from "./ContactModal";

class ModalCta extends React.Component {
	constructor(props) {
		super(props);
		this.state = { show: false };
	}

	handleClick = (event) => {
		if (!this.state.show) {
			event.stopPropagation();
			this.setState((prevState) => {
				prevState.show = true;
				return prevState;
			});
			return;
		} else {
			this.props.clickHandler();
		}
	};
	setShow = (show) => {
		this.setState((prevState) => {
			prevState.show = show;
			return prevState;
		});
	};

	render() {
		let type = this.props.type !== null ? `exhibitor-article__cta--${this.props.type}` : ``;
		let classes = `exhibitor-article__cta exhibitor-article__cta--${this.props.size} ${type}`;
		return (
			<button className={classes} onClick={this.handleClick}>
				<ContactModal booth_data={this.props.booth_data} options={this.props.options} show={this.state.show} setShow={this.setShow} />
				{this.props.text}
			</button>
		);
	}
}

export default ModalCta;
