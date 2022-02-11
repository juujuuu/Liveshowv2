import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
	fetchExhibs,
	fetchExhib,
	setMode,
	setLoading,
	setProduct,
} from "../../Actions";

import { getProductPath } from "../../Utils/GetPath";
import sanitizeIds from "../../Utils/SanitizeIds";
import { pushPageView } from "../../Utils/pushPageView";

function ProfileProduct(props) {
	const {
		asset,
		options,
		mode,
		exhibitor,
		setMode,
		setLoading,
		setProduct,
	} = props;
	const { Id: assetId, Thumbnail_Link__c, Title__c, Intro__c, Asset_Type__c } = asset;
	const { id: exhibId } = exhibitor;
	const { debug, local, ids } = options;

	const handleListSwitch = () => {
		setLoading(true);
		setMode("LIST");
		pushPageView();
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	};

	const handleProductSwitch = (boothId, assetId) => {
		setLoading(true);
		setProduct(assetId);
		setMode("PRODUCT");
		pushPageView();
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	};

	return (
		<div className={`profile-${Asset_Type__c.toLowerCase()} row`} key={`${Asset_Type__c.toLowerCase()}--${assetId}`}>
			<div className={`profile-${Asset_Type__c.toLowerCase()}__thumb col-md-3`}>
				<img
					className="img-fluid"
					src={Thumbnail_Link__c}
					alt="Thumbnail"
				/>
			</div>
			<div className={`profile-${Asset_Type__c.toLowerCase()}__text col-md-9`}>
				<h5>
					<Link
						className="router-link"
						to={getProductPath(debug, local, [exhibId, assetId])}
						onClick={() => handleProductSwitch(exhibId, assetId)}>
						{Title__c}
					</Link>
				</h5>
				<p>
					{Intro__c}
					{"  "}
					<Link
						className=""
						to={getProductPath(debug, local, [exhibId, assetId])}
						onClick={() => handleProductSwitch(exhibId, assetId)}>
						Read more...
					</Link>
				</p>
			</div>
		</div>
	);
}

const mapStateToProps = (store, ownProps) => {
	return { ...store };
};
export default connect(mapStateToProps, {
	fetchExhibs,
	fetchExhib,
	setMode,
	setLoading,
	setProduct,
})(ProfileProduct);
