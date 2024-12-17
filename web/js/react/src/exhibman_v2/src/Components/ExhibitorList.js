// import React, { useEffect } from "react";

// import Slide from "./Slide";
// import StickyNav from "../../../common_components/StickyNav";
// import Cta from "../../../common_components/Cta";
// import SearchInput from "../../../common_components/SearchInput";
// import Spinner from "../../../common_components/Spinner";
// import Alphabet from "../../../common_components/Alphabet";

// import { fetchExhibs, setQueries, setLoading } from "../Actions";

// import PDFMake from "../Utils/PDFMake/PDFMake";
// import { connect } from "react-redux";
// import { getSiteFromId, getShowNameFromId,getSiteFromAcronym } from "../Utils/GetShow";
// import sanitizeIds from "../Utils/SanitizeIds";
// import { Sponsors } from "./Sponsors";


// /**
//  *
//  * @param {Object} props
//  * @returns Main Exhibitor List.
//  */
// const ExhibitorList = props => {
//     const { options, exhibs, queries, loading, setQueries, setLoading, fetchExhibs } = props;

//     //Do this after inital component render
//     useEffect(() => {
//         if (exhibs.length > 0) {
//             setLoading(false);
//         } else {
//             const siteURL = getSiteFromId(options.ids instanceof Array ? options.ids[0] : options.ids);
//             const expos = sanitizeIds(options.ids);

//             fetchExhibs(siteURL, expos).then(response => {
//                 setLoading(false);
//             });
//         }
//     }, []);

//     /**
//      *
//      * @param {Object} Options
//      * @returns Extra nav buttons for the side menu
//      */
//     const getExtraNavButtons = options => {
//         const { regLink, show } = options;
//         let jsx = []; //Just make a a jsx array of components to return.
//         let newJsx = (
//             <Cta
//                 size="max"
//                 color="black"
//                 handler={() => setTimeout(new PDFMake(options, exhibs), 0)}
//                 key={"download list"}
//                 bonusClass="control-col__download-list">
//                 Download Full List PDF
//             </Cta>
//         );
//         jsx = [...jsx, newJsx];

//         //For Ipek
//         if (show === "TME") {
//             newJsx = (
//                 <Cta
//                     size="max"
//                     color="black"
//                     link={"https://ceramicstmeexpo23.mapyourshow.com/8_0/exhview/index.cfm"}
//                     bonusClass="control-col__download-list"
//                     target="_blank"
//                     key={"floorplan"}>
//                     Floorplan
//                 </Cta>
//             );
//             jsx = [...jsx, newJsx];
//         }

//         if (regLink) {
//         if(show ==="SPC"){
//             newJsx = (
//                 <Cta size="max" color="cex-red" link="https://register.visitcloud.com/survey/285mqh2v6t2i3/" bonusClass="control-col__reg-link" key={"register to attend"}>
//                     Register To Attend
//                 </Cta>
//             );
//             jsx = [...jsx, newJsx];
//         }else{
//             newJsx = (
//                 <Cta size="max" color="cex-red" link={regLink} bonusClass="control-col__reg-link" key={"register to attend"}>
//                     Register To Attend
//                 </Cta>
//             );
//             jsx = [...jsx, newJsx];
//         }
//     }

//         //Sponsor
//         // if (show === "CEX" && window.innerWidth > 768) {
//         //     newJsx = (
//         //         <div className="control-col__sponsor vertical-margin--10">
//         //             <a
//         //                 href="https://linkprotect.cudasvc.com/url?a=https%3a%2f%2fcerionnano.com%2f%3futm_source%3devent%26utm_medium%3ddisplay-ad%26utm_campaign%3dts-ceramics-expo-2022%26utm_content%3dbanner-ad&c=E,1,BvpDEebN6SPBr9h0eHxEUNdPDpHP2KJKGTKfHthvDpm-U0hL0y67K2Mp9UCYeMeKnzhgwVBZPgdC0bJ3AlA9qdV8RCz2lJFKKHobJcitC9W6q-Vp&typo=1"
//         //                 title="Cerion"
//         //                 target="_blank">
//         //                 <img
//         //                     style={{ width: "100%" }}
//         //                     src="./assets/resources/cex/web/images/misc/sponsor/Cerion-360x80.png"
//         //                     className="img-fluid"
//         //                     alt="Cerion"
//         //                 />
//         //             </a>
//         //         </div>
//         //     );
//         //     jsx = [...jsx, newJsx];
//         // }

