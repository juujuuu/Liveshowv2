import React from "react";
import { Link } from "react-router-dom";

import Spinner from "../../../common_components/Spinner";
import Cta from "../../../common_components/Cta";

import fireModal from "../../../common_utils/Bootsrap5Modal";
import { getProfilePath } from "../Utils/GetPath";

function Product({ inputState, options, functionsBundle }) {
	const { exhibitor, articleId, loading } = inputState;
	const { switchMode, getMetaCol } = functionsBundle;
	if (loading) {
		return <Spinner></Spinner>;
	}
	const { pagetitle, id } = exhibitor;
	const { show, contactcampaign, debug } = options;
	const product = exhibitor.Exhibitor_Assets__r.find((asset) => articleId === asset.Id);
	const { Body__c, Intro__c, Link__c, Title__c, Asset_Type__c } = product;
	return (
		<section className={`exhibmanV2 exhibmanV2--${show} exhibman-product row`}>
			<div className="col-12 col-md-9 order-1 meta-info-col">
				<div className="product-header">
					<h2>
						<Link className="router-link" to={getProfilePath(id, debug)} onClick={() => switchMode("PROFILE", id)}>
							{pagetitle}
						</Link>
					</h2>
					<h1>{Title__c}</h1>
				</div>
				<div className="product-body">
					<div className="product-body__image">
						<img className="img-fluid" src={Link__c} alt="Product Image" />
					</div>
					<div className="product-body__text" dangerouslySetInnerHTML={{ __html: Body__c }}></div>
					{Asset_Type__c === "Product" ? (
						<div className="product-enquire">
							<Cta
								size={window.innerWidth > 992 ? "reg" : "max"}
								color="cex-red"
								handler={() => fireModal([exhibitor, contactcampaign], "contact-exhibitor", "lg")}
								bonusClass={window.innerWidth > 992 ? "left" : "center"}>
								Enquire About Product
							</Cta>
						</div>
					) : null}
				</div>
			</div>
			{getMetaCol(exhibitor, options, "order-2")}
		</section>
	);
}
export default Product;
