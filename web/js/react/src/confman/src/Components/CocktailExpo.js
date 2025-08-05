
import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import Spinner from "../../../common_components/Spinner";
import CocktailLoader from "../../../common_components/cocktailLoader"
import { getSiteFromAcronym, getShowNameFromAcronym,getShowNameFromAcronymOnlyText } from "../Utils/getSite";
import CocktailIntros from "./CocktailIntros";





import {

    setLoading,
    // setOpenSlides,
    // setDay,
    // setTrack,

    // setDealtWithInitialParams,

    // resetFiltersAction,
    fetchConference,
    // setError,


    setTags,
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
    setFirstLoad,
    setCocktailMinTagSelection,
    setCocktailMainStartYourMix

} from "../Actions";
import getModal from "../Utils/getModal";
import Letter from "./Letter";
import MainNav from "./MainNav";
//to re add 
// import SearchInput from "../../../common_components/SearchInput";
//to removed 
import SearchInput from "../Components/SearchInput";
import Cta from "../../../common_components/Cta";
import Body from "../../../common_components/Body";
import SpeakerSlide from "./SpeakerSlide";
import DesignSpeakerSlide from "./DesignSpeakerSlide";
import CocktailStep from "./CocktailStep";
import CocktailButton from "./CocktailsButton";
import CocktailSlide from "./CocktailSlide";
// import logo from '../../../confman/public/capture.PNG'; // with import





