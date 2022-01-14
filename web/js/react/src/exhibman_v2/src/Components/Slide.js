import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cta from "../../../common_components/Cta";
import { getProfilePath } from "../Utils/GetPath";

class Slide extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	getCats = cats => {
		let string = "";
		cats.forEach(cat => {
			string = string + `${cat} | `;
		});
		string = string.substring(0, string.length - 2);
		return string;
	};

	render() {
		const { payload, switchMode, options, inputState } = this.props;

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
		const booth = payload["exhibitor-booth"];
		const featured = payload["exhibitor-featured"];
		const enhanced = Exhibitor_listing_type__c != "Standard";

		let cats;
		if (payload["exhibitor-cat"].length > 0) {
			cats = this.getCats(payload["exhibitor-cat"].split("||"));
		} else {
			cats = false;
		}

		return (
			<div
				className={`exhibitor-slide exhibitor-slide--${Exhibitor_listing_type__c} row`}
				id={id}>
				<Link
					className="router-link router-link--profile-button"
					to={getProfilePath(id, options.debug)}
					onClick={() => switchMode("PROFILE", id, inputState)}>
					<Cta
						color="black"
						size="reg"
						margin="vertical-margin--0"
						curved={false}
						bonusClass={`exhibitor-slide__profile-button exhibitor-slide__profile-button--${Exhibitor_listing_type__c}`}
						role="exhib-assets"
						payload={payload}>
						{enhanced ? "Enhanced Listing" : "View Profile"}
					</Cta>
				</Link>

				<div className="col-6 col-md-3 exhibitor-slide__logo">
					<Link
						className="router-link"
						to={getProfilePath(id, options.debug)}
						onClick={() => switchMode("PROFILE", id, inputState)}>
						<img
							className="img-fluid"
							src={web_logo !== "" ? smallLogo : bigLogo}
							alt={pagetitle}
						/>
					</Link>
				</div>
				<div className="col-6 col-md-5 exhibitor-slide__body">
					<div>
						<h4 className="exhibitor-name">
							<Link
								className="router-link"
								to={getProfilePath(id, options.debug)}
								onClick={() =>
									switchMode("PROFILE", id, inputState)
								}>
								{pagetitle}
							</Link>
						</h4>

						<p className="exhibitor-booth">Booth Number: {booth}</p>
						{window.innerWidth < 768 ? (
							<>
								{cats != false ? (
									<div className="exhibitor-slide__cats">
										<p>{cats}</p>
									</div>
								) : null}
							</>
						) : null}
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
