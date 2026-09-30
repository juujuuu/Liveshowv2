// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";

// import { getExhibListPath, getProductPath } from "../../Utils/GetPath";
// import { connect } from "react-redux";
// import { fetchExhib, setMode, setLoading } from "../../Actions";
// import { getSiteFromId } from "../../Utils/GetShow";
// import { pushPageView } from "../../Utils/pushPageView";
// import sanitizeIds from "../../Utils/SanitizeIds";

// import Spinner from "../../../../common_components/Spinner";
// import Cta from "../../../../common_components/Cta";

// import Video from "./Video";
// import Downloadable from "./Downloadable";
// import ProfileProduct from "./ProfileProduct";
// import MetaCol from "../MetaCol";

// const Profile = props => {
//     const { loading, exhibitor, options, setMode, fetchExhib, setLoading, profileId } = props;

//     const { show, ids, mode, debug } = options;
//     const { pagetitle, content, Company_Bio_Enhanced__c, logo, Expo__c, Exhibitor_Assets__r, id, Exhibitor_listing_type__c } = exhibitor;

//     const enhanced = Exhibitor_listing_type__c != "Standard";
//     const cats = exhibitor["exhibitor-cat"];

//     useEffect(() => {
//         if (Object.keys(exhibitor).length > 0 && id === profileId) {
//             setLoading(false);
//         } else {
//             const siteURL = getSiteFromId(ids instanceof Array ? ids[0] : ids);
//             fetchExhib(siteURL, profileId).then(response => {
//                 setLoading(false);
//             });
//         }
//     }, []);

//     /**
//      *
//      * @param {Array} assets - Array of assets to check
//      * @returns Some JSX for the quick jump nav.  Generated based off of what assets the exhiitor has uploaded.
//      */
//     const getJumpList = assets => {
//         let types = [];
//         let str;
//         //What bits do we need to bother adding to the nav?
//         assets.forEach(asset => {
//             switch (asset.Asset_Type__c) {
//                 case "Product":
//                     str = "Featured Products";
//                     break;
//                 case "Video":
//                     str = "Videos";
//                     break;
//                 case "News":
//                     str = "News";
//                     break;
//                 case "Downloadable Resource":
//                     str = "Resource Downloads";
//                     break;
//                 default:
//                     break;
//             }
//             if (!types.includes(str)) {
//                 types = [...types, str];
//             }
//         });
//         return (
//             <>
//                 {types.map(type => (
//                     <div key={`jump-${type}`} className="profile-quick-menu__type" onClick={() => zapTo(type.replace(" ", ""))}>
//                         <p>{type}</p>
//                     </div>
//                 ))}
//             </>
//         );
//     };

//     const zapTo = target => {
//         let offset = document.getElementById(target).getBoundingClientRect().top - 150;
//         window.scrollTo({
//             top: offset,
//             behavior: "smooth",
//         });
//     };


    
// 	/**
// 	 *
// 	 * @param {Array} assets Exhibitor Assets Array
// 	 * @param {String} type Type of assets to output
// 	 */
// 	const getAssets = (assets, type, exhibId = false) => {
//     		assets = assets.filter(asset => asset.Asset_Type__c == type);
//     		return assets.map(asset => {
// 			const { pagetitle } = exhibitor;
//     			switch (type) {
//     				case "Product":
//     					return (
//     						<ProfileProduct
//     							key={`asset-${asset.Id}`}
//     							asset={asset}
//     						/>
//     					);
//     				case "News":
//     					return (
//     						<ProfileProduct
//     							key={`asset-${asset.Id}`}
//     							asset={asset}
//     						/>
//     					);
//     				case "Video":
//     					return <Video key={`asset-${asset.Id}`} asset={asset} />;
//     				case "Downloadable Resource":
//     					return (
//     						<Downloadable
//     							key={`asset-${asset.Id}`}
//     							asset={asset}
//     							pagetitle={pagetitle}
//     						/>
//     					);
//     				default:
//     					break;
//     			}
//     		});
//     	};
//         const handleListSwitch = () => {
//         setLoading(true);
//         setMode("LIST");
//         pushPageView(); 
//         document.body.scrollTop = document.documentElement.scrollTop = 0;
//     };