const CocktailExpo = props => {


    const {
        // loading,
        // speakers,
        // fetchSpeakerList,
        // options,
        // setLoading,
        // setQuery,
        // setLetter,
        // dealtWithInitialParams,
        // setDealtWithInitialParams,
        // filters,
        // setError,
        // resetFiltersAction,
    } = props;

    // const dispatch = useDispatch()
    // const resetFilterselector=useSelector(state=>state.filters)
    const loading = useSelector(state => state.loading)
    const speakers = useSelector(state => state.speakers)
    const filters = useSelector(state => state.filters)
    const { query, letter: letterReducer } = filters;
    const options = useSelector(state => state.options)
    const dispatch = useDispatch()
    // const options = useSelector(state => state.options)
    const sessions = useSelector(state => state.sessions)
    const maxDays = useSelector(state => state.maxDays)
    const lowestDay = useSelector(state => state.lowestDay)
    // const filters = useSelector(state => state.filters)
    const openSlides = useSelector(state => state.openSlides)
    const dealtWithInitialParams = useSelector(state => state.dealtWithInitialParams)
    // const loading = useSelector(state => state.loading)
    const maxTracks = useSelector(state => state.maxTracks)
    const maxShows = useSelector(state => state.maxShows)
    const setShowNames = useSelector(state => state.filters.show)
    const state = useSelector(state => state)
    const firstLoadShows = useSelector(state => state.filters.firstLoad)
    const stepNumberTitle = useSelector(state => state.cocktailReducer.totalStepN)
    const cocktailMainStartYourMix = useSelector(state => state.cocktailReducer.setCocktailMainStartYourMix)
    // const focus=useSelector(state =>state.cocktailReducer.tags.Focus)
    // const industry=useSelector(state =>state.cocktailReducer.tags.Industry)
    const tags = useSelector(state => state.cocktailReducer.tags)
    const totaltagsOneArray = useSelector(state => state.cocktailReducer.totaltagsOneArray)
    const cocktailSessions = useSelector(state => state.cocktailReducer.cocktailSessions)
    const [heightSet, setHeight] = useState(false);
   

    const { conf, show, mode, continent, cocktailMinTagSelection } = options;
    const [countSteps, setCountSteps] = useState(1)

    let [buttonsStatus, setButtonStatus] = useState("")
  console.log(state)
// used to set the hight  if the step container to create a smooth resizing
    const heightContainer = useRef(null);
    // pushes the screen back up on reset
    const cocktailMainContainer= useRef(null);
    const cocktailMainStepContainer= useRef(null);


    /** just a temporary function to change the steps headers */

    const changeStepHeader = (header, show) => {
        let newHeader

        if (header == "Industry") {
            newHeader = "Industry"
        }
        else if (header == "Themes") {
            newHeader = "Topic"
        }
        else if (header == "Focus") {
            if(show=="BRE"){
                newHeader = "Your focus area"
            }else{
                newHeader = "Focus"
            }
            
        }
        else if (header == "Event") {
            //single expo changes EVENT to STAGE
            if(show=="BRE"){
                newHeader = "Select your primary stage/s"
            }
            else{
                newHeader = "Event"
            }
            
        }
        else{
            newHeader=header
        }
        return newHeader.toUpperCase()
    }
    

    /**THIS IS USED TO GET THE NUMBER OF TAGS IN THE CHECKBOX LIST 
    AND CALCULATE THE HEIGHT OF THE CONTAINER BASED OF ON THEM */
    const getHeightHandler = (el) => {


        let heightContainer
        const rows = el


        if (rows) {


            if (buttonsStatus == "SERVE UP!") {
                heightContainer = ''

            }
            else if (rows.length <= 3) {
                heightContainer = 155 + "px"

            }
            else if (rows.length > 3 && rows.length <= 6) {
                heightContainer = 205 + "px"

            }
            else if (rows.length > 6 && rows.length <= 9) {
                heightContainer = 250 + "px"

            }
            else if (rows.length > 9 && rows.length <= 12) {
                heightContainer = 290 + "px"

            }
            else if (rows.length > 12 && rows.length <= 15) {
                heightContainer = 340 + "px"

            }
            else if (rows.length > 15 && rows.length <= 18) {
                heightContainer = 390 + "px"

            }
            else if (rows.length > 18 && rows.length <= 21) {
                heightContainer = 440 + "px"

            }
            else if (rows.length > 21 && rows.length <= 24) {
                heightContainer = 470 + "px"

            }



        }

        return heightContainer


    }
// console.log(state)
    const showOrHideHandleclick=(el)=>{
      
        dispatch(setCocktailMainStartYourMix(!cocktailMainStartYourMix))
        // console.log(cocktailMainStartYourMix)
        dispatch(resetFiltersAction([]))
        setCountSteps(1)
        setButtonStatus("")
        // console.log(el.target.textContent)

        if(el.target.textContent=="START THE MIX"){
            

            const elementTop = cocktailMainStepContainer.current.getBoundingClientRect().top + window.scrollY || window.pageYOffSet

        // Scroll to the position 20 pixels above the element
        window.scrollTo({
            top: elementTop - 100,
            behavior: 'smooth'
        });
        cocktailMainContainer.current.scrollIntoView({behavior:"smooth"})
        }
        else{
            cocktailMainContainer.current.scrollIntoView({behavior:"smooth"})
        }
    }


    //     const onClickHandlerReset=()=>{
    //   //  dispatch(setTags("RESET"))
    //   dispatch(resetFiltersAction([]))
    //     props.onClickHandler(1)
    //     props.onClickHandlerMix("")  

    // }

    //Run on start.
    //Run after Component mount and first render
    useEffect(() => {
        if (loading) {
            //If loading run set conference action.  On complete set loading to false
            dispatch(fetchConference(getSiteFromAcronym(show), conf)).then(response => {
                dispatch(setLoading(false));

                getHeightHandler();

                //set first time the shows types are loaded and set it to false 
                // dispatch(setFirstLoad(false));

            });
            dispatch(setDay(0)); //Day 0 is basically 'display all days' here






        }
    }, []);

    // //Run when loading changes.
    // useEffect(() => {

    //     //The code for zapping to a session if the id is a url param.
    //     if (!dealtWithInitialParams && !loading) {
    //         getHeightHandler()
    //         //If we can find a session id param.
    //         // dispatch(setShow("34"));

    //         if (parameters.find(param => param[0] == "session-id")) {
    //             const [name, sessionId] = parameters.find(param => param[0] == "session-id"); //destructure param name and value

    //             try {

    //                 const sessionDay = sessions.find(_session => _session.Id.toLowerCase() === sessionId.toLowerCase()).Day__c;
    //                 dispatch(setDay(sessionDay));
    //                 setDealtWithInitialParams(true);
    //                 dispatch(setOpenSlides(true));


    //                 setTimeout(() => {
    //                     const el = document.querySelector(`#${sessionId.toLowerCase()} .session__anchor`);
    //                     el.scrollIntoView({ behavior: "smooth" });
    //                 }, 0);
    //             } catch (error) {
    //                 console.error("Problem trying to load session param", error);
    //                 dispatch(setError(true));
    //             }
    //         } else if (parameters.find(([name, value]) => name == "track")) {
    //             const [name, value] = parameters.find(([name, value]) => name === "track"); //destructure param name and value


    //             try {
    //                 const track = parseInt(value);
    //                 switch (track) {
    //                     case 1:
    //                         dispatch(setTrack([2, 3]));
    //                         break;
    //                     case 2:
    //                         dispatch(setTrack([1, 3]));
    //                         break;
    //                     case 3:
    //                         dispatch(setTrack([1, 2]));
    //                         break;
    //                     default:
    //                         break;
    //                 }
    //                 if (show === "BRE") {
    //                     dispatch(setDay(lowestDay));
    //                 }
    //                 dispatch(setDealtWithInitialParams(true));
    //             } catch (error) {
    //                 console.error("Problem trying to load track", error);
    //                 dispatch(setError(true));
    //             }
    //         }
    //     } else {
    //         /*No one can make their mind up about how logic on these should work so good luck lol !!! ngula a mammt!!!!
     
    //          This logic will not set the lowest day , so those show undrneath won't have the active day on load and will show
    //          all the sessions. THEREFORE, THE TOP BAR WITH DAYS WILL not SHOW THE active FIRST DATE on load ,
    //          guessing, it s designed for one long list with just the check button (or filtering by tracks or by date), when this happens
    //          hide the tot date bar*/
    //         if (show !== "SPC" && show !== "NZB") {
    //             //Default if there aren't any extra params.  Just set the day to the lowest one in the data
    //             dispatch(setDay(lowestDay));

    //         }
    //     }
    // }, [loading]);

    /**
     *
     * @returns An array of Letter components for the alphabet filter
     */




    /**
     *
     * @param {Array} inputSpeakers
     * @returns inputSpeakers with speakers with first name, last name or compnay not matching query removed.
     */
    const filterQuery = inputSpeakers => {
        let { query } = filters;
        query = query.toLowerCase();
        if (query.trim() === "") {
            return inputSpeakers;
        }
        let deepCloneSpeakers = [...inputSpeakers];
        return deepCloneSpeakers.filter(speaker => {
            let { First_Name__c, Last_Name__c, Company__c } = speaker;
            return First_Name__c.toLowerCase().includes(query) || Last_Name__c.toLowerCase().includes(query) || Company__c.toLowerCase().includes(query);
        });
    };

    //Pretty much as above but we're using the letter filter and checking the first character only.
    const filterAlphabet = inputSpeakers => {
        let { letter } = filters;
        if (letter === -1) {
            return inputSpeakers;
        }
        letter = letter.toLowerCase();

        return inputSpeakers.filter(speaker => {
            const { Last_Name__c, Company__c } = speaker;
            return Last_Name__c.toLowerCase().charAt(0) == letter || Company__c.toLowerCase().charAt(0) == letter;
        });
    };


    //COCTAIL
    const selectedTags = useSelector(state => state.cocktailReducer.selectedTags)
    const sessionsNumber = useSelector(state => state.sessions)






    const pipeSpeakers = speakers => {
        speakers = filterQuery(speakers);
        speakers = filterAlphabet(speakers);
        return speakers;
    };
    if (loading) {
        return (
            <div  className="confman conference-agenda conference-agenda--loading d-flex justify-content-center align-items-center">
                {/* <Spinner /> */}
                <CocktailLoader />
            </div>
        );
    } else {
        // const pipedSpeakers = pipeSpeakers(speakers);
   
     return (

            <section ref={cocktailMainContainer } className={`cocktail--${show} container mb-5`}>

                <MainNav desktop={window.innerWidth > 992}>
                    <div className="header__container container p-0 ">
                        <div className="row">
                           
                            <CocktailIntros show={show} sessions={sessionsNumber} showName={getShowNameFromAcronymOnlyText(show)}/>

                            <div className="header__container__image col-12 col-md-6 d-flex order-1 order-md-1 justify-content-center align-items-center ">

                                <img className="img-fluid d-none d-lg-block" src={'https://oda0cs26.modx.dev/assets/resources/shared/web/apps/confman/glass-only.gif'} />
                            </div>

                        </div>

                        <div>
                            { cocktailMainStartYourMix ?  <button  type="button" onClick={(e)=>showOrHideHandleclick(e)} className="btn  cocktailColoredButtons col-12 col-md-2  pb-0 pt-0 border-0">
                            <b>START THE MIX</b>
                           </button>:
                           <button  type="button" onClick={(e)=>showOrHideHandleclick(e)}  className="btn btn-dark pb-0 pt-0 border-0 col-12 col-md-2 "><b>START AGAIN <i class="bi bi-arrow-clockwise"></i></b></button>
                           }
                        
                        </div>

                        <hr  style={{ opacity: "10", border: "2px solid black "}} />

                        {/* THIS SWITCH ON THE TAG SELECTION TAB  ON TOP OF THE RESULT SLIDES  */}
                        {buttonsStatus == "SERVE UP!"
                            ?


                            <div className="container d-flex p-md-0  mb-3 justify-content-end">

                                {selectedTags.length > 0 ?

                                    (<div>

                                        <div className="row rounded " style={{ minHeight: "" }} >

                                            {selectedTags.map(el => { return <span key={el} style={{ fontSize: "14px" }} className="fst-italic col-auto" > {el} </span> })} </div>   </div>)
                                    : <span style={{ color: "rgb(255, 0, 255)" }} className=""> </span>}

                            </div>

                            : ""}
                    </div>



                </MainNav>
                {getHeightHandler(tags[stepNumberTitle[countSteps - 1]].length)}
                <div ref={heightContainer}  className="steps-container container  position-relative" style={{ height: window.innerWidth > 992 ? getHeightHandler(tags[stepNumberTitle[countSteps - 1]]) : "", marginBottom: window.innerWidth > 992 ? "45px" : "105px", display:cocktailMainStartYourMix ? "none" :"block"}}>

                    {
                        buttonsStatus !== "SERVE UP!"
                            ?
                            <div style={{ backgroundImage: `URL(https://oda0cs26.modx.dev//assets/resources/shared/images/testcocktaisls/a-1.png)`, backgroundSize: "cover" }} className="steps-container__title rounded tertiary-color-background">
                                {/* <h3 style={{backgrosund:"#285185"}} className="text-dark tertiary-color rounded ps-3  mb-0 ">STEP {countSteps}: <span style={{color: "rgb(255, 0, 255)"}} className="secondary-color">{ stepNumberTitle[countSteps - 1].toUpperCase()}</span> </h3>  temportaty changing this for the headers*/}
                                <h3 style={{ color: "black" }} className="steps-container__title--bold rounded  mb-0 ">STEP {countSteps}: <span style={{/*color: "rgb(255, 0, 255)"**/ }} 
                                // className="steps-container__title--thin secondary-color">{changeStepHeader(stepNumberTitle[countSteps - 1],show)}</span>
                                className="">{changeStepHeader(stepNumberTitle[countSteps - 1],show)}</span>
                                 </h3>
                                <div className="loader"></div>
                            </div>
                            : <span><h3 style={{ fontSize: "32px", fontWeight: "900" }} className="text-dark">YOUR PERFECT MIX</h3>
                                <p><b style={{ fontSize: "24px" }}>Look below to see the TOP THREE we have served up!</b></p></span>
                    }

                    {/* <div className="row border-5 border-dark border-top   pt-4 mt-4  pb-md-3  mb-md-1"> */}


                    <div   className="steps-container__tags row border-5 pt-md-4 mt-4  pb-md-3  mb-md-1 d-flex align-items-center" >





                        {buttonsStatus !== "SERVE UP!" ? tags[stepNumberTitle[countSteps - 1]].map(el => (

                            < CocktailStep  stepNumberTitle={stepNumberTitle[countSteps - 1]} stepNumber={countSteps} listcheckedElement={selectedTags} el={el} key={el} />))
                            :
                            <CocktailSlide sessions={cocktailSessions} />}



                        {/* <button type="button" onClick={onClickHandler} className="btn btn-dark">STEP 2:SECTORS </button>
                 */}


                        {buttonsStatus == "SERVE UP!" ? <hr style={{ opacity: "10", border: "2px solid black" }} /> : ""}
                    </div>
                    {/* <div className="row border-5 border-dark border-bottom pb-3 "> */}

                    <div   className={`floating-thing ${window.innerWidth > 992 ? "position-absolute bottom-0 start-0 end-0" : ""} `}>
                        <div className="floating-thing container" style={{ height: 0 }}>
                            <div className="row border-5">
                                <CocktailButton  ref={cocktailMainContainer} countStepName={stepNumberTitle[countSteps]} countStep={countSteps}
                                    onClickHandler={count => setCountSteps(count)} getHeight={() => getHeightHandler()} onClickHandlerBack={count => setCountSteps(count)}
                                    onClickHandlerMix={count => setButtonStatus(count)} buttonsStatus={buttonsStatus} />
                            </div>


                        </div>
                    </div>

                </div >

                {/* THIS SWITCH OFF THE TAG SELECTION TAB AND THE HR LINE ON THE RESULT SLIDES  */}
                {buttonsStatus !== "SERVE UP!"
                    ?
                    <span  ref={cocktailMainStepContainer}>
                        <hr style={{ opacity: "10", border: "2px solid black", display:cocktailMainStartYourMix ?"none" :"block" }} />
                        <div className="container d-flex p-md-0  mb-3">

                            {selectedTags.length > 0 ?

                                (<div>

                                    <div className=" row rounded  " style={{ minHeight: "" }} >

                                        {selectedTags.map(el => { return <span key={el} style={{ fontSize: "14px" }} className="fst-italic col-auto" > {el} </span> })} </div>   </div>)
                                : <span style={{ color: "rgb(255, 0, 255)" }} className="rounded"> </span>}

                        </div>
                    </span>
                    : ""}
                {/* {console.log(sessions)} */}
            </section>


        );
    }
};


export default CocktailExpo