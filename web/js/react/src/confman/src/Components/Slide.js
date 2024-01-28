// import React, { useState, useRef } from "react";
// import { connect } from "react-redux";

// /**
//  *
//  * @param {Object} props
//  * @returns Full agenda slide.  One per session.
//  */
// const Slide = props => {
//     let [show, setShow] = useState(false);
//     const bodyRef = useRef();
//     const mainRef = useRef();

//     const { options, session, openSlides: open, windowwidth } = props;
//     const { continent, ondemand } = options;

//     /**
//      * Crap for opening a slide.
//      */
//     const handleClick = event => {
//         //jquery solution (probably not ideal)
//         $(bodyRef.current).collapse("toggle");
//         if ($(bodyRef.current).prev().find(".accordion-button").hasClass("collapsed")) {
//             $(bodyRef.current).prev().find(".accordion-button").removeClass("collapsed");
//             $(mainRef.current).removeClass("session--collapsed");
//             $(mainRef.current).addClass("session--show");
//         } else {
//             $(bodyRef.current).prev().find(".accordion-button").addClass("collapsed");
//             $(mainRef.current).removeClass("session--show");
//             $(mainRef.current).addClass("session--collapsed");
//         }
//     };
//     const getHeadShot = headshot => (headshot ? headshot : "./assets/resources/shared/web/apps/confman/silhouette.png");

//     const getCompany = company => (company ? company : "./assets/resources/shared/web/apps/confman/coming-soon.jpg");

//     /**
//      *
//      * @param {Object} timeObj - object containing hour, minute, enum for am/pm.
//      * @returns The time format for the slide.
//      */
//     const getTime = timeObj => {
//         let { minute, hour, ampm } = timeObj;
//         if (continent == "USA") {
//             if (ampm == "PM") {
//                 if (hour != 12) {
//                     hour = hour - 12;
//                 }
//             }
//             return `${hour}.${minute}${ampm}`;
//         } else {
//             return `${hour}:${minute}`;
//         }
//     };

//     /**
//      *
//      * @returns The speaker bit of the session.
//      */
//     const getSpeakers = () => {
//         // function in a function
//         let getSpeaker = (speaker, index = -1) => {
//             const {
//                 Id,
//                 First_Name__c,
//                 Prefix__c,
//                 Last_Name__c,
//                 Title__c,
//                 Job_Title__c,
//                 Company__c,
//                 Presentation_Slides_PDF_link__c,
//                 Logo_URL__c,
//                 Head_Shot_URL__c,
//                 Speaker__r,
//             } = speaker;

//             const { web_logo_url__c } = Speaker__r;

//             return (
//                 <div key={`speaker-${index}`} className={`row speakers__speaker`} id={Id}>
//                     {Title__c != null ? <h3 className="speaker__presentation-name">{Title__c}</h3> : null}
//                     {windowwidth > 992 ? (
//                         <div className="col-3 speaker__headshot">
//                             <img className="img-fluid" src={getHeadShot(Head_Shot_URL__c)} alt={`${First_Name__c} ${Last_Name__c}`} />
//                         </div>
//                     ) : (
//                         ""
//                     )}
//                     <div className={`col-${windowwidth > 992 ? "5" : "12"} speaker__info`}>
//                         <h4 className="speaker__info__name">{`${Prefix__c != null ? `${Prefix__c} ` : ""}${First_Name__c} ${Last_Name__c}`}</h4>
//                         <h4 className="speaker__info__job-title">{`${Job_Title__c}`}</h4>
//                         <h4 className="speaker__info__company">{`${Company__c}`}</h4>
//                         {ondemand && Presentation_Slides_PDF_link__c ? (
//                             <h3 className="speaker__info__presentation">
//                                 <i>
//                                     Download the presentation{" "}
//                                     <a href={Presentation_Slides_PDF_link__c} target="_blank" download>
//                                         here
//                                     </a>
//                                 </i>
//                             </h3>
//                         ) : (
//                             ""
//                         )}
//                     </div>
//                     {windowwidth > 992 ? (
//                         <div className="col-4 speaker__company">
//                             <img className="img-fluid" src={getCompany(web_logo_url__c)} alt={`${Company__c}`} />
//                         </div>
//                     ) : (
//                         ""
//                     )}
//                 </div>
//             );
//         };
//         if (session.presentations.length < 1) {
//             return;
//         }
//         let presentations = [...session.presentations];
//         let hasModerator = !!presentations.find(speaker => speaker.Roll__c == "Moderator");
//         let moderator;
//         if (hasModerator) {
//             moderator = presentations.find(speaker => speaker.Roll__c === "Moderator");
//             presentations.splice(presentations.indexOf(moderator), 1);
//             moderator = getSpeaker(moderator);
//         }
//         let speakers = presentations.map((speaker, index) => getSpeaker(speaker, index)); //Use the above function to map a presentation to jsx.

