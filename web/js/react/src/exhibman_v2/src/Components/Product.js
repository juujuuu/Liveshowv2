// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";

// import fireModal from "../../../common_utils/Bootsrap5Modal";
// import { getProfilePath } from "../Utils/GetPath";
// import { fetchExhib, setLoading, setMode, setProduct, setProfile } from "../Actions";
// import { getSiteFromId } from "../Utils/GetShow";
// import sanitizeIds from "../Utils/SanitizeIds";
// import { pushPageView } from "../Utils/pushPageView";

// import Spinner from "../../../common_components/Spinner";
// import Cta from "../../../common_components/Cta";

// import MetaCol from "./MetaCol";

// /**
//  *
//  * @param {Object} props
//  * @returns Products / articles pages.
//  */
// const Product = props => {
//     const { exhibitor, loading, options, fetchExhib, profileId, setLoading, productId } = props;

//     useEffect(() => {
//         const { ids } = options;
//         if (Object.keys(exhibitor).length > 0) {
//             setLoading(false);
//         } else {
//             const siteURL = getSiteFromId(ids instanceof Array ? ids[0] : ids);
//             fetchExhib(siteURL, profileId).then(response => {
//                 setLoading(false);
//             });
//         }
//     }, []);

//     const handleSwitchMode = (mode, profileId) => {
//         const { setMode, setProfile, setLoading } = props;
//         setLoading(true);
//         setProfile(profileId);
//         setMode(mode);
//         pushPageView();
//         document.body.scrollTop = document.documentElement.scrollTop = 0;
//     };

//     if (loading) {
//         return <Spinner></Spinner>;
//     } else {
//         const { pagetitle, id } = exhibitor;
//         const { show, contactcampaign, debug, local } = options;
//         const product = exhibitor.Exhibitor_Assets__r.find(asset => productId === asset.Id);
//         const { Body__c, Link__c, Title__c, Asset_Type__c } = product;

//         return (
//             <section className={`exhibmanV2 exhibmanV2--${show} exhibman-product row`}>
//                 <div className="col-12 col-md-9 order-1 meta-info-col">
//                     <div className="product-header">
//                         <h2>
//                             <Link className="router-link" to={getProfilePath(debug, local, id)} onClick={() => handleSwitchMode("PROFILE", id)}>
//                                 {pagetitle}
//                             </Link>
//                         </h2>
//                         <h1>{Title__c}</h1>
//                     </div>
//                     <div className="product-body">
//                         <div className="product-body__image">
//                             <img className="img-fluid" src={Link__c} alt="Product Image" />
//                         </div>
//                         <div className="product-body__text" dangerouslySetInnerHTML={{ __html: Body__c }}></div>
//                         {Asset_Type__c === "Product" ? (
//                             <div className="product-enquire">
//                                 <Cta
//                                     size={window.innerWidth > 992 ? "reg" : "max"}
//                                     color="cex-red"
//                                     handler={() => fireModal([exhibitor, contactcampaign], "contact-exhibitor", "lg")}
//                                     bonusClass={window.innerWidth > 992 ? "left" : "center"}>
//                                     Enquire About Product
//                                 </Cta>
//                             </div>
//                         ) : null}
//                     </div>
//                 </div>
//                 <MetaCol order={"order-2"} />
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
//     setProduct,
//     setProfile,
// })(Product);

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";

import fireModal from "../../../common_utils/Bootsrap5Modal";
import { getProfilePath } from "../Utils/GetPath";
import { fetchExhib, setLoading, setMode, setProduct, setProfile } from "../Actions";
import { getSiteFromId } from "../Utils/GetShow";
import sanitizeIds from "../Utils/SanitizeIds";
import { pushPageView } from "../Utils/pushPageView";

import Spinner from "../../../common_components/Spinner";
import Cta from "../../../common_components/Cta";

import MetaCol from "./MetaCol";

/**
 *
 * @param {Object} props
 * @returns Products / articles pages.
 */
const Product = props => {
    // const {
        //  exhibitor,

        //  loading,
        //   options,
        //    fetchExhib,
            // profileId,
        //  setLoading,
        //   productId
        //  } = props;
const exhibitor=useSelector(state=>state.exhibitor)
const loading =useSelector(state=>state.loading)
const options =useSelector(state=>state.options)
const profileId=useSelector(state=>state.profileId)
const productId=useSelector(state=>state.productId)



const dispatch=useDispatch()
    useEffect(() => {
        const { ids } = options;
        if (Object.keys(exhibitor).length > 0) {
            dispatch(setLoading(false));
        } else {
            const siteURL = getSiteFromId(ids instanceof Array ? ids[0] : ids);
            dispatch(fetchExhib(siteURL, profileId)).then(response => {
                dispatch(setLoading(false));
            });
        }
    }, []);

    const handleSwitchMode = (mode, profileId) => {
        // const { 
            // setMode,
            //  setProfile,
            //  setLoading
            //  } = props;
             
        dispatch(setLoading(true));
        dispatch(setProfile(profileId));
        dispatch(setMode(mode));
        pushPageView();
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    if (loading) {
        return <Spinner></Spinner>;
    } else {
        const { pagetitle, id } = exhibitor;
        const { show, contactcampaign, debug, local,postshow } = options;
        const product = exhibitor.Exhibitor_Assets__r.find(asset => productId === asset.Id);
        const { Body__c, Link__c, Title__c, Asset_Type__c } = product;

        return (
            <section className={`exhibmanV2 exhibmanV2--${show} exhibman-product row`}>
                <div className="col-12 col-md-9 order-1 meta-info-col">
                    <div className="product-header">
                        <h2>
                            <Link className="router-link" to={getProfilePath(debug, local, id,postshow)} onClick={() => handleSwitchMode("PROFILE", id)}>
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
                                    role="EnquireAboutProduct"
                                    handler={() => fireModal([exhibitor, contactcampaign], "contact-exhibitor", "lg")}
                                    bonusClass={window.innerWidth > 992 ? "left" : "center"}>
                                    Enquire About Product
                                </Cta>
                            </div>
                        ) : null}
                    </div>
                </div>
                <MetaCol order={"order-2"} />
            </section>
        );
    }
};
// const mapStateToProps = (store, ownProps) => {
//     return { ...store };
// };
// export default connect(mapStateToProps, {
//     fetchExhib,
//     // setLoading,
//     // setMode,
//     // setProduct,
//     // setProfile,
// })(Product);
export default Product