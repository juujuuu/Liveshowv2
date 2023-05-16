// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";

// import { setMode, setProfile, setLoading } from "../Actions";

// import Cta from "../../../common_components/Cta";

// import { getProfilePath } from "../Utils/GetPath";
// import { pushPageView } from "../Utils/pushPageView";
// import { getAcronymFromId } from "../Utils/GetShow";

// class Slide extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }

//     getCats = (cats) => {
//         let string = "";
//         cats.forEach((cat) => {
//             string = string + `${cat} | `;
//         });
//         string = string.substring(0, string.length - 2);
//         return string;
//     };

//     handleSwitchMode = (mode, profileId) => {
//         const { setMode, setProfile, setLoading } = this.props;

//         setLoading(true);
//         setProfile(profileId);
//         setMode(mode);
//         pushPageView();
//         document.body.scrollTop = document.documentElement.scrollTop = 0;
//     };

//     render() {
//         const { payload, options, profileId } = this.props;

//         const {
//             id,
//             Expo__c,
//             Assets_Downloadable_Resource_Count__c,
//             Assets_News_Count__c,
//             Assets_Product_Count__c,
//             Assets_Video_Count__c,
//             Exhibitor_listing_type__c,
//             Show_On_Colocate__c,
//             pagetitle,
//             url,
//             web_logo,
//             corporateMember,
//             logo,
//         } = this.props.payload;

//         const { debug, local } = options;

//         const smallLogo = web_logo;
//         const bigLogo = logo;
//         const booth = payload["exhibitor-booth"];
//         const featured = payload["exhibitor-featured"];
//         const enhanced = Exhibitor_listing_type__c != "Standard";

//         let cats;
//         if (payload["exhibitor-cat"].length > 0) {
//             cats = this.getCats(payload["exhibitor-cat"].split("||"));
//         } else {
//             cats = false;
//         }

//         return (
//             <div className={`exhibitor-slide exhibitor-slide--${Exhibitor_listing_type__c} exhibitor-slide--${getAcronymFromId(Expo__c)} row`} id={id}>
//                 <div className="exhibitor-slide__side-flag"></div>
//                 <Link
//                     className="router-link router-link--profile-button"
//                     to={getProfilePath(debug, local, id)}
//                     onClick={() => this.handleSwitchMode("PROFILE", id)}
//                 >
//                     <Cta
//                         color="black"
//                         size="reg"
//                         margin="vertical-margin--0"
//                         curved={false}
//                         bonusClass={`exhibitor-slide__profile-button exhibitor-slide__profile-button--${Exhibitor_listing_type__c}`}
//                         role="exhib-assets"
//                         payload={payload}
//                     >
//                         {enhanced ? "Enhanced Listing" : "View Profile"}
//                     </Cta>
//                 </Link>
//                 <div className="col-6 col-md-3 exhibitor-slide__logo">
//                     <Link className="router-link" to={getProfilePath(debug, local, id)} onClick={() => this.handleSwitchMode("PROFILE", id)}>
//                         <img className="img-fluid" src={web_logo !== "" ? smallLogo : bigLogo} alt={pagetitle} />
//                     </Link>
//                 </div>
//                 <div className="col-6 col-md-5 exhibitor-slide__body">
//                     <div>
//                         <h4 className="exhibitor-name">
//                             <Link className="router-link" to={getProfilePath(debug, local, id)} onClick={() => this.handleSwitchMode("PROFILE", id)}>
//                                 {pagetitle}
//                             </Link>
//                         </h4>

//                         <p className="exhibitor-booth">Booth Number: {booth}</p>
//                         {window.innerWidth < 768 ? (
//                             <>
//                                 {cats != false ? (
//                                     <div className="exhibitor-slide__cats">
//                                         <p>{cats}</p>
//                                     </div>
//                                 ) : null}
//                             </>
//                         ) : null}
//                     </div>
//                 </div>
//                 {window.innerWidth > 768 ? (
//                     <div className="col-md-4 exhibitor-slide__cats">
//                         <p>{cats != false ? cats : null}</p>
//                     </div>
//                 ) : null}
//             </div>
//         );
//     }
// }
// const mapStateToProps = (store, ownProps) => {
//     return { ...store, payload: ownProps.payload };
// };
// export default connect(mapStateToProps, { setMode, setLoading, setProfile })(Slide);
import React, { Component } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setMode, setProfile, setLoading } from "../Actions";

import Cta from "../../../common_components/Cta";
import PopUp from "../../../common_components/PopUp";
import { getProfilePath } from "../Utils/GetPath";
import { pushPageView } from "../Utils/pushPageView";
import { getAcronymFromId } from "../Utils/GetShow";

// class Slide extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }

