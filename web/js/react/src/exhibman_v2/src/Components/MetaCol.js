import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import fireModal from "../../../common_utils/Bootsrap5Modal";
import { getExhibListPath } from "../Utils/GetPath";
import sanitizeUrl from "../Utils/SanitizeUrl";
import sanitizeIds from "../Utils/SanitizeIds";
import { pushPageView } from "../Utils/pushPageView";

import Cta from "../../../common_components/Cta";

import { setMode, fetchExhibs, setLoading } from "../Actions";

import StickyNav from "../../../common_components/StickyNav";
import { getSiteFromId } from "../Utils/GetShow";

const MetaCol = props => {
	const { exhibitor, options, setLoading, setMode, fetchExhibs } = props;
	let { order } = props;
	order = !order ? "order-1 order-md-2" : order;
	const { contactcampaign, ids } = options;
	const {
		Expo__c,
		url,
		Twitter__c,
		Facebook__c,
		Linkedin__c,
		Company_City__c,
		Company_State__c,
		Company_Address__c,
		Youtube_channel__c,
		Exhibitor_listing_type__c,
		country,
	} = exhibitor;
	const boothnum = exhibitor["exhibitor-booth"];
	const enhanced = Exhibitor_listing_type__c != "Standard";

	const getUrl = url => {
		if (url) {
			return (
				<p>
					<strong>
						<a
							href={sanitizeUrl(url)}
							target="_blank"
							rel="noreferrer">
							<i className="bi bi-link-45deg"></i> Website
						</a>
					</strong>
				</p>
			);
		} else {
			return null;
		}
	};
	const getSocial = (field, social) => {
		let icon;
		if (field) {
			switch (social) {
				case "LINKEDIN":
					icon = "linkedin";
					break;
				case "FACEBOOK":
					icon = "facebook";
					break;
				case "TWITTER":
					icon = "twitter";
					break;
				case "YOUTUBE":
					icon = "youtube";
					break;
				default:
					return null;
			}
			return (
				<p>
					<strong>
						<a href={field} target="_blank" rel="noreferrer">
							<i className={`bi bi-${icon}`}></i>
							{" "}{icon.charAt(0).toUpperCase() + icon.slice(1)}
						</a>
					</strong>
				</p>
			);
		} else {
			return null;
		}
	};
	const getAddressField = field => {
		if (field) {
			return (
				<p>
					<strong>{field},</strong>
				</p>
			);
		} else {
			return null;
		}
	};

	const handleListSwitch = () => {
		setLoading(true);
		setMode("LIST");
		pushPageView();
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	};
	return (
		<nav className={`col-12 col-md-3 ${order} meta-info-col`}>
			<StickyNav endAffix={1800} disable={window.innerWidth < 992}>
				{window.innerWidth < 992 ? (
					<Link
						className="router-link"
						to={getExhibListPath(options.debug, options.local)}
						onClick={() => handleListSwitch()}>
						<Cta
							size="reg"
							curved={false}
							bonusClass={`profile-back-to-list left`}
							key={`Mob back to Exhibitor List`}
							color="black">
							Back to Exhibitor List
						</Cta>
					</Link>
				) : null}
				{enhanced ? (
					<div className="meta-info-col__button">
						<Cta
							size={"max"}
							color="cex-red"
							handler={() =>
								fireModal(
									[exhibitor, contactcampaign],
									"contact-exhibitor",
									"lg"
								)
							}
							bonusClass="center">
							Contact Exhibitor
						</Cta>
					</div>
				) : null}
				<div
					className="meta-info-col__booth-num"
					style={enhanced ? { marginTop: "10px" } : null}>
					<h4>Booth Number: {boothnum}</h4>
				</div>
				<div className="meta-info-col__contact-list">
					<h4>Contact</h4>
					{getUrl(url)}
					{enhanced ? (
						<>
							{getSocial(Linkedin__c, "LINKEDIN")}
							{getSocial(Facebook__c, "FACEBOOK")}
							{getSocial(Twitter__c, "TWITTER")}
							{getSocial(Youtube_channel__c, "YOUTUBE")}
						</>
					) : null}
				</div>
				{Company_Address__c ? (
					<div className="meta-info-col__address">
						<p>
							<i className="bi bi-house-door-fill"></i> Address:{" "}
						</p>
						{getAddressField(Company_Address__c)}
						{getAddressField(Company_City__c)}
						{getAddressField(Company_State__c)}
						{getAddressField(country)}
					</div>
				) : null}
			</StickyNav>
		</nav>
	);
};
const mapStateToProps = (store, ownProps) => {
	return {
		exhibitor: store.exhibitor,
		options: store.options,
		order: ownProps.order,
		exhibs: store.exhibs,
	};
};
export default connect(mapStateToProps, {
	setMode,
	fetchExhibs,
	setLoading,
})(MetaCol);