//     if (loading) {
//         return <Spinner></Spinner>;
//     } else {
//         return (
//             <section className={`exhibmanV2 exhibmanV2--${show} exhibman-profile exhibman-profile--${Exhibitor_listing_type__c} row`}>
//                 <div className="col-12 col-md-9 order-2 order-md-1 profile">
//                     {window.innerWidth > 992 ? (
//                         <Link className="router-link" to={getExhibListPath(options.debug, options.local)} onClick={async () => await handleListSwitch()}>
//                             <Cta size="reg" curved={false} bonusClass={`profile-back-to-list left`} key={`Desk Back to Exhibitor List`} color="black">
//                                 Back to Exhibitor List
//                             </Cta>
//                         </Link>
//                     ) : null}
//                     <h1 className="profile-title">{pagetitle}</h1>
//                     {Exhibitor_Assets__r && enhanced && window.innerWidth > 992 ? (
//                         <nav className="profile-quick-menu row">
//                             <div className="profile-quick-menu__jump col-2">
//                                 <p>
//                                     <strong>Jump to:</strong>
//                                 </p>
//                             </div>
//                             <div className="profile-quick-menu__list col-10">{getJumpList(Exhibitor_Assets__r)}</div>
//                         </nav>
//                     ) : null}
//                     <div className="profile-summary">
//                         <div className="profile-logo">
//                             <img className="img-fluid" src={logo} alt="Logo" />
//                         </div>
//                         <div className="profile-bios">
//                             <p className="profile-bios__short-bio">
//                                 <strong>{content}</strong>
//                             </p>
//                             {Company_Bio_Enhanced__c && enhanced ? (
//                                 <div
//                                     className="profile-bios__long-bio"
//                                     dangerouslySetInnerHTML={{
//                                         __html: Company_Bio_Enhanced__c,
//                                     }}></div>
//                             ) : null}
//                             <p className="profile-bios__cats">
//                                 <i>
//                                     <strong>Categories: </strong>
//                                     {cats}
//                                 </i>
//                             </p>
//                         </div>
//                     </div>
//                     {Exhibitor_Assets__r && enhanced ? (
//                         <>
//                             {Exhibitor_Assets__r.find(({ Asset_Type__c }) => Asset_Type__c === "Product") ? (
//                                 <div id="FeaturedProducts" className="profile-assets profile-products row">
//                                     <h4>Products</h4>
//                                     {getAssets(Exhibitor_Assets__r, "Product", id)}
//                                 </div>
//                             ) : null}
//                             {Exhibitor_Assets__r.find(({ Asset_Type__c }) => Asset_Type__c === "News") ? (
//                                 <div id="News" className="profile-assets profile-news row">
//                                     <h4>News</h4>
//                                     {getAssets(Exhibitor_Assets__r, "News", id)}
//                                 </div>
//                             ) : null}
//                             {Exhibitor_Assets__r.find(({ Asset_Type__c }) => Asset_Type__c === "Video") ? (
//                                 <div id="Videos" className="profile-assets profile-videos row">
//                                     <h4>{pagetitle} Videos</h4>
//                                     {getAssets(Exhibitor_Assets__r, "Video", id)}
//                                 </div>
//                             ) : null}
//                             {Exhibitor_Assets__r.find(({ Asset_Type__c }) => Asset_Type__c === "Downloadable Resource") ? (
//                                 <div id="ResourceDownloads" className="profile-assets profile-downloadables row">
//                                     <h4>Resource Downloads</h4>
//                                     {getAssets(Exhibitor_Assets__r, "Downloadable Resource", id)}
//                                 </div>
//                             ) : null}
//                         </>
//                     ) : null}
//                 </div>
//                 <MetaCol />
//             </section>
//         );
//     }
// };
// const mapStateToProps = (store, ownProps) => {
//     return { ...store };
// };
// export default connect(mapStateToProps, {
//     fetchExhib,
//     setLoading,
//     setMode,
// })(Profile);

import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { getExhibListPath, getProductPath } from "../../Utils/GetPath";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchExhib, setMode, setLoading } from "../../Actions";
import { getSiteFromId } from "../../Utils/GetShow";
import { pushPageView } from "../../Utils/pushPageView";
import sanitizeIds from "../../Utils/SanitizeIds";

import Spinner from "../../../../common_components/Spinner";
import Cta from "../../../../common_components/Cta";

