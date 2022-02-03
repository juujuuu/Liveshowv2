import React from "react";
import { Link } from "react-router-dom";
import { getProductPath } from "../../Utils/GetPath";

function ProfileProduct({ asset, functionsBundle, mode = "product", inputState, options }) {
	const { Id, Thumbnail_Link__c, Title__c, Intro__c } = asset;
	const { switchMode } = functionsBundle;
	return (
		<div className={`profile-${mode} row`} key={`${mode}--${Id}`}>
			<div className={`profile-${mode}__thumb col-md-3`}>
				<img className="img-fluid" src={Thumbnail_Link__c} alt="Thumbnail" />
			</div>
			<div className={`profile-${mode}__text col-md-9`}>
				<h5>
					<Link
						className="router-link"
						to={getProductPath( options.debug, options.local, [inputState.exhibitor.id, Id])}
						onClick={() => switchMode("PRODUCT", [exhibId, Id])}>
						{Title__c}
					</Link>
				</h5>
				<p>
					{Intro__c}
					{"  "}
					<Link
						className=""
						to={getProductPath( options.debug, options.local, [inputState.exhibitor.id, Id])}
						onClick={() => switchMode("PRODUCT", [exhibId, Id])}>
						Read more...
					</Link>
				</p>
			</div>
		</div>
	);
}

export default ProfileProduct;