//         //moved this in Banner Component
//         //  if (show === "BRE" && window.innerWidth > 768) {
//         //     newJsx = (
//         //         <div className="control-col__sponsor vertical-margin--10">
//         //              <a
//         //                 href="https://www.ice.it/en/ "
//         //                 title="Italy at space Tech Expo Europe"
//         //                 target="_blank"> 
//         //                 <img
//         //                     style={{ width: "100%" }}
//         //                     // src="./assets/resources/sat/web/images/misc/sponsor/SpaceTech_Side_Banner.jpg"
//         //                       //use an image in the same folder to najes it show otherwise it will error 
//         //                     src="./small.jpg"
//         //                     className="img-fluid"
//         //                     alt="Italy at space Tech Expo Europe"
//         //                 />
//         //              </a> 
//         //         </div>
//         //     );
//         //     jsx = [...jsx, newJsx];
          
//         // }
//         return jsx;
//     };

   
//     const getExtra = options => {
//         const { regLink, show } = options;
//         let jsx = []; //Just make a a jsx array of components to return.


    
       
      
//     };

//     const getSlides = exhibitors => {
//         if (exhibitors.length < 1) {
//             return <h2 className="no-exhibs-message d-flex justify-content-center align-items-center">No exhibitors found</h2>;
//         }
//         return exhibitors.map((exhibitor, index) => {
//             const { id } = exhibitor;
//             return <Slide key={`slide--${id}--${index}`} payload={exhibitor} />;
//         });
//     };

//     const handleReset = () => {
//         setQueries({
//             search: "",
//             letter: "Show All",
//             expo: options.ids,
//         });
//         document.getElementById("react__search").value = "";
//     };

//     const handleSearch = term => {
//         setQueries({
//             search: term,
//             letter: queries.letter,
//             expo: queries.expo,
//         });
//     };

//     const handleSetLetter = letter => {
//         setQueries({
//             search: queries.search,
//             letter: letter,
//             expo: queries.expo,
//         });
//     };

//     /**
//      * For multi expo lists.
//      * @param {String} expo - SF expo string.  Adds / removes the expo from the queries.expo array.
//      */
//     const handleSetExpo = expo => {
//         let newExpoQuery;
//         let hasExpo = expo === queries.expo.find(queryExpo => queryExpo.includes(expo));

//         if (hasExpo) {
//             newExpoQuery = queries.expo.filter(queryExpo => !queryExpo.includes(expo));
//         } else {
//             newExpoQuery = [...queries.expo, expo];
//         }
//         setQueries({
//             search: queries.search,
//             letter: queries.letter,
//             expo: newExpoQuery,
//         });
//     };

//     /**
//      *
//      * @param {Array} exhibitors
//      * @returns All exhibitors with Expo__c matching expo
//      */
//     const expoFilter = exhibitors => {
//         const expo = props.queries.expo.map(id => id.replaceAll("'", ""));
//         return exhibitors.filter(exhibitor => {
//             //overrride for abe
//             if (exhibitor.Expo__c == "a1x3A000001FOPe") {
//                 const cat = exhibitor["exhibitor-cat"];
//                 if (expo.includes(exhibitor.Expo__c) || cat.includes("Adhesives and Sealants") || cat.includes("Bonding Solutions / Technology Provider")) {
//                     return true;
//                 }
//             }
//             return expo.includes(exhibitor.Expo__c);
//         });
//     };