import Video from "./Video";
import Downloadable from "./Downloadable";
import ProfileProduct from "./ProfileProduct";
import MetaCol from "../MetaCol";
import { dualLanguage } from "../../Utils/dualLanguagefunction";

const Profile = props => {
    const { 
        // loading, exhibitor, options,
        //  setMode,
        //  fetchExhib, 
        //  setLoading,
        //   profileId 
        } = props;
const dispatch= useDispatch()
const loading = useSelector(state=>state.loading)
const exhibitor = useSelector(state=>state.exhibitor)
const options = useSelector(state=>state.options)
const profileId= useSelector(state=>state.profileId)

    const { show, ids, mode, debug,postshow } = options;
    const { pagetitle, content,Company_Bio_Spanish__c, Company_Bio_Enhanced__c, logo, Expo__c, Exhibitor_Assets__r, id, Exhibitor_listing_type__c } = exhibitor;

    const enhanced = Exhibitor_listing_type__c != "Standard";
    const cats = exhibitor["exhibitor-cat"];
    const expoID=useSelector(state=>state.queries.expo[0])
    useEffect(() => {
     
        if (Object.keys(exhibitor).length > 0 && id === profileId) {
            dispatch(setLoading(false));
        } else {
            const siteURL = getSiteFromId(ids instanceof Array ? ids[0] : ids);
            dispatch(fetchExhib(siteURL, profileId,expoID)).then(response => {
                dispatch(setLoading(false));
            });
        }
    }, []);


    // function to set pageTitle based on the brand and show
    const setPageTitle=(show,pageTitle)=>{
          
           
        switch (show) {
            
            case "FMX":
                var showName = "Foam Expo " + pageTitle ;
                break;
            case "FME":
                var showName = "Foam Expo Europe " + pageTitle;
                break;
            case "ABE":
                var showName = "Adhesives Bonding Expo Europe "+ pageTitle;
                break;
            case "ABX":
              var   showName = "Adhesives Bonding Expo " + pageTitle;
                break;
            case "CEX":
               var  showName = "Ceramics Expo " + pageTitle;
                break;
            case "TME":
                var showName = "Thermal Management Expo " + pageTitle;
                break;
                case "TEE":
              var   showName = "Thermal Management Expo Europe " + pageTitle;
                break;
            case "SPC":
              var   showName = "Space Tech Expo " + pageTitle;
                break;
            case "BRE":
               var  showName = "Space Tech Expo Europe " + pageTitle;
                break;
                  case "ABM":
               var  showName = "Adhesives & Bonding Expo Mexico " + pageTitle;
                break;
            case "SAT":
             var    showName = "Satellite Connectivity Expo " + pageTitle;
                break;
        }
        document.title= showName
       
    }
    /**
     *
     * @param {Array} assets - Array of assets to check
     * @returns Some JSX for the quick jump nav.  Generated based off of what assets the exhiitor has uploaded.
     */
    const getJumpList = assets => {
        let types = [];
        let str;
        //What bits do we need to bother adding to the nav?
        assets.forEach(asset => {
            switch (asset.Asset_Type__c) {
                case "Product":
                    str = "Featured Products";
                    break;
                case "Video":
                    str = "Videos";
                    break;
                case "News":
                    str = "News";
                    break;
                case "Downloadable Resource":
                    str = "Resource Downloads";
                    break;
                default:
                    break;
            }
            if (!types.includes(str)) {
                types = [...types, str];
            }
        });
        return (
            <>
                {types.map(type => (
                    <div key={`jump-${type}`} className="profile-quick-menu__type" onClick={() => zapTo(type.replace(" ", ""))}>
                        <p>{type}</p>
                    </div>
                ))}
            </>
        );
    };

    const zapTo = target => {
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
	const getAssets = (assets, type, exhibId = false) => {
    		assets = assets.filter(asset => asset.Asset_Type__c == type);
    		return assets.map(asset => {
			const { pagetitle } = exhibitor;
    			switch (type) {
    				case "Product":
    					return (
    						<ProfileProduct
    							key={`asset-${asset.Id}`}
    							asset={asset}
    						/>
    					);
    				case "News":
    					return (
    						<ProfileProduct
    							key={`asset-${asset.Id}`}
    							asset={asset}
    						/>
    					);
    				case "Video":
    					return <Video key={`asset-${asset.Id}`} asset={asset} />;
    				case "Downloadable Resource":
    					return (
    						<Downloadable
    							key={`asset-${asset.Id}`}
    							asset={asset}
    							pagetitle={pagetitle}
    						/>
    					);
    				default:
    					break;
    			}
    		});
    	};
        const handleListSwitch = () => {
            //back to exhibitor button
            
        dispatch(setLoading(true));
        dispatch(setMode("LIST"));
        pushPageView(); 
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    if (loading) {
        return <Spinner></Spinner>;
    } else {
       setPageTitle(show,pagetitle)
     
        return (
            <section className={`exhibmanV2 exhibmanV2--${show} exhibman-profile exhibman-profile--${Exhibitor_listing_type__c} row`}>
                <div className="col-12 col-md-9 order-2 order-md-1 profile">
                    {window.innerWidth > 992 ? (
                        <Link className="router-link" to={getExhibListPath(options.debug, options.local,options.postshow,options.espabm)} onClick={async () => await handleListSwitch()}>
                            <Cta size="reg" curved={false} bonusClass={`profile-back-to-list left`} key={`Desk Back to Exhibitor List`} color="black">
                               {dualLanguage(show,"Back to Exhibitor List","Volver a la lista de expositores / Back to Exhibitor List")}
                            </Cta>
                        </Link>
                    ) : null}
                    <h1 translate="no" className="profile-title">{pagetitle}</h1>
                    {Exhibitor_Assets__r && enhanced && window.innerWidth > 992 ? (
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
                        <div style={{float:"none"}}className="profile-logo clearfix mb-3">
                            <img className="img-fluid" src={logo} alt="Logo" />
                        </div>
                        <div className="profile-bios">
                            {show=="ABM"? 
                            
                            <span className="profile-bios__short-bio">
                              <p>{Company_Bio_Spanish__c}</p>
                              <br/>
                              <p>
                              {content}
                              </p>
                            </span>:
                            <p className="profile-bios__short-bio">
                                {content}
                            </p>}



  
                       {Company_Bio_Enhanced__c && enhanced ? (
                                <div
                                    className="profile-bios__long-bio"
                                    dangerouslySetInnerHTML={{
                                        __html: Company_Bio_Enhanced__c,
                                   
                                    }}>
                                    </div>
                            ) : null}
                            <p className="profile-bios__cats">
                                <i>
                                    <strong>Categories: </strong>
                                    {cats}
                                </i>
                            </p>
                        </div>
                    </div>
                    {Exhibitor_Assets__r && enhanced ? (
                        <>
                            {Exhibitor_Assets__r.find(({ Asset_Type__c }) => Asset_Type__c === "Product") ? (
                                <div id="FeaturedProducts" className="profile-assets profile-products row">
                                    <h4>Products</h4>
                                    {getAssets(Exhibitor_Assets__r, "Product", id)}
                                </div>
                            ) : null}
                            {Exhibitor_Assets__r.find(({ Asset_Type__c }) => Asset_Type__c === "News") ? (
                                <div id="News" className="profile-assets profile-news row">
                                    <h4>News</h4>
                                    {getAssets(Exhibitor_Assets__r, "News", id)}
                                </div>
                            ) : null}
                            {Exhibitor_Assets__r.find(({ Asset_Type__c }) => Asset_Type__c === "Video") ? (
                                <div id="Videos" className="profile-assets profile-videos row">
                                    <h4>{pagetitle} Videos</h4>
                                    {getAssets(Exhibitor_Assets__r, "Video", id)}
                                </div>
                            ) : null}
                            {Exhibitor_Assets__r.find(({ Asset_Type__c }) => Asset_Type__c === "Downloadable Resource") ? (
                                <div id="ResourceDownloads" className="profile-assets profile-downloadables row">
                                    <h4>Resource Downloads</h4>
                                    {getAssets(Exhibitor_Assets__r, "Downloadable Resource", id)}
                                </div>
                            ) : null}
                        </>
                    ) : null}
                </div>
                <MetaCol />
            </section>
        );
    }
};
// const mapStateToProps = (store, ownProps) => {
//     return { ...store };
// };
// export default connect(mapStateToProps, {
//     // fetchExhib,
//     // setLoading,
//     // setMode,
// })(Profile);
export default Profile