//         return (
//             <>
//                 {hasModerator ? (
//                     <>
//                         <h3>Moderator</h3>
//                         {moderator}
//                         <h3>Speakers</h3>
//                         {speakers}
//                     </>
//                 ) : (
//                     <>
//                         <h3>Speakers</h3>
//                         {speakers}
//                     </>
//                 )}
//             </>
//         );
//     };

//     const { Track_Number__c, Day__c, Type__c, Id, Sponsor_URL__c, normalTime, Long_Name__c, Vimeo_Video_Link__c, Synopsis__c } = session;
//     return (
//         <div
//             className={`body__session accordion-item session--track-${Track_Number__c} session--day-${Day__c} session--type-${Type__c} session--${
//                 open ? "show" : "collapsed"
//             }`}
//             id={Id.toLowerCase()}
//             ref={mainRef}>
//             <div
//                 className="session__anchor"
//                 style={
//                     windowwidth > 992
//                         ? {
//                               marginTop: "-250px",
//                               height: "250px",
//                               zIndex: "-1",
//                           }
//                         : { marginTop: "-150px", height: "150px" }
//                 }></div>
//             <div className="row">
//                 <div className={`col-${windowwidth > 992 ? "2" : "3"} session__flag`}>
//                     <h3>{getTime(normalTime)}</h3>
//                 </div>
//                 <div className={`col-${windowwidth > 992 ? "10" : "9"} session__content`}>
//                     {Type__c == "Break" ? (
//                         <>
//                             <div className="accordion-header session__title">
//                                 <button className={`accordion-button`} type="button">
//                                     <div className={Sponsor_URL__c ? "session--sponsored" : ""}>
//                                         <div className="session__meta">
//                                             <h3 className="session__name">{Long_Name__c}</h3>
//                                             {/*<p className="session__time">{this.getTime(session.normalTime)}</p>*/}
//                                         </div>
//                                         {Sponsor_URL__c ? (
//                                             <div className="session__sponsor">
//                                                 <p>
//                                                     <i>Sponsored by: </i>
//                                                 </p>
//                                                 <img className="img-fluid" src={Sponsor_URL__c} alt="Sponsor" />
//                                             </div>
//                                         ) : (
//                                             ""
//                                         )}
//                                     </div>
//                                 </button>
//                             </div>
//                         </>
//                     ) : (
//                         <>
//                             <div className="accordion-header session__title" onClick={handleClick}>
//                                 <button className={`accordion-button ${!open ? "collapsed" : ""}`} type="button">
//                                     <div className={Sponsor_URL__c ? "session--sponsored" : ""}>
//                                         <div className="session__meta">
//                                             <h3 className="session__name">{Long_Name__c}</h3>
//                                         </div>
//                                         {Sponsor_URL__c ? (
//                                             <div className="session__sponsor">
//                                                 <p>
//                                                     <i>Sponsored by: </i>
//                                                 </p>
//                                                 <img className="img-fluid" src={Sponsor_URL__c} alt="Sponsor" />
//                                             </div>
//                                         ) : (
//                                             ""
//                                         )}
//                                     </div>
//                                 </button>
//                             </div>
//                             <div ref={bodyRef} className={`accordion-collapse collapse session__body ${open ? "show" : "collapsed"}`}>
//                                 <div className="accordion-body">
//                                     {ondemand && Vimeo_Video_Link__c ? (
//                                         <div className="body__video">
//                                             <iframe
//                                                 src={Vimeo_Video_Link__c}
//                                                 frameborder="0"
//                                                 allow="autoplay; fullscreen; picture-in-picture"
//                                                 allowfullscreen=""></iframe>
//                                         </div>
//                                     ) : (
//                                         ""
//                                     )}
//                                     <div
//                                         className="body__synopsis"
//                                         dangerouslySetInnerHTML={{
//                                             __html: Synopsis__c,
//                                         }}></div>
//                                     <div className="body__speakers">{getSpeakers()}</div>
//                                 </div>
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// const mapStateToProps = (store, ownProps) => {
//     return { ...store, session: ownProps.session };
// };
// export default connect(mapStateToProps, {})(Slide);


import React, { useState, useRef } from "react";
import { connect,useSelector } from "react-redux";
// import GetShowLogos from "../Utils/getShowLogos";
/**
 *
 * @param {Object} props
 * @returns Full agenda slide.  One per session.
 */