//     /**
//      *
//      * @param {Array} exhibitors
//      * @param {String} search - String to search each exhibitor for.
//      * @returns exhibitors matching containg the search query.
//      */
//     const searchFilter = (exhibitors, search) => {
//         if (search.trim() == "") {
//             return exhibitors;
//         }
//         search = search.toLowerCase();
//         return exhibitors.filter(exhibitor => {
//             const cats = exhibitor["exhibitor-cat"].toLowerCase();
//             const pagetitle = exhibitor.pagetitle.toLowerCase();
//             const content = exhibitor.content.toLowerCase();
//             if (cats.includes(search) || pagetitle.includes(search) || content.includes(search)) {
//                 return true;
//             } else {
//                 return false;
//             }
//         });
//     };

//     /**
//      *
//      * @param {Array} exhibitors
//      * @param {String} letter - Letter to scan the exhib name for.
//      * @returns exhibitors with letter matching the title.
//      */
//     const alphabetFilter = (exhibitors, letter) => {
//         letter = letter.toLowerCase();

//         if (letter == "show all") {
//             return exhibitors;
//         }

//         return exhibitors.filter(({ pagetitle }) => {
//             const name = pagetitle.toLowerCase();

//             if (letter == "0-9") {
//                 return !isNaN(name.charAt(0));
//             } else if (letter.match(/[a-z]/i)) {
//                 //is a letter
//                 return letter == name.charAt(0);
//             } else {
//                 return true;
//             }
//         });
//     };

//     /**
//      *
//      * @param {Object} options - Main options object
//      * @param {Array} expos - Array of expo SF ids.
//      * @returns Multi Expo buttons for the side menu.
//      */
//     const getMultiExpo = (options, expos) => {
//         const { ids, multiExpo } = options;
// console.log(options)
//         if (!multiExpo) {
//             return null;
//         } else {
//             let jsx = [];
//             ids.forEach(showId => {
//                 let text;
//                 let sanitisedShowId = showId.replaceAll("'", "");
//                 text = getShowNameFromId(sanitisedShowId);
//                 let newShowButton = (
//                     <Cta
//                         size="max"
//                         curved={false}
//                         active={expos.includes(showId)}
//                         bonusClass={`control-col__show-filter control-col__show-filter--${sanitisedShowId}`}
//                         key={`show-filter-${showId}`}
//                         handler={handleSetExpo}
//                         role="expo-query"
//                         value={showId}>
//                         <span>{text}</span>
//                         {expos.includes(showId) ? (
//                             // get the tick (in shared resources) based on the show
//                             <img className="img-fluid" src={`${getSiteFromAcronym(options.show.toLowerCase())}assets/resources/shared/web/apps/exhibman/tick.png`} alt="tick" />
//                         ) : null}
//                     </Cta>
//                 );
//                 jsx = [...jsx, newShowButton];
//             });
//             return jsx;
//         }
//     };

//     /**
//      *
//      * @param {Array} exhibitors
//      * @param {Array} filters - String array of filter names to run.
//      * @param {Object} queries - Queries object.
//      * @param {Boolean} multiExpo - Id it a multi expo or not.
//      * @returns exhibitos that have passed through all filters.
//      */
//     const filterExhibitors = (exhibitors, filters, queries, multiExpo) => {
//         exhibitors = [...exhibitors]; //Chaning pointer in memory (probs not necessary here tbf).
//         filters.forEach(filter => {
//             if (filter == "SEARCH") {
//                 exhibitors = searchFilter(exhibitors, queries.search);
//             } else if (filter == "ALPHABET") {
//                 exhibitors = alphabetFilter(exhibitors, queries.letter);
//             }
//         });
//         if (multiExpo) {
//             exhibitors = expoFilter(exhibitors);
//         }
//         return exhibitors;
//     };

