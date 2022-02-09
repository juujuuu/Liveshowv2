import fireModal from "../../../common_utils/Bootsrap5Modal";
import { getExhibListPath } from "../Utils/GetPath";
import sanitizeUrl from "../Utils/SanitizeUrl";

import { setMode, fetchExhibs } from "../Actions";

import StickyNav from "../../../common_components/StickyNav";
import { Link } from "react-router-dom";

const MetaCol = ({	
	order = "order-1 order-md-2",
}) => {
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
	const getLinkedIn = Linkedin__c => {
		if (Linkedin__c) {
			return (
				<p>
					<strong>
						<a href={Linkedin__c} target="_blank" rel="noreferrer">
							<i className="bi bi-linkedin"></i> Linkedin
						</a>
					</strong>
				</p>
			);
		} else {
			return null;
		}
	};
	const getFacebook = Facebook__c => {
		if (Facebook__c) {
			<p>
				<strong>
					<a href={Facebook__c} target="_blank" rel="noreferrer">
						<i className="bi bi-facebook"></i> Facebook
					</a>
				</strong>
			</p>;
		} else {
			return null;
		}
	};
	const getTwitter = Twitter__c => {
		if (Twitter__c) {
			return (
				<p>
					<strong>
						<a href={Twitter__c} target="_blank" rel="noreferrer">
							<i className="bi bi-twitter"></i> Twitter
						</a>
					</strong>
				</p>
			);
		} else {
			return null;
		}
	};
	const getYoutube = Youtube_channel__c => {
		if (Youtube_channel__c) {
			return (
				<p>
					<strong>
						<a
							href={Youtube_channel__c}
							target="_blank"
							rel="noreferrer">
							<i className="bi bi-youtube"></i>Youtube
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

    const handleModeSwitch = () =>{
        props.setMode("LIST");
        if(exhibs.length < 1){
            const siteURL = getSiteFromId(ids instanceof Array ? ids[0] : ids);
            let expos = sanitizeIds(ids);
			props.fetchExhibs(siteURL, expos);            
        }
    }
	return (
		<nav className={`col-12 col-md-3 ${order} meta-info-col`}>
			<StickyNav endAffix={1800} disable={window.innerWidth < 992}>
				{window.innerWidth < 992 ? (
					<Link
						className="router-link"
						to={getExhibListPath(options.debug, options.local)}
						onClick={() => handleModeSwitch()}>
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
							{getLinkedIn(Linkedin__c)}
							{getFacebook(Facebook__c)}
							{getTwitter(Twitter__c)}
							{getYoutube(Youtube_channel__c)}{" "}
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
        exhibs: store.exhibs
	};
};
export default connect(mapStateToProps, {
	setMode,
    fetchExhibs
})(MetaCol);