const Slide = props => {
    let [show, setShow] = useState(false);
    const bodyRef = useRef();
    const mainRef = useRef();
    const options=useSelector(state=>state.options)
    const state=useSelector(state=>state)
    const open=useSelector(state=>state.openSlides)
    // const session=useSelector(state=>state.session)
    //console.log("state",state)
    const {  
        session,
        //  openSlides:open, 
         windowwidth } = props;
    const { continent, ondemand } = options;

    /**
     * Crap for opening a slide.
     */
    const handleClick = event => {
        // console.log("props",props)
        // console.log("open",open)
        // console.log("session",session)
        // console.log("session2",session2)
       
        // console.log("state",state)
        //jquery solution (probably not ideal)
        $(bodyRef.current).collapse("toggle");
        if ($(bodyRef.current).prev().find(".accordion-button").hasClass("collapsed")) {
            $(bodyRef.current).prev().find(".accordion-button").removeClass("collapsed");
            $(mainRef.current).removeClass("session--collapsed");
            $(mainRef.current).addClass("session--show");
        } else {
            $(bodyRef.current).prev().find(".accordion-button").addClass("collapsed");
            $(mainRef.current).removeClass("session--show");
            $(mainRef.current).addClass("session--collapsed");
        }
    };
    const getHeadShot = headshot => (headshot ? headshot : "./assets/resources/shared/web/apps/confman/silhouette.png");

    const getCompany = company => (company ? company : "./assets/resources/shared/web/apps/confman/coming-soon.jpg");

    /**
     *
     * @param {Object} timeObj - object containing hour, minute, enum for am/pm.
     * @returns The time format for the slide.
     */
    const getTime = timeObj => {
        let { minute, hour, ampm } = timeObj;
        if (continent == "USA") {
            if (ampm == "PM") {
                if (hour != 12) {
                    hour = hour - 12;
                }
            }
            return `${hour}.${minute}${ampm}`;
        } else {
            return `${hour}:${minute}`;
        }
    };

    /**
     *
     * @returns The speaker bit of the session.
     */
    const getSpeakers = () => {
        // function in a function
        let getSpeaker = (speaker, index = -1) => {
            const {
                Id,
                First_Name__c,
                Prefix__c,
                Last_Name__c,
                Title__c,
                Job_Title__c,
                Company__c,
                Presentation_Slides_PDF_link__c,
                Logo_URL__c,
                Head_Shot_URL__c,
                Speaker__r,
            } = speaker;

            const { web_logo_url__c } = Speaker__r;

            return (
                <div key={`speaker-${index}`} className={`row speakers__speaker`} id={Id}>
                    {Title__c != null ? <h3 className="speaker__presentation-name">{Title__c}</h3> : null}
                    {windowwidth > 992 ? (
                        <div className="col-3 speaker__headshot">
                            <img className="img-fluid" src={getHeadShot(Head_Shot_URL__c)} alt={`${First_Name__c} ${Last_Name__c}`} />
                        </div>
                    ) : (
                        ""
                    )}
                    <div className={`col-${windowwidth > 992 ? "5" : "12"} speaker__info`}>
                        <h4 className="speaker__info__name">{`${Prefix__c != null ? `${Prefix__c} ` : ""}${First_Name__c} ${Last_Name__c}`}</h4>
                        <h4 className="speaker__info__job-title">{`${Job_Title__c}`}</h4>
                        <h4 className="speaker__info__company">{`${Company__c}`}</h4>
                        {ondemand && Presentation_Slides_PDF_link__c ? (
                            <h3 className="speaker__info__presentation">
                                <i>
                                    Download the presentation{" "}
                                    <a href={Presentation_Slides_PDF_link__c} target="_blank" download>
                                        here
                                    </a>
                                </i>
                            </h3>
                        ) : (
                            ""
                        )}
                    </div>
                    {windowwidth > 992 ? (
                        <div className="col-4 speaker__company">
                            <img className="img-fluid" src={getCompany(web_logo_url__c)} alt={`${Company__c}`} />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            );
        };
        if (session.presentations.length < 1) {
            return;
        }
        let presentations = [...session.presentations];
        let hasModerator = !!presentations.find(speaker => speaker.Roll__c == "Moderator");
        let moderator;
        if (hasModerator) {
            moderator = presentations.find(speaker => speaker.Roll__c === "Moderator");
            presentations.splice(presentations.indexOf(moderator), 1);
            moderator = getSpeaker(moderator);
        }
        let speakers = presentations.map((speaker, index) => getSpeaker(speaker, index)); //Use the above function to map a presentation to jsx.

        return (
            <>
                {hasModerator ? (
                    <>
                        <h3>Moderator</h3>
                        {moderator}
                        <h3>Speakers</h3>
                        {speakers}
                    </>
                ) : (
                    <>
                        <h3>Speakers</h3>
                        {speakers}
                    </>
                )}
            </>
        );
    };

    const { Track_Number__c, Day__c, Type__c, Id, Sponsor_URL__c, normalTime, Long_Name__c, Vimeo_Video_Link__c, Synopsis__c,Categories__c } = session;
    return (
        <div
            className={`body__session accordion-item session--track-${Track_Number__c} session--day-${Day__c} session--type-${Type__c} session--${
                open ? "show" : "collapsed"
            }`}
            id={Id.toLowerCase()}
            ref={mainRef}>
            <div
                className="session__anchor"
                style={
                    windowwidth > 992
                        ? {
                              marginTop: "-250px",
                              height: "250px",
                              zIndex: "-1",
                          }
                        : { marginTop: "-150px", height: "150px" }
                }></div>
                
            <div className="row">
                <div className={`col-${windowwidth > 992 ? "2" : "3"} session__flag`}>
                    <h3>{getTime(normalTime)}</h3>
                </div>
                <div className={`col-${windowwidth > 992 ? "10" : "9"} session__content`}>
                    {Type__c == "Break" ? (
                        <>
                            <div className="accordion-header session__title">
                                <button className={`accordion-button`} type="button">
                                    <div className={Sponsor_URL__c ? "session--sponsored" : ""}>
                                    {Categories__c}
                                        <div className="session__meta">
                                   
                                        {/* if (Long_Name__c.search("Adhesive")!== -1){<img src="https://www.adhesivesandbondingexpo-europe.com/assets/resources/shared/images/logos/adhesives-and-management-expo-europe.png" className="session__img img-fluid"/>} */}
                                            <h3 className="session__name">{Long_Name__c}</h3>
                                            {/*<p className="session__time">{this.getTime(session.normalTime)}</p>*/}
                                        </div>
                                        {Sponsor_URL__c ? (
                                            <div className="session__sponsor">
                                                <p>
                                                    <i>Sponsored by: </i>
                                                </p>
                                                <img className="img-fluid" src={Sponsor_URL__c} alt="Sponsor" />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="accordion-header session__title" onClick={handleClick}>
                                <button className={`accordion-button ${!open ? "collapsed" : ""}`} type="button">
                                    <div className={Sponsor_URL__c ? "session--sponsored" : ""}>
                                        <div className="session__meta">
                                        {Categories__c}
                                        {/* { Long_Name__c.search("Adhesive")  !== -1 ?( <img src="https://www.adhesivesandbondingexpo-europe.com/assets/resources/shared/images/logos/adhesives-and-management-expo-europe.png" className="session__img img-fluid"/>) :( "")} */}
                                        
                                            <h3 className="session__name">{Long_Name__c}</h3>
                                        </div>
                                        {Sponsor_URL__c ? (
                                            <div className="session__sponsor">
                                                <p>
                                                    <i>Sponsored by: </i>
                                                </p>
                                                <img className="img-fluid" src={Sponsor_URL__c} alt="Sponsor" />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </button>
                            </div>
                            <div ref={bodyRef} className={`accordion-collapse collapse session__body ${open ? "show" : "collapsed"}`}>
                                <div className="accordion-body">
                                {/* <GetShowLogos text={Synopsis__c}/> */}
                                {/* { Synopsis__c.search("PLENARY")  !== -1 ?( <img src="https://www.adhesivesandbondingexpo-europe.com/assets/resources/shared/images/logos/adhesives-and-management-expo-europe.png" className="session__img img-fluid"/>) :( "noooo")} */}
                                    {ondemand && Vimeo_Video_Link__c ? (
                                        <div className="body__video">
                                            <iframe
                                                src={Vimeo_Video_Link__c}
                                                frameborder="0"
                                                allow="autoplay; fullscreen; picture-in-picture"
                                                allowfullscreen=""></iframe>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    <div
                                        className="body__synopsis"
                                        dangerouslySetInnerHTML={{
                                            __html: Synopsis__c,
                                        }}></div>
                                    <div className="body__speakers">{getSpeakers()}</div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// const mapStateToProps = (store, ownProps) => {
//     return { ...store, session2: ownProps.session };
// };
// export default connect(mapStateToProps, {})(Slide);

// const mapStateToProps = (store, ownProps) => {
//     return { ...store};
// };
// export default connect(mapStateToProps, {})(Slide);
export default Slide