//     if (loading) {
//         return <Spinner />;
//     } else {
//         const { multiExpo, filters, show } = options;
//         const filteredExhibitors = filterExhibitors(exhibs, filters, queries, multiExpo);

//         return (
//             <section className={`exhibmanV2 exhibmanV2--${show} row`}>
//                 <nav className="col-12 col-md-4 control-col">
//                     <StickyNav>
//                         <div className="control-col__header">
                       
//                             <h3>
//                                 <strong>Refine Results</strong>
//                             </h3>
//                             <Cta bonusClass="control-col__reset" handler={handleReset} size="micro" color="black" margin="vertical-margin--0">
//                                 Clear Filters
//                             </Cta>
//                         </div>
//                         <div className="control-col__search vertical-margin--10">
//                             <SearchInput handler={handleSearch} value={queries.search} bonusClass="form-control" placeholder="Refine by Keyword" />
//                             {getMultiExpo(options, queries.expo)}
//                         </div>
//                         {getExtraNavButtons(options, exhibs)}
            
//                         <Sponsors
//                         show={options}
//                         href={"https://www.ice.it/en/"}
//                         title={"Italy at space Tech Expo Europe"}
//                         src={"./assets/resources/sat/web/images/misc/sponsor/SpaceTech_Side_Banner.jpg"}
//                         // src={"./small.jpg"}
//                         alt={"Italy at space Tech Expo Europe"}
//                         position={"-left"}
//                         displayBanner={""}
//                     />
                        
//                     </StickyNav>
//                 </nav>
//                 <div className="col-md-8 viewport-col">
//                     <Sponsors
//                         show={options}
//                         href={"https://www.ice.it/en/"}
//                         title={"Italy at space Tech Expo Europe"}
//                         src={"./assets/resources/sat/web/images/misc/sponsor/SpaceTech_Top__Banner.jpg"}
//                         // src={"./large.jpg"}
//                         alt={"Italy at space Tech Expo Europe"}
//                         position={"-top"}
//                         displayBanner={""}
                        
//                     />
//                     <div className="alphabet-filter">
//                         <Alphabet activeLetter={queries.letter} handler={handleSetLetter} />
//                     </div>
//                     <div className="row viewport__header">
                   
//                         <h3>
//                             <strong>Exhibitors A-Z</strong>
//                         </h3>
//                     </div>
//                     <div className="slide-list">{getSlides(filteredExhibitors)}</div>
//                 </div>
//             </section>
//         );
//     }
// };

// const mapStateToProps = (store, ownProps) => {
//     return store;
// };
// export default connect(mapStateToProps, {
//     setQueries,
//     fetchExhibs,
//     setLoading,
// })(ExhibitorList);



import React, { useEffect } from "react";

import Slide from "./Slide";
import StickyNav from "../../../common_components/StickyNav";
import Cta from "../../../common_components/Cta";
import SearchInput from "../../../common_components/SearchInput";
import Spinner from "../../../common_components/Spinner";
import Alphabet from "../../../common_components/Alphabet";

import { fetchExhibs, setQueries, setLoading } from "../Actions";

import PDFMake from "../Utils/PDFMake/PDFMake";
import { connect,useDispatch, useSelector } from "react-redux";
import { getSiteFromId, getShowNameFromId,getSiteFromAcronym } from "../Utils/GetShow";
import {dualLanguage,dualLanguageStyle  }from "../Utils/dualLanguagefunction";
//import  dualLanguageStyle from "../Utils/dualLanguagefunction";
import sanitizeIds from "../Utils/SanitizeIds";


import { Sponsors } from "./Sponsors";


/**
 *
 * @param {Object} props
 * @returns Main Exhibitor List.
 */
