import React from "react";

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

	render() {
		let type = this.props.type !== null ? `exhibitor-drilldown__cta--${this.props.type}` : ``;
		let classes = `exhibitor-drilldown__cta exhibitor-drilldown__cta--${this.props.size} ${type} exhib-contact-cta`;
		return (
			<button className={classes}  name={this.props.data.pagetitle} campaignid={this.props.options.contactcampaign} sfevent={this.props.options.event} boothid={this.props.boothid}>
				{this.props.text}
			</button>
		);
	}
}

export default ModalCta;
