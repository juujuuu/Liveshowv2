import React, { Component } from "react";

class Slide extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const {
			id,
			Expo__c,
			Assets_Downloadable_Resource_Count__c,
			Assets_News_Count__c,
			Assets_Product_Count__c,
			Assets_Video_Count__c,
			Exhibitor_listing_type__c,
			Show_On_Colocate__c,
			pagetitle,
			url,
			web_logo,
			corporateMember,
			logo,
		} = this.props.payload;
		const smallLogo = web_logo;
		const bigLogo = logo;

		return (
			<div className={`exhibitor-slide`} id={id}>
				{pagetitle}
			</div>
		);
	}
}
export default Slide;
