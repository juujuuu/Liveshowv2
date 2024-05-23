import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import Body from "../../../common_components/Body";
import Cta from "../../../common_components/Cta";
import Spinner from "../../../common_components/Spinner";
import StickyNav from "../../../common_components/StickyNav";
//to re add 
// import SearchInput from "../../../common_components/SearchInput";
//to removed 
import SearchInput from "../Components/SearchInput";

import MainNav from "./MainNav";
import MainNavButton from "./MainNavButton";
import Slide from "./Slide";
import CheckBoxFilter from "./CheckBoxFilter";

import getConfPdfLink from "../Utils/getConfPdf";
import { getSiteFromAcronym } from "../Utils/getSite";
import { getShowNameFromAcronym } from "../Utils/getSite";

import {
    fetchConference,
    setLoading,
    setOpenSlides,
    setDay,
    setTrack,
    setLetter,
    setDealtWithInitialParams,
    setQuery,
    resetFiltersAction,
    setError,
    setLowestDay,
    setShow,
    setFirstLoad
} from "../Actions";
import getModal from "../Utils/getModal";
import { getOnDemandCode } from "../Utils/getOnDemand";
import getUIThemes from "../Utils/getUIThemes";

/**
 * @param {object} props
 * @returns The full agenda
 */
const FullAgenda = props => {
    const {
        // loading,
        // fetchConference,
        // sessions,
        // options,
        // setLoading,
        // setQuery,
        // setLetter,
        // setDay,
        // setTrack,
        // maxTracks,
        // maxDays,
        // openSlides,
        // dealtWithInitialParams,
        // setDealtWithInitialParams,
        // setOpenSlides,
        // filters,
        // setError,
        // resetFiltersAction,
        // lowestDay,
    } = props;


    //     const setOpenSlidesSelector=useSelector(state=>state.setOpenSlides)
    //     const setOpenSlidesDispatch=dispatch(setOpenSlides)

    //     const setDaySelector=useSelector(state=>state.filters.day)
    //     const setTrackSelector=useSelector(state=>state.filters.track)
    //     const valueQuery=useSelector(state=>state.filters.query)
    // const state=useSelector(state=>state)
    // const [shows, setShows] = useState()
    const dispatch = useDispatch()
    const options = useSelector(state => state.options)
    const sessions = useSelector(state => state.sessions)
    const maxDays = useSelector(state => state.maxDays)
    const lowestDay = useSelector(state => state.lowestDay)
    const filters = useSelector(state => state.filters)
    const openSlides = useSelector(state => state.openSlides)
    const dealtWithInitialParams = useSelector(state => state.dealtWithInitialParams)
    const loading = useSelector(state => state.loading)
    const maxTracks = useSelector(state => state.maxTracks)
    const maxShows = useSelector(state => state.maxShows)
    const setShowNames = useSelector(state => state.filters.show)
    const state = useSelector(state => state)
    const firstLoadShows = useSelector(state => state.filters.firstLoad)

    const {
        conf,
        show,
        convincepdf,
        downloadagenda,
        reglink,
        reginterest,
        additionalfilters,
        generalenquiry,
        topNav,
        daynameoverride,
        ondemand,
        continent,
        parameters,
        hideTrackButtons,
        extraMode,
        hideDownloadLink,
        mode
    } = options;

    //Run after Component mount and first render
    useEffect(() => {
        if (loading) {
            //If loading run set conference action.  On complete set loading to false
            dispatch(fetchConference(getSiteFromAcronym(show), conf)).then(response => {
                dispatch(setLoading(false));
                //set first time the shows types are loaded and set it to false 
                // dispatch(setFirstLoad(false));

            });
            dispatch(setDay(0)); //Day 0 is basically 'display all days' here


            //Bring up the on demandmodal if we're in ondemand
            if (ondemand) {
                getModal({ role: "on-demand-modal", odcode: getOnDemandCode(show) });
            }
        }
    }, []);

    //Run when loading changes.
    useEffect(() => {



        //!The code for zapping to a session if the id is a url param.
        let setId, elementParent, elementChild, cleanedId, cleanedDayChunk, getDashPosition

        // Split the pathname by '/' to get an array of parts
        const hash = window.location.hash;

        if (hash) {
            // Remove the '#' symbol
            const idFromHash = hash.slice(1);

            // Remove the '/' symbol
            const slicedURL = idFromHash.replace(/\//g, '');
            // Get position on - to slice the day
            getDashPosition = slicedURL.lastIndexOf("-");

            //  this triggers only if a day has been passed in the 
            if (getDashPosition !== -1) {

                // slice the day with -1
                const dayChunk = slicedURL.slice(getDashPosition);

                // slice the day 1 without -
                cleanedDayChunk = dayChunk.slice(1)

                //get the cleaned id with no day
                cleanedId = slicedURL.slice(0, getDashPosition)
            }

            setId = cleanedId;

            const scrollToElement = () => {
                // Get the element by ID

                if (hash) {
                    elementParent = document.getElementById(setId);
                    elementChild = document.querySelector(`#${setId} .accordion-button`)
                }  
                 // Scroll to the element and click if it exists
                if (elementParent && elementChild) {
                    elementChild.click()
                    elementChild.scrollIntoView({ behavior: "smooth" });
                }
            };

          scrollToElement();

 }




        
        if (!dealtWithInitialParams && !loading) {

            //If we can find a session id param.
            
            if (parameters.find(param => param[0] == "session-id")) {
                const [name, sessionId] = parameters.find(param => param[0] == "session-id"); //destructure param name and value

                try {

                    const sessionDay = sessions.find(_session => _session.Id.toLowerCase() === sessionId.toLowerCase()).Day__c;
                    dispatch(setDay(sessionDay));
                    setDealtWithInitialParams(true);
                    dispatch(setOpenSlides(true));

                    // !NOT SURE WHAT THIS IS FOR 
                    // setTimeout(() => {
                    //     const el = document.querySelector(`#${sessionId.toLowerCase()} .session__anchor`);
                    //     console.log(el,"el")
                    //     el.scrollIntoView({ behavior: "smooth" });
                    // }, 0);


                } catch (error) {
                    console.error("Problem trying to load session param", error);
                    dispatch(setError(true));
                }
            } else if (parameters.find(([name, value]) => name == "track")) {
                const [name, value] = parameters.find(([name, value]) => name === "track"); //destructure param name and value


                try {
                    const track = parseInt(value);
                    switch (track) {
                        case 1:
                            dispatch(setTrack([2, 3]));
                            break;
                        case 2:
                            dispatch(setTrack([1, 3]));
                            break;
                        case 3:
                            dispatch(setTrack([1, 2]));
                            break;
                        default:
                            break;
                    }
                    if (show === "BRE") {
                        dispatch(setDay(lowestDay));
                    }
                    dispatch(setDealtWithInitialParams(true));
                } catch (error) {
                    console.error("Problem trying to load track", error);
                    dispatch(setError(true));
                }
            }
        } else {
            /*No one can make their mind up about how logic on these should work so good luck lol !!! ngula a mammt!!!!
 
             This logic will not set the lowest day , so those show undrneath won't have the active day on load and will show
             all the sessions. THEREFORE, THE TOP BAR WITH DAYS WILL not SHOW THE active FIRST DATE on load ,
             guessing, it s designed for one long list with just the check button (or filtering by tracks or by date), when this happens
             hide the tot date bar*/
            if (show !== "SPC" && show !== "NZB") {

                //Default if there aren't any extra params.  Just set the day to the lowest one in the data
                if (getDashPosition == -1 || !hash) {

                    dispatch(setDay(lowestDay));
                }
                else {

                    dispatch(setDay(parseInt(cleanedDayChunk)));
                }




            }
        }
    }, [loading]);

    /**
     *
     * @param {Number} numberOfDays - How many days in the conference.
     * @param {Number} lowestDay - Again, no one can make their minds up, some sf conferences start on day 2 etc.
     * @returns numberOfDays number of day buttons.  Empty fragment if none.
     */
    const getDayButtons = (numberOfDays, lowestDay) => {
        let colNum = 12 / (numberOfDays - (lowestDay - 1)); //How many bootstrap columns should one of these buttons occupy.
        let index = 0;
        let otherIndex = 0;
        let dayButtons = [];
        console.log(state)
        for (index = lowestDay; index <= numberOfDays; index++) {
            dayButtons.push(
                <div key={index} className={` col-${colNum}`}>
                    {/* { console.log(index,"index",filters.day)} */}
                    <MainNavButton options={options} key={`day-button-${index}`} active={filters.day === index} value={index} handler={setDay}>
                        {/* {daynameoverride == undefined || window.innerWidth < 992
							? `Day ${index + 1}`
							: `Day ${index + 1} - ${daynameoverride[index]}`} */}
                        {daynameoverride[otherIndex]}
                    </MainNavButton>
                </div>
            );
            otherIndex++;
        }
        return <>{dayButtons}</>;
    };

    /**
     * Similar to the above.
     * @param {Number} numberOfTracks - How many tracks in the conference.
     * @returns An array of checkbox filters
     */


    const getTrackButtons = numberOfTracks => {

        if (!hideTrackButtons) {
            let i = 0;
            let buttons = [];
            for (i = 0; i < numberOfTracks; i++) {
                let trackName = sessions.find(session => session.Track_Number__c == i + 1).Track_Long_Title__c;
                buttons.push(
                    <CheckBoxFilter
                        name={trackName}
                        inputClass={`track-${i + 1}`}
                        handler={setTrack}
                        value={i + 1}
                        key={`checkboxfilter ${i + 1}`}
                        checked={!filters.track.includes(i + 1)}
                    />
                );
            }

            return <>{buttons}</>;
        } else {
            return null;
        }
    };
    /**
        * Similar to the above.
        * @param {Number} showName for multy expo .
        * @returns An array of checkbox filters
        */




    /**MULTY EXPOS OPTION - CREATING BUTTONS
    * looping through maxShows (the simplified array to create single button-filters for the shows)  */
    const getShowButtons = showVariants => {


        //hideTrack is not actually set ... 
        if (!hideTrackButtons) {
            let i = 0;
            let buttons = [];


            for (i = 0; i < showVariants.length; i++) {
                //  let trackName = sessions.find(session => session.showName== i + 1);
                //let showName = sessions[i].Categories__c;

                buttons.push(
                    <CheckBoxFilter
                        name={getShowNameFromAcronym(showVariants[i])}
                        inputClass={showVariants[i]}
                        handler={setShow}
                        value={showVariants[i]}
                        key={`checkboxfilter ${i + 1}`}
                        checked={filters.show.includes(showVariants[i])}

                    />
                );
            }
            return <>{buttons}</>;
        } else {
            return null;
        }
    };


    /**
     *
     * @param {Array} data - Sessions array.
     * @returns An array of data.length size containing Slide components.
     */

    const getSlides = data => {

        if (data == null || data < 1) {

            return (
                <div className="conference-agenda__sessions sessions--error-message">

                    <h2>No sessions found</h2>

                </div>)
        }
        else if (data.length > 0) {
            let slides = data.map((session, index) => <Slide session={session} windowwidth={window.innerWidth} key={`slide-${index + 1}`} />);
            return (
                <div className="accordion accordion-flush conference-agenda__sessions" id="conference-agenda__sessions">
                    {slides}
                </div>
            );
        }
        else {
            // return (
            //     <div className="conference-agenda__sessions sessions--error-message">

            //         <h2>No sessions found</h2>

            //     </div>
            // );
        }
    };

    const resetFilters = () => {
        //     dispatch(setOpenSlides(false));
        // runFilters(sessions)
        // alert("hey")
        //     dispatch(resetFiltersAction({ track: [], day: lowestDay, query: "", letter: -1 }));
        //    alert("hey")
        //     document.getElementById("confman__search").value = "";
    };

    /**
     *
     * @param {Array} inputSessions
     * @returns inputSessions with days not matching the current day removed.
     */
    const filterDays = inputSessions => {
        const { day } = filters;
        if (day !== 0) {
            return inputSessions.filter(session => day === session.Day__c);

        } else {
            return inputSessions;
        }
    };

    /**
     *
     * @param {Array} inputSessions
     * @returns inputSessions with sessions with a Track_Number__c matching anything in the track filters array removed.
     */
    const filterTracks = inputSessions => {
        const { track: excludeTracks } = filters; //Renaming track from filters to excludeTracks.
        if (excludeTracks.length > 0) {
            return inputSessions.filter(session => !excludeTracks.includes(session.Track_Number__c)); //if excludeTracks array isn't empty, remove sessions matching any track number in the array.
        } else {
            return inputSessions;
        }
    };
    /**
 *
 * @param {Array} inputSessions
 * @returns inputSessions with sessions with a Track_Number__c matching anything in the track filters array removed.
 */
    /**MULTY EXPOS OPTION
    *CREATING THE LOGIC TO FILTER THE SESSIONS AGAINST THE ARRAY [STATE.FILTERS.SHOWS] 
    WHICH GETS UPATED EVERY TIME A BUTTONS IS CLICKED
    * */


    const filtershows = inputSessions => {
        /**Renaming show from filters to excludeShows.
         * this contains the all array of shows 
        */
        const { show: excludeShows } = filters;

        if (excludeShows.length > 0) {


            if (firstLoadShows) {
                /** AFTER THE FIRST LOAD, FIRSTlOAD  IS SET TO FALSE
                 * AMD MAKES THIS RUN JUST THE FIRST TIME
                 * RETURNS ALL THE SESSIONS WITH  CATEGORY__C NOT NULL  
                 * AND WORKS ONLY FOR MUSLTY EXPO
                 */
                let newInputSession = []
                inputSessions.forEach(sess => {
                    excludeShows.forEach(el => {
                        if (sess.Categories__c === el) {

                            newInputSession.push(sess)

                        }

                    })

                });
                return newInputSession
            }
            else {
                /** AFTER THE FIRST LOAD *FIRSTLOAD IS SET TO FALSE 
                 * AND THIS WILL RUN EVERY TIME 
                 */
                let newInputSession = []

                /** WILL COMPARE excludeShows AGAINST element.Categories__c FO THE SESSION AND 
                 * PUSHES ONLY THE SESSIONS ONE WITH THE SAME VALUE IN THE ARRAY 
                 */
                inputSessions.forEach(element => {

                    excludeShows.forEach(el2 => {

                        if (element.Categories__c === el2) {

                            newInputSession.push(element)

                        }

                    })

                });


                return newInputSession


            }

        }


    };

    /**
     *
     * @param {Array} inputSessions
     * @returns inputSessions filtered by query.
     */
    const filterQuery = inputSessions => {
        let { query } = filters;
        query = query.toLowerCase(); //change to lowercase
        //Don't bother if query is empty
        if (query !== "") {
            //Check session
            return inputSessions.filter(session => {
                let { Long_Name__c: sessionName, Synopsis__c: sessionSynopsis, presentations } = session; //Check these properties on the session with the query string
                sessionName = sessionName.toLowerCase();
                sessionSynopsis = sessionSynopsis.toLowerCase();
                if (sessionName.includes(query) || sessionSynopsis.includes(query)) {
                    return true;
                }
                //Check Presentation
                if (presentations.length > 0) {
                    const found = presentations.find(presentation => {
                        let { Company__c, First_Name__c, Last_Name__c } = presentation;
                        Company__c = Company__c.toLowerCase();
                        First_Name__c = First_Name__c.toLowerCase();
                        Last_Name__c = Last_Name__c.toLowerCase();
                        if (Company__c.includes(query) || First_Name__c.includes(query) || Last_Name__c.includes(query)) {
                            return true;
                        }
                    });
                    return found !== undefined;
                }
                return false;
            });
        } else {
            return inputSessions;
        }
    };

    /**
     *
     * @param {Array} inputSessions
     * @returns inputSessions where consecutive breaks are removed.
     */
    const filterBreaks = inputSessions => {
        inputSessions = [...inputSessions];
        //Stop break sessions from stacking up
        for (let index = 0; index < inputSessions.length; index++) {
            const session = inputSessions[index];
            if (index + 1 < inputSessions.length) {
                if (session.Type__c == "Break") {
                    if (inputSessions[index + 1].Type__c == "Break" && inputSessions[index].Start_Time__c == inputSessions[index + 1].Start_Time__c) {
                        inputSessions = inputSessions.filter((inputSession, _index) => _index !== index);
                    }
                }
            }
        }
        return inputSessions;
    };

    const runFilters = inputSessions => {
        inputSessions = [...inputSessions];
        inputSessions = filterDays(inputSessions);
        inputSessions = filterTracks(inputSessions);
        inputSessions = filterQuery(inputSessions);
        inputSessions = filterBreaks(inputSessions);
        //**MULTY-EXPO OPTION - ONLY RUN IF THE SHOW IS ONE OF THOSE  */

        // if ((show == "ABE" || show == "FME" || show == "TEE") &&  extraMode!=="innovation-agenda" ) {
        if (show == "ABE" || show == "FME" || show == "TEE" || show == "FMX" || show == "ABX") {
            inputSessions = filtershows(inputSessions)
        }
        return inputSessions;
    };

    const getAltConferenceButton = (show, extraMode) => {
        switch (show) {
            case "FMX":
            case "ABX":
                if (extraMode === "innovation-agenda") {
                    return (
                        <Cta key="cta main agenda link"
                            curved={false}
                            color={show === "FMX" ? "fmx-blue" : "abx-blue"}
                            link="../conference/conference-agenda"
                            bonusClass="rounded">
                            CONFERENCE AGENDA
                        </Cta>
                    );
                } else {
                    return (
                        <Cta key="cta innovation link"
                            curved={false}
                            color="solutions-blue"
                            link="../conference/solutions-innovation-stage"
                            bonusClass="rounded">
                            SOLUTIONS INNOVATION STAGE
                        </Cta>
                    );
                }
            case "FME":
            case "ABE":
            case "TEE":
                if (extraMode === "innovation-agenda") {
                    let color

                    if (show === "FME") { color = "fme-orange" } else if (show === "ABE") { color = "abe-dark-blue" } else { color = "tee-blue" }
                    return (
                        <Cta key="cta main agenda link"
                            curved={false}
                            color={color}
                            link="../conference/conference-agenda"
                            bonusClass="rounded">
                            CONFERENCE AGENDA
                        </Cta>
                    );
                } else {
                    return (
                        <Cta key="cta innovation link"
                            curved={false}
                            color="solutions-blue-FME-ABE-TEE"
                            link="../conference/solutions-innovation-stage"
                            bonusClass="rounded">
                            SOLUTIONS INNOVATION STAGE
                        </Cta>
                    );
                }
        }
    };

    const getAltConferenceString = (show, extraMode) => {
        let string
        switch (show) {
            case "FMX":
            case "ABX":
                if (extraMode == "innovation-agenda") {
                    string = "innovation-stage";


                } else {
                    string = "ooo";



                }
                return string;

            case "FME":
            case "ABE":
            case "TEE":
                if (extraMode === "innovation-agenda") {
                    return "innovation-stage";
                }
                return false;
            default:
                throw ("getAltConferenceString error: ", extraMode, show);
        }
    };

    /**
     *
     * @returns The tracks section (the bit with the checkboxes).
     */
    // console.log(state)
    const getTracksNav = () => {
        //Very annoying button for extra conference on some in this bit
        const cols = show === "FMX" || show === "ABX" || show === "FME" || show === "ABE" || show === "TEE" ? [6, 6] : [9, 3];
        //Desktop or mobile?
        if (window.innerWidth > 992) {
            return (
                <div className="container">
                    <div className="row">
                        <div className={`col-${cols[0]} track-col`}>{getTrackButtons(maxTracks)}</div>


                        <div className={`col-${cols[1]} control-col`}>
                            <Cta
                                key="cta expand"
                                curved={false}
                                active={openSlides}
                                color="primary"
                                bonusClass="confman-expand rounded"
                                handler={setOpenSlides}
                                role="expand"
                                value={true}>
                                Expand all
                            </Cta>
                            <Cta
                                key="cta collapse"
                                curved={false}
                                active={!openSlides}
                                color="primary"
                                bonusClass="confman-expand rounded"
                                handler={setOpenSlides}
                                role="collapse"
                                value={false}>
                                Collapse all
                            </Cta>
                            {show === "FMX" || show === "ABX" || show === "FME" || show === "ABE" || show === "TEE" ? getAltConferenceButton(show, extraMode) : null}
                        </div>
                        {/* extra buttons for filtering ABE FME TEE*/}
                        {(show == "FME" ||
                            show == "TEE" ||
                            show == "ABE" ||
                            show == "FMX" ||
                            show == "ABX")
                            ?
                            <div className={`col-12 track-col border-top border-light`}>{getShowButtons(maxShows)}</div>
                            : null}
                    </div>
                </div>
            );
        } else {
            return (
                <>
                    <div className="container-fluid tracks__mob-control">
                        <div className="row">

                            <div className="col-12 control-col">
                                <Cta
                                    key="cta expand"
                                    curved={false}
                                    active={openSlides}
                                    color="primary"
                                    bonusClass="confman-expand rounded"
                                    handler={setOpenSlides}
                                    role="expand"
                                    value={true}>
                                    Expand all
                                </Cta>
                                <Cta
                                    key="cta collapse"
                                    curved={false}
                                    active={!openSlides}
                                    color="primary"
                                    bonusClass="confman-expand rounded"
                                    handler={setOpenSlides}
                                    role="collapse"
                                    value={false}>
                                    Collapse all
                                </Cta>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid tracks__mob-tracks">
                        <div className="row ">
                            <div className="col-12 track-col  justify-content-between">
                                {show === "FMX" || show === "ABX" || show === "ABE" || show === "FME" || show === "TEE" ? getAltConferenceButton(show, extraMode) : null}
                                {getTrackButtons(maxTracks)}{" "}
                            </div>
                            {/*MULTYEXPO - extra buttons for filtering ABE FME TEE*/}
                            {(show == "FME" || show == "TEE" || show == "ABE")
                                ?
                                <div className={`col-12 track-col justify-content-start`}>{getShowButtons(maxShows)}</div>
                                : null
                            }
                        </div>
                    </div>
                </>
            );
        }
    };

    if (loading) {
        return (
            <div className="confman conference-agenda conference-agenda--loading d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    } else {
        const pipedSessions = runFilters(sessions); //Filter Sessions
        return (
            <section

                className={`confman conference-agenda conference-agenda--${show} ${!!extraMode ? `conference-agenda--${getAltConferenceString(show, extraMode)}` : ""}`}>

                <MainNav desktop={window.innerWidth > 992}>
                    {topNav ? (
                        <div className="main-nav__days">
                            <div className={`container${window.innerWidth < 992 ? "-fluid" : ""}`}>
                                <div className="row">{getDayButtons(maxDays, lowestDay)}</div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="main-nav__tracks">{getTracksNav()}</div>
                </MainNav>
                <Body>
                    {window.innerWidth > 992 ? (
                        <div className="container">
                            <div className="row">
                                <div className="col-8">
                                    {show === "FMX" || show === "ABX" || show === "FME" || show === "ABE" || show === "BRE" || show === "TEE"
                                        ? getUIThemes(show, filters.day, filters.track, extraMode)
                                        : null}
                                    {getSlides(pipedSessions)}
                                </div>
                                <div className="col-4">
                                    <StickyNav role="conference-agenda-side-nav">
                                        <div className="side-nav__search">
                                            <h3>Search</h3>
                                            <Cta key="cta reset"
                                                size="micro" color="black"
                                                role="clearFiltersConf"
                                                curved={false}
                                                margin="vertical-margin--0"
                                                bonusClass="rounded"
                                                handler={resetFilters}>

                                                CLEAR FILTERS

                                            </Cta>
                                        </div>
                                        <SearchInput handler={setQuery} role="conference-search" key={`search-conference`} />
                                        {convincepdf != undefined && convincepdf != "" ? (
                                            <Cta key="cta convince your boss"
                                                size="max"
                                                bonusClass="rounded"
                                                color="primary">

                                                CONVINCE YOUR BOSS

                                            </Cta>
                                        ) : (
                                            ""
                                        )}
                                        {downloadagenda != undefined && hideDownloadLink === false ? (
                                            <>
                                                {show == "OCS" || show == "SAT" || show == "NZB" ? (
                                                    <Cta key="cta pdf agenda"
                                                        size="max"
                                                        color="primary"
                                                        role="pop-form"
                                                        link={generalenquiry}
                                                        download={true}>
                                                        DOWNLOAD PDF AGENDA
                                                    </Cta>
                                                ) : (
                                                    <Cta key="cta pdf agenda" size="max" color="primary" link={getConfPdfLink(show, conf)} download={true}>
                                                        DOWNLOAD PDF AGENDA
                                                    </Cta>
                                                )}
                                            </>
                                        ) : (
                                            ""
                                        )}
                                        {reglink != undefined && reglink != "" ? (
                                            <Cta key="cta reg button" size="max" link={reglink}>
                                                REGISTER FOR FREE
                                            </Cta>
                                        ) : (
                                            ""
                                        )}
                                        {reginterest != undefined && reginterest != "" ? (
                                            <Cta key="cta reg interest" size="max" role="pop-form" link={reginterest} value={options}>
                                                REGISTER INTEREST
                                            </Cta>
                                        ) : (
                                            ""
                                        )}
                                    </StickyNav>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">{getSlides(pipedSessions)}</div>
                            </div>
                        </div>
                    )}
                </Body>

            </section>
        );
    }
};

// const mapStateToProps = (store, ownProps) => {
//     return { ...store };
// };
// export default connect(mapStateToProps, {
//     // setLoading,
//     // dealtWithInitialParams,
//     // fetchConference,
//     // setDay,
//     // setTrack,
//     // setQuery,
//     // setOpenSlides,
//     // setLetter,
//     // setDealtWithInitialParams,
//     // resetFiltersAction,
//     // setError,
//     // setLowestDay,
// })(FullAgenda);

export default FullAgenda