import React, { Component } from "react";
import Cta from "../../../common_components/Cta";

class Slide extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	getCats = (cats) => {
		let string = "";
		cats.forEach((cat) => {
			string = string + `${cat} | `;
		});
		string = string.substring(0, string.length - 2);
		return string;
	};

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
		const booth = this.props.payload["exhibitor-booth"];
		const featured = this.props.payload["exhibitor-featured"];

		let cats;
		if (this.props.payload["exhibitor-cat"].length > 0) {
			cats = this.getCats(this.props.payload["exhibitor-cat"].split("||"));
		} else {
			cats = false;
		}

		return (
			<div className={`exhibitor-slide exhibitor-slide--${Exhibitor_listing_type__c} row`} id={id}>
				{Exhibitor_listing_type__c != "Standard" ? (
					<Cta
						color="black"
						size="reg"
						margin="vertical-margin--0"
						link="##"
						curved={false}
						bonusClass="exhibitor-slide__profile-button"
						exhibAssets={true}
						role="exhib-assets"
						payload={this.props.payload}>
						{Exhibitor_listing_type__c == "Standard" ? "View Profile" : "Enhanced Listing"}
					</Cta>
				) : null}

				<div className="col-6 col-md-3 exhibitor-slide__logo">
					<a href="">
						<img className="img-fluid" src={web_logo !== "" ? smallLogo : bigLogo} alt={pagetitle} />
					</a>
				</div>
				<div className="col-6 col-md-5 exhibitor-slide__body">
					<div>
						<h4 className="exhibitor-name">
							<a href="">{pagetitle}</a>
						</h4>
						<p className="exhibitor-booth">Booth Number: {booth}</p>
						{window.innerWidth < 768 ? <>{cats != false ? <div className="exhibitor-slide__cats"><p>{cats}</p></div> : null}</> : null}
					</div>
				</div>
				{window.innerWidth > 768 ? (
					<div className="col-md-4 exhibitor-slide__cats">
						<p>{cats != false ? cats : null}</p>
					</div>
				) : null}
			</div>
		);
	}
}
export default Slide;
