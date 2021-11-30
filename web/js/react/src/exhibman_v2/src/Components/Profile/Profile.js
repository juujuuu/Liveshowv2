import React from "react";
import { Link } from "react-router-dom";

import Spinner from "../../../../common_components/Spinner";
import Cta from "../../../../common_components/Cta";

import { getExhibListPath, getProductPath } from "../../Utils/GetPath";
import Video from "./Video";
import Downloadable from "./Downloadable";
import ProfileProduct from "./ProfileProduct";

function Profile({ inputState, options, functionsBundle }) {

	const { switchMode, getMetaCol } = functionsBundle;
	const { loading, exhibitor } = inputState;
	const { show, ids, mode, debug } = options;
	const { pagetitle, content, Company_Bio_Enhanced__c, logo, Expo__c, Exhibitor_Assets__r, id, Exhibitor_listing_type__c } = exhibitor;
	const cats = exhibitor["exhibitor-cat"];

	const getJumpList = (assets) => {
		let types = [];
		assets.forEach((asset) => {
			switch (asset.Asset_Type__c) {
				case "Product":
					types = [...types, "Featured Products"];
					break;
				case "Video":
					types = [...types, "Videos"];
					break;
				case "News":
					types = [...types, "News"];
					break;
				case "Downloadable Resource":
					types = [...types, "Resource Downloads"];
					break;
				default:
					break;
			}
		});
		return (
			<>
				{types.map((type) => {
					return (
						<div className="profile-quick-menu__type" onClick={() => zapTo(type.replace(" ", ""))}>
							<p>{type}</p>
						</div>
					);
				})}
			</>
		);
	};

	const zapTo = (target) => {
		let offset = document.getElementById(target).getBoundingClientRect().top - 150;
		window.scrollTo({
			top: offset,
			behavior: "smooth",
		});
	};

	/**
	 *
	 * @param {Array} assets Exhibitor Assets Array
	 * @param {String} type Type of assets to output
	 */
	const getAssets = (assets, type, exhibId = false, state) => {
		assets = assets.filter((asset) => asset.Asset_Type__c == type);
		return assets.map((asset) => {
			const {pagetitle} = state.exhibitor;
			switch (type) {
				case "Product":
					const { switchMode } = functionsBundle;
					return <ProfileProduct asset={asset} functionsBundle={{ switchMode }} mode={"product"} inputState={state} options={options}/>;
				case "News":
					return <ProfileProduct asset={asset} functionsBundle={{ switchMode }} mode={"news"} inputState={state} options={options} />;
				case "Video":
					return <Video asset={asset} />;
				case "Downloadable Resource":
					return <Downloadable asset={asset} pagetitle={pagetitle} />;
				default:
					break;
			}
		});
	};

	if (loading) {
		return <Spinner></Spinner>;
	} else {
		return (
			<section className={`exhibmanV2 exhibmanV2--${show} exhibman-profile exhibman-profile--${Exhibitor_listing_type__c} row`}>
				<div className="col-12 col-md-9 order-2 order-md-1 profile">
					{window.innerWidth > 992 ? (
						<Link className="router-link" to={getExhibListPath(options.debug)} onClick={() => switchMode("LIST", ids)}>
							<Cta size="reg" curved={false} bonusClass={`profile-back-to-list left`} key={`Desk Back to Exhibitor List`} color="black">
								Back to Exhibitor List
							</Cta>
						</Link>
					) : null}
					<h1 className="profile-title">{pagetitle}</h1>
					{Exhibitor_Assets__r && window.innerWidth > 992 ? (
						<nav className="profile-quick-menu row">
							<div className="profile-quick-menu__jump col-2">
								<p>
									<strong>Jump to:</strong>
								</p>
							</div>
							<div className="profile-quick-menu__list col-10">{getJumpList(Exhibitor_Assets__r)}</div>
						</nav>
					) : null}
					<div className="profile-summary">
						<div className="profile-logo">
							<img className="img-fluid" src={logo} alt="Logo" />
						</div>
						<div className="profile-bios">
							<p className="profile-bios__short-bio">
								<strong>{content}</strong>
							</p>
							{Company_Bio_Enhanced__c ? (
								<div className="profile-bios__long-bio" dangerouslySetInnerHTML={{ __html: Company_Bio_Enhanced__c }}></div>
							) : null}
							<p className="profile-bios__cats">
								<i>
									<strong>Categories: </strong>
									{cats}
								</i>
							</p>
						</div>
					</div>
					{Exhibitor_Assets__r ? (
						<>
							{Exhibitor_Assets__r.find((asset) => asset.Asset_Type__c === "Product") ? (
								<div id="FeaturedProducts" className="profile-assets profile-products row">
									<h4>Products</h4>
									{getAssets(Exhibitor_Assets__r, "Product", id, inputState)}
								</div>
							) : null}
							{Exhibitor_Assets__r.find((asset) => asset.Asset_Type__c === "News") ? (
								<div id="News" className="profile-assets profile-news row">
									<h4>News</h4>
									{getAssets(Exhibitor_Assets__r, "News", id, inputState)}
								</div>
							) : null}
							{Exhibitor_Assets__r.find((asset) => asset.Asset_Type__c === "Video") ? (
								<div id="Videos" className="profile-assets profile-videos row">
									<h4>{pagetitle} Videos</h4>
									{getAssets(Exhibitor_Assets__r, "Video", id, inputState)}
								</div>
							) : null}
							{Exhibitor_Assets__r.find((asset) => asset.Asset_Type__c === "Downloadable Resource") ? (
								<div id="ResourceDownloads" className="profile-assets profile-downloadables row">
									<h4>Resource Downloads</h4>
									{getAssets(Exhibitor_Assets__r, "Downloadable Resource", id, inputState)}
								</div>
							) : null}
						</>
					) : null}
				</div>
				{getMetaCol(exhibitor, options)}
			</section>
		);
	}
}
export default Profile;