const Slide=(props)=>{
const dispatch= useDispatch()
const options=useSelector(state=>state.options)
const mode=useSelector(state=>state.mode)
 const   getCats = (cats) => {
        let string = "";
        cats.forEach((cat) => {
            string = string + `${cat} | `;
        });
        string = string.substring(0, string.length - 2);
        return string;
    };

    const handleSwitchMode = (mode, profileId) => {
        //those are for the buttons in the list 
        // const { setMode, setProfile, setLoading } = this.props;
        //   const { 
            // setMode,
            //  setProfile,
            //   setLoading 
            // } = props;
        

        dispatch(setLoading(true));
        dispatch(setProfile(profileId));
        dispatch(setMode(mode));
        
        pushPageView();
        document.body.scrollTop = document.documentElement.scrollTop = 0;
       
    };

    //  render() {
        // const { payload, options, profileId } = this.props;
        const { payload} = props; 
            // options,
            //  profileId
             
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
        // } = this.props.payload;
    } = props.payload;

        const { debug, local } = options;

        const smallLogo = web_logo;
        const bigLogo = logo;
        const booth = payload["exhibitor-booth"];
        const featured = payload["exhibitor-featured"];
        const enhanced = Exhibitor_listing_type__c != "Standard";

        let cats;
        if (payload["exhibitor-cat"].length > 0) {
            // cats = this.getCats(payload["exhibitor-cat"].split("||"));
            cats = getCats(payload["exhibitor-cat"].split("||"));
        } else {
            cats = false;
        }

        return (

            mode=="LEAD-RETRIEVAL" ? ( 
                
                <div className={`exhibitor-slide exhibitor-slide--${Exhibitor_listing_type__c} exhibitor-slide--${getAcronymFromId(Expo__c)} row`} id={id}>
                 <PopUp  logo={web_logo} link={props.payload.Lead_Retrieval_Form_Link__c} pageTitle={props.payload.pagetitle}/>  
                <div className="exhibitor-slide__side-flag"></div>
               
               {/* <Link */}
                 <p  className="router-link router-link--profile-button">
                   
                   { /* onClick={() => this.handleSwitchMode("PROFILE", id)}*/}
{/*                    
                   size={window.innerWidth > 992 ? "reg" : "max"}
                                    color="cex-red"
                                    handler={() => fireModal([exhibitor, contactcampaign], "contact-exhibitor", "lg")}
                                    bonusClass={window.innerWidth > 992 ? "left" : "center"}>
                                Enquire About Product */}
                   
                    {/* <Cta
                        color="black"
                        size="reg"
                        margin="vertical-margin--0"
                        curved={false}
                        bonusClass={`exhibitor-slide__profile-button exhibitor-slide__profile-button--Standard p-2`}
                        role="lead-button"
                        // payload={props.payload}
                        handler={handleTEst}
                    >
                        Order Lead Retrieval
                        
                    </Cta> */}
                   
                    </p>
              {/*   </Link>*/}
            
                <div className="col-6 col-md-3 exhibitor-slide__logo">
                    {/* <Link className="router-link" to={getProfilePath(debug, local, id)} onClick={() => this.handleSwitchMode("PROFILE", id)}> */}
                    {/* <Link className="router-link" to={getProfilePath(debug, local, id)} onClick={() => handleSwitchMode("PROFILE", id)}> */}
                        <img className="img-fluid" src={web_logo !== "" ? smallLogo : bigLogo} alt={pagetitle} />
                    {/* </Link> */}
                </div>
                <div className="col-6 col-md-5 exhibitor-slide__body">
                    <div>
                        <h4 className="exhibitor-name">
                            {/* <Link className="router-link" to={getProfilePath(debug, local, id)} onClick={() => this.handleSwitchMode("PROFILE", id)}> */}
                            {/* <Link className="router-link" to={getProfilePath(debug, local, id)} onClick={() =>handleSwitchMode("PROFILE", id)}> */}
                                {pagetitle}
                            {/* </Link> */}
                        </h4>
          
                        <p className="exhibitor-booth">Booth Number: {booth}</p>
                        {window.innerWidth < 768 ? (
                            <>
                                {cats != false ? (
                                    <div className="exhibitor-slide__cats">
                                        {/* <p>{cats}</p> */}
                                        
                                    </div>
                                ) : null}
                            </>
                        ) : null}
                    </div>
                </div>
                {window.innerWidth > 768 ? (
                    <div className="col-md-4 exhibitor-slide__cats">
                        {/* <p>{cats != false ? cats : null}</p> */}
                    </div>
                ) : null}
            </div>
            ):(
            <div className={`exhibitor-slide exhibitor-slide--${Exhibitor_listing_type__c} exhibitor-slide--${getAcronymFromId(Expo__c)} row`} id={id}>
                <div className="exhibitor-slide__side-flag"></div>
                <Link
                    className="router-link router-link--profile-button"
                    to={getProfilePath(debug, local, id)}
                    // onClick={() => this.handleSwitchMode("PROFILE", id)}
                    onClick={() => handleSwitchMode("PROFILE", id)}
                >
                    <Cta
                        color="black"
                        size="reg"
                        margin="vertical-margin--0"
                        curved={false}
                        bonusClass={`exhibitor-slide__profile-button exhibitor-slide__profile-button--${Exhibitor_listing_type__c}`}
                        role="exhib-assets"
                        payload={payload}
                    >
                        {enhanced ? "Enhanced Listing" : "View Profile"}
                    </Cta>
                </Link>
                <div className="col-6 col-md-3 exhibitor-slide__logo">
                    {/* <Link className="router-link" to={getProfilePath(debug, local, id)} onClick={() => this.handleSwitchMode("PROFILE", id)}> */}
                    <Link className="router-link" to={getProfilePath(debug, local, id)} onClick={() => handleSwitchMode("PROFILE", id)}>
                        <img className="img-fluid" src={web_logo !== "" ? smallLogo : bigLogo} alt={pagetitle} />
                    </Link>
                </div>
                <div className="col-6 col-md-5 exhibitor-slide__body">
                    <div>
                        <h4 className="exhibitor-name">
                            {/* <Link className="router-link" to={getProfilePath(debug, local, id)} onClick={() => this.handleSwitchMode("PROFILE", id)}> */}
                            <Link className="router-link" to={getProfilePath(debug, local, id)} onClick={() =>handleSwitchMode("PROFILE", id)}>
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
        ));
    // }
}
// const mapStateToProps = (store, ownProps) => {
//     return { ...store,
//         //  payload: ownProps.payload
//          };
// };
// export default connect(mapStateToProps, {
//     // setMode, 
//     // setLoading, 
//     // setProfile
//  })(Slide);
 export default Slide