const ExhibitorList = props => {
    const { 
        // options,
        //  exhibs,
        //  queries,
        //   loading,
        //  setQueries,
        //   setLoading,
        //    fetchExhibs 
        } = props;
const dispatch=useDispatch() 
const queries=useSelector(state=>state.queries)
const options=useSelector(state=>state.options)
const exhibs=useSelector(state=>state.exhibs)
const loading=useSelector(state=>state.loading)
const mode=useSelector(state=>state.mode)


    //Do this after inital component render
    useEffect(() => {
        if (exhibs.length > 0) {
            dispatch(setLoading(false));
        } else {
            const siteURL = getSiteFromId(options.ids instanceof Array ? options.ids[0] : options.ids);
            const expos = sanitizeIds(options.ids);

            dispatch(fetchExhibs(siteURL, expos)).then(response => {
                dispatch(setLoading(false));
            });
        }
    }, []);


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
            case "SAT":
             var    showName = "Satellite Connectivity Expo " + pageTitle;
                break;
                case "FMC":
             var    showName = "Foam Expo China " + pageTitle;
                break;
        }
        document.title= showName
        
    }

    /**
     *
     * @param {Object} Options
     * @returns Extra nav buttons for the side menu
     */
    const getExtraNavButtons = options => {
        const { regLink, show } = options;
        if(mode !== "LEAD-RETRIEVAL"){
        let jsx = []; //Just make a a jsx array of components to return.
        
        let message
        let newJsx
        { if(show=="FME" || show=="ABE" || show=="BRE"){ message= "German"} else{message="Download Full List PDF " }}
       
        
            
         newJsx = (
            <Cta
                size="max"
                color="black"
                handler={() => setTimeout(new PDFMake(options, exhibs), 0)}
                key={"download list"}
                role="exhibDownloadPDF"
                bonusClass="control-col__download-list">
                {dualLanguage(show,"Download Full List PDF","Download Full List PDF / Gesamte Liste als PDF herunterladen")}
              
            </Cta>
        );
        
        jsx = [...jsx, newJsx];
    

     
        //For Ipek
        if (show === "TME" || show === "CEX") {
            newJsx = (
                <Cta
                    size="max"
                    color="black"
                    link={"https://ceramicstmeexpo25.mapyourshow.com/8_0/exhview/index.cfm"}
                    bonusClass="control-col__download-list"
                    target="_blank"
                    key={"floorplan"}>
                    Floorplan
                </Cta>
            );
            jsx = [...jsx, newJsx];
        }

        if (regLink) {
          if(show=="SPC" || show =="FMX" || show =="ABX"){
            newJsx = (
                <Cta size="max" color="cex-red" link={regLink} bonusClass="control-col__reg-link" key={"Register for free"}>
                   Register For Free
                </Cta>
            );
            jsx = [...jsx, newJsx];
        }
        
        else if(show ==="CEX" || show ==="TME"){
          
            newJsx = (
                <Cta size="max" color="cex-red" link={show=="CEX"? "https://www.ceramicsexpousa.com/site/forms/exhibitor":"https://www.thermalmanagementexpo.com/site/forms/exhibit-enquiry"} bonusClass="control-col__reg-link" key={"Booth Enquiry"}>
                 Booth Enquiry
                </Cta>
            );
            jsx = [...jsx, newJsx];
            
        }else{
            
            newJsx = (
                <Cta size="max" color="cex-red" link={regLink} bonusClass="control-col__reg-link" key={"register to attend"}>
                 {dualLanguage(show,"Register Your Interest ","Register To Attend / Registrieren sie sich, um teilzunehmen")}  
                </Cta>
            );
            jsx = [...jsx, newJsx];
        }
    }
    if (show === "BRE") {
        newJsx = (
            null
            // <Cta
            //     size="max"
            //     color="black"
            //     link={"https://www.spacetechexpo-europe.com/whatson/b2b-matchmaking-service"}
            //     bonusClass="control-col__download-list"
            //     target="_blank"
            //     key={"B2B matchmaking"}>
            //     B2B Matchmaking
            // </Cta>
        );
        jsx = [...jsx, newJsx];
    }

        //Sponsor
        // if (show === "CEX" && window.innerWidth > 768) {
        //     newJsx = (
        //         <div className="control-col__sponsor vertical-margin--10">
        //             <a
        //                 href="https://linkprotect.cudasvc.com/url?a=https%3a%2f%2fcerionnano.com%2f%3futm_source%3devent%26utm_medium%3ddisplay-ad%26utm_campaign%3dts-ceramics-expo-2022%26utm_content%3dbanner-ad&c=E,1,BvpDEebN6SPBr9h0eHxEUNdPDpHP2KJKGTKfHthvDpm-U0hL0y67K2Mp9UCYeMeKnzhgwVBZPgdC0bJ3AlA9qdV8RCz2lJFKKHobJcitC9W6q-Vp&typo=1"
        //                 title="Cerion"
        //                 target="_blank">
        //                 <img
        //                     style={{ width: "100%" }}
        //                     src="./assets/resources/cex/web/images/misc/sponsor/Cerion-360x80.png"
        //                     className="img-fluid"
        //                     alt="Cerion"
        //                 />
        //             </a>
        //         </div>
        //     );
        //     jsx = [...jsx, newJsx];
        // }

        //moved this in Banner Component
        //  if (show === "BRE" && window.innerWidth > 768) {
        //     newJsx = (
        //         <div className="control-col__sponsor vertical-margin--10">
        //              <a
        //                 href="https://www.ice.it/en/ "
        //                 title="Italy at space Tech Expo Europe"
        //                 target="_blank"> 
        //                 <img
        //                     style={{ width: "100%" }}
        //                     // src="./assets/resources/sat/web/images/misc/sponsor/SpaceTech_Side_Banner.jpg"
        //                       //use an image in the same folder to najes it show otherwise it will error 
        //                     src="./small.jpg"
        //                     className="img-fluid"
        //                     alt="Italy at space Tech Expo Europe"
        //                 />
        //              </a> 
        //         </div>
        //     );
        //     jsx = [...jsx, newJsx];
          
        // }
        return jsx;
    }
};

  
    const getExtra = options => {
        const { regLink, show } = options;
        let jsx = []; //Just make a a jsx array of components to return.

       
    
       
      
    };

    const getSlides = exhibitors => {
        
        if (exhibitors.length < 1) {
            return <h2 className="no-exhibs-message d-flex justify-content-center align-items-center">No exhibitors found</h2>;
        }
        return exhibitors.map((exhibitor, index) => {
            const { id } = exhibitor;
            return <Slide key={`slide--${id}--${index}`} payload={exhibitor} />;
        });
    };

    const handleReset = () => {
        dispatch(setQueries({
            search: "",
            letter: "Show All",
            expo: options.ids,
        }));
        document.getElementById("react__search").value = "";
    };

    const handleSearch = term => {
        
        dispatch(setQueries({
            search: term,
            letter: queries.letter,
            expo: queries.expo,
        }));
    };

    const handleSetLetter = letter => {
        
        dispatch(setQueries({
            search: queries.search,
            letter: letter,
            expo: queries.expo,
        }));
    };

    /**
     * For multi expo lists.
     * @param {String} expo - SF expo string.  Adds / removes the expo from the queries.expo array.
     */
    const handleSetExpo = expo => {
        let newExpoQuery;
        let hasExpo = expo === queries.expo.find(queryExpo => queryExpo.includes(expo));

        if (hasExpo) {
            newExpoQuery = queries.expo.filter(queryExpo => !queryExpo.includes(expo));
        } else {
            newExpoQuery = [...queries.expo, expo];
        }
        dispatch(setQueries({
            search: queries.search,
            letter: queries.letter,
            expo: newExpoQuery,
        }));
    };

    /**
     *
     * @param {Array} exhibitors
     * @returns All exhibitors with Expo__c matching expo
     */
    const expoFilter = exhibitors => {
        const expo = queries.expo.map(id => id.replaceAll("'", ""));
        return exhibitors.filter(exhibitor => {
            //overrride for abe
            if (exhibitor.Expo__c == "a1x3A000001FOPe") {
                const cat = exhibitor["exhibitor-cat"];
                if (expo.includes(exhibitor.Expo__c) || cat.includes("Adhesives and Sealants") || cat.includes("Bonding Solutions / Technology Provider")) {
                    return true;
                }
            }
            return expo.includes(exhibitor.Expo__c);
        });
    };
    
    /**
     *
     * @param {Array} exhibitors
     * @param {String} search - String to search each exhibitor for.
     * @returns exhibitors matching containg the search query.
     */
    const searchFilter = (exhibitors, search) => {
        if (search.trim() == "") {
            return exhibitors;
        }
        search = search.toLowerCase();
        return exhibitors.filter(exhibitor => {
            const cats = exhibitor["exhibitor-cat"].toLowerCase();
            const pagetitle = exhibitor.pagetitle.toLowerCase();
            
            const content = exhibitor.content.toLowerCase();
            if (cats.includes(search) || pagetitle.includes(search) || content.includes(search)) {
                return true;
            } else {
                return false;
            }
        });
    };

    /**
     *
     * @param {Array} exhibitors
     * @param {String} letter - Letter to scan the exhib name for.
     * @returns exhibitors with letter matching the title.
     */
    const alphabetFilter = (exhibitors, letter) => {
        letter = letter.toLowerCase();

        if (letter == "show all") {
            return exhibitors;
        }

        return exhibitors.filter(({ pagetitle }) => {
            const name = pagetitle.toLowerCase();

            if (letter == "0-9") {
                return !isNaN(name.charAt(0));
            } else if (letter.match(/[a-z]/i)) {
                //is a letter
                return letter == name.charAt(0);
            } else {
                return true;
            }
        });
    };

    /**
     *
     * @param {Object} options - Main options object
     * @param {Array} expos - Array of expo SF ids.
     * @returns Multi Expo buttons for the side menu.
     */
    const getMultiExpo = (options, expos) => {
        const { ids, multiExpo } = options;

        if (!multiExpo) {
            return null;
        } else {
            let jsx = [];
            ids.forEach(showId => {
                let text;
                let sanitisedShowId = showId.replaceAll("'", "");
                text = getShowNameFromId(sanitisedShowId);
                let newShowButton = (
                    <Cta
                        size="max"
                        curved={false}
                        active={expos.includes(showId)}
                        bonusClass={`rounded control-col__show-filter control-col__show-filter--${sanitisedShowId}`}
                        key={`show-filter-${showId}`}
                        handler={handleSetExpo}
                        role="expo-query"
                        value={showId}>
                        <span>{text}</span>
                        {expos.includes(showId) ? (
                            // get the tick (in shared resources) based on the show
                            <img className="img-fluid" src={`${getSiteFromAcronym(options.show.toLowerCase())}assets/resources/shared/web/apps/exhibman/tick.png`} alt="tick" />
                        ) : null}
                    </Cta>
                );
                jsx = [...jsx, newShowButton];
            });
            return jsx;
        }
    };

    /**
     *
     * @param {Array} exhibitors
     * @param {Array} filters - String array of filter names to run.
     * @param {Object} queries - Queries object.
     * @param {Boolean} multiExpo - Id it a multi expo or not.
     * @returns exhibitos that have passed through all filters.
     */
    const filterExhibitors = (exhibitors, filters,
        //  queries,
          multiExpo) => {
           
        
            // console.log(filters,"filters")
            // console.log(queries,"queries")
            // console.log(multiExpo,"multyy")
          
           
        exhibitors = [...exhibitors]; //Chaning pointer in memory (probs not necessary here tbf).
       
        filters.forEach(filter => {
            //hereeee
            if (filter == "SEARCH") {
                exhibitors = searchFilter(exhibitors, queries.search);
            } else if (filter == "ALPHABET") {
                exhibitors = alphabetFilter(exhibitors, queries.letter);
            }
        });
        if (multiExpo) {
            exhibitors = expoFilter(exhibitors);
            // console.log(multiExpo,"multyyyyy expo")
        }
        
        return exhibitors;
    };

    if (loading) {
        return <Spinner />;
    } else {
        const { multiExpo, filters, show } = options;
        const filteredExhibitors = filterExhibitors(exhibs, filters, queries, multiExpo);
        // console.log(exhibs,"exxxxxxx")
        // console.log(filters,"filters")
        // console.log(queries,"queries")
        // console.log(multiExpo,"multyy")
        // console.log(show,"show")
        // console.log(filteredExhibitors, "filtered")
        const dualLanguageStyles=dualLanguageStyle(show)
     
        setPageTitle(show, "Exhibitor List")
        return (
            <section className={`exhibmanV2 exhibmanV2--${show} row mb-5`}>
               
                <nav className="col-12 col-md-4 control-col">
                    <StickyNav>
                    
                        {/* <div className="control-col__header" style={{dualLanguageDisplay}}> */}
                      <div className="control-col__header" style={dualLanguageStyles.display}> 
                            <h3 style={dualLanguageStyles.h3Style}>
                                <strong>{dualLanguage(show,"Refine Results","Refine Results / Ergebnisse verfeinern")}</strong>
                            </h3>
                            <Cta dualLanguageStylesCTA={dualLanguageStyles.CTAStyle} bonusClass="control-col__reset" handler={handleReset} role="exhib-reset" size="micro" color="black" margin="vertical-margin--0">
                                Clear Filters
                            </Cta>
                        </div>
                        <div className="control-col__search vertical-margin--10">
                            <SearchInput handler={handleSearch} value={queries.search} bonusClass="form-control" placeholder="Refine by Keyword" />
                            {getMultiExpo(options, queries.expo)}
                        </div>
                        {getExtraNavButtons(options, exhibs)}
            
                        <Sponsors
                        show={options}
                        // href={"https://www.ice.it/en/"}
                        // title={"Italy at space Tech Expo Europe"}
                        // src={"./assets/resources/sat/web/images/misc/sponsor/SpaceTech_Side_Banner.jpg"}
                        // src={"./small.jpg"}
                        // alt={"Italy at space Tech Expo Europe"}
                        position={"-left"}
                        displayBanner={""}
                    />
                        
                    </StickyNav>
                </nav>
                <div className="col-md-8 viewport-col ">
                    {/*HIDE THE SECOND BANNER ON MOBILE AND SHOW JUST ONE YO */}
                {window.innerWidth > 768 ?
                    <Sponsors
                        show={options}
                        // href={"https://www.ice.it/en/"}
                        // title={"Italy at space Tech Expo Europe"}
                        // src={"./assets/resources/sat/web/images/misc/sponsor/SpaceTech_Top__Banner.jpg"}
                        // src={"./large.jpg"}
                        // alt={"Italy at space Tech Expo Europe"}
                        position={"-top"}
                        displayBanner={""}
                        
                    /> : ""}
                    <div className="alphabet-filter">
                        <Alphabet activeLetter={queries.letter} handler={handleSetLetter} />
                    </div>
                    <div className="row viewport__header">
                   
                        <h3>
                            <strong>{dualLanguage(show,"Exhibitors A-Z","Exhibitors A-Z / Aussteller von A bis Z")} </strong>
                        </h3>
                    </div>
                    <div className="slide-list">{getSlides(filteredExhibitors)}</div>
                </div>
            </section>
        );
    }
};

// const mapStateToProps = (store, ownProps) => {
//     return store;
// };
// export default connect(mapStateToProps, {
//     // setQueries,
//     // fetchExhibs,
//     // setLoading,
// })(ExhibitorList);
export default ExhibitorList
