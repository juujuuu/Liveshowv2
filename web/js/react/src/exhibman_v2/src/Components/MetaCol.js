
import React from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";

import fireModal from "../../../common_utils/Bootsrap5Modal";
import { getExhibListPath } from "../Utils/GetPath";
import sanitizeUrl from "../Utils/SanitizeUrl";
import sanitizeIds from "../Utils/SanitizeIds";
import { pushPageView } from "../Utils/pushPageView";

import Cta from "../../../common_components/Cta";

import { setMode, fetchExhibs, setLoading } from "../Actions";

import StickyNav from "../../../common_components/StickyNav";
import { getSiteFromId } from "../Utils/GetShow";
import { dualLanguage } from "../Utils/dualLanguagefunction";

/**
 *
 * @param {Object} props
 * @returns Side column used in Profile and article / product pages.
 */
const MetaCol = ({ order }) => {
    // const { 
    // exhibitor,
    //  options,
    //   setLoading, 
    // setMode,
    //  fetchExhibs
    //  } = props;
    // let { order } = props;
    const dispatch = useDispatch()
    //Have to be a bit messy to move the columns on mobile.  Could probs refactor.
    order = !order ? "order-1 order-md-2" : order;

    const Company_Address__c = useSelector(state => state.exhibitor.Company_Address__c)
    const exhibitor = useSelector(state => state.exhibitor)
    const Company_State__c = useSelector(state => state.exhibitor.Company_State__c)
    const Company_City__c = useSelector(state => state.exhibitor.Company_City__c)
    const country = useSelector(state => state.exhibitor.country)
    const Exhibitor_listing_type__c = useSelector(state => state.exhibitor.Exhibitor_listing_type__c)
    const Company_Zip__c = useSelector(state => state.exhibitor.Company_Zip__c)
    const Youtube_Channel__c = useSelector(state => state.exhibitor.Youtube_Channel__c,)
    const Linkedin__c = useSelector(state => state.exhibitor.Linkedin__c)
    const Facebook__c = useSelector(state => state.exhibitor.Facebook__c)
    const Twitter__c = useSelector(state => state.exhibitor.Twitter__c,)
    const url = useSelector(state => state.exhibitor.url)
    const boothnum = useSelector(state => state.exhibitor["exhibitor-booth"])
    const Expo__c = useSelector(state => state.exhibitor.Expo__c)
    const options = useSelector(state => state.options)
    const { contactcampaign, ids } = options;
    const enhanced = Exhibitor_listing_type__c != "Standard";
    const show = useSelector(state => state.options.show)

    const exhibitor2 = useSelector(state => state.exhibitor)


    // const {
    // Expo__c,
    // url,
    // Twitter__c,
    // Facebook__c,
    // Linkedin__c,
    // Company_City__c,
    // Company_State__c,
    // Company_Address__c,
    // Youtube_channel__c,
    // Exhibitor_listing_type__c,
    // country,
    // Company_Zip__c,
    // } = exhibitor;




    // const boothnum = exhibitor["exhibitor-booth"];


    /**
     *
     * @param {String} url
     * @returns Icon JSX linking to the url
     */
    const getUrl = url => {
        if (url) {
            return (
                <p>
                    <strong>
                        <a href={sanitizeUrl(url)} target="_blank" rel="noreferrer">
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
                            <i className={`bi bi-${icon}`}></i> {icon.charAt(0).toUpperCase() + icon.slice(1)}
                        </a>
                    </strong>
                </p>
            );
        } else {
            return null;
        }
    };

    /**
     *
     * @param {String} field - Part of address
     * @returns A line of address JSX.
     */
    const getAddressField = (field, punctuation = ",") => {
        if (field) {
            return (
                <p>
                    <strong>{field}{punctuation}</strong>
                </p>
            );
        } else {
            return null;
        }
    };

    const handleListSwitch = () => {
        dispatch(setLoading(true));
        dispatch(setMode("LIST"));
        pushPageView();
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    return (
        <nav className={`col-12 col-md-3 ${order} meta-info-col`}>
            <StickyNav endAffix={1800} disable={window.innerWidth < 992}>
                {window.innerWidth < 992 ? (
                    <Link className="router-link" to={getExhibListPath(options.debug, options.local, options.postshow,options.espabm)} onClick={() => handleListSwitch()}>
                        <Cta size="reg" curved={false} bonusClass={`profile-back-to-list left`} key={`Mob back to Exhibitor List`} color="black">
                            {dualLanguage(show, "Booth number", "Número de stand / Booth number")}
                        </Cta>
                    </Link>
                ) : null}
                {enhanced ? (
                    <div className="meta-info-col__button">
                        <Cta
                            size={"max"}
                            color="cex-red"
                            role="contactExhibitor"
                            handler={() => fireModal([exhibitor, contactcampaign], "contact-exhibitor", "lg")}
                            bonusClass="center">

                            Contact Exhibitor
                        </Cta>
                    </div>
                ) : null}
                <div className="meta-info-col__booth-num" style={enhanced ? { marginTop: "10px" } : null}>
                    <h4>{dualLanguage(show, "Booth number", "Número de stand / Booth number")}: {boothnum}</h4>
                </div>
                
                    <div className="meta-info-col__contact-list">
                        <h4>{show !== "ABM" && "Contact"}</h4>
                        {getUrl(url)}
                        {enhanced && (
                            <>
                                {getSocial(Linkedin__c, "LINKEDIN")}
                                {getSocial(Facebook__c, "FACEBOOK")}
                                {getSocial(Twitter__c, "TWITTER")}
                                {getSocial(Youtube_Channel__c, "YOUTUBE")}

                            </>
                        )}
                    </div>
                

                {Company_Address__c && (
                    (show == "ABM" ? null : <div className="meta-info-col__address">
                        <p>
                            <i className="bi bi-house-door-fill"></i> Address:{" "}
                        </p>

                        {getAddressField(Company_Address__c)}
                        {getAddressField(Company_City__c)}
                        {getAddressField(Company_State__c)}
                        {getAddressField(country)}
                        {getAddressField(Company_Zip__c, ".")}

                    </div>
                    ))}



            </StickyNav>
        </nav>
    );
};
// const mapStateToProps = (store, ownProps) => {
//     return {
//         // exhibitor: store.exhibitor,
//         // options: store.options,
//         // order: ownProps.order,
//         // exhibs: store.exhibs,
//     };
// };
// export default connect(mapStateToProps, {
//     // setMode,
//     // fetchExhibs,
//     // setLoading,
// })(MetaCol);
export default MetaCol
