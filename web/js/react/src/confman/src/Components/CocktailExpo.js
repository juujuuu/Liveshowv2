
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import Spinner from "../../../common_components/Spinner";

import { getSiteFromAcronym } from "../Utils/getSite";





import {
    fetchSpeakerList,
    setLoading,
    // setOpenSlides,
    // setDay,
    // setTrack,
    setLetter,
    // setDealtWithInitialParams,
    setQuery,
    // resetFiltersAction,
    // setError,
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
    console.log(props)
    const dispatch = useDispatch()
    // const resetFilterselector=useSelector(state=>state.filters)
    const loading = useSelector(state => state.loading)
    const speakers = useSelector(state => state.speakers)
    const filters = useSelector(state => state.filters)
    const { query, letter: letterReducer } = filters;
    const options = useSelector(state => state.options)

    const { conf, show, mode } = options;

    //Run on start.
    useEffect(() => {

        if (loading) {
            dispatch(fetchSpeakerList(getSiteFromAcronym(show), conf)).then(response => {
                dispatch(setLoading(false));
            });
        }
    }, []);

    /**
     *
     * @returns An array of Letter components for the alphabet filter
     */
    const getLetters = () => {
        let alphabet = "View All|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z".split("|");
        alphabet = alphabet.map((letter, index) => {
            if (letter == "View All") {
                return (
                    <Letter handler={letterReducer} value="-1" key={`letter-view-all`}>
                        {letter}
                    </Letter>
                );
            } else {
                return (
                    <Letter handler={letterReducer} value={letter} key={`letter-${letter}`}>
                        {letter}
                    </Letter>
                );
            }
        });
        return <ul>{alphabet}</ul>;
    };

    const getSpeakerSlides = speakers => {
        if (speakers.length > 0) {
            if (mode === "speaker-list") {
                return speakers.map((speaker, index) => (
                    <SpeakerSlide
                        id={speaker.Id}
                        speaker={speaker}
                        key={`speaker-${speaker.Id}`}
                        modalHandler={() => getModal({ role: "speaker-modal", options, data: speaker })}
                    />
                ));
            } else if (mode === "design-speaker-list") {
                return speakers.map((speaker, index) => (
                    <DesignSpeakerSlide
                        id={speaker.Id}
                        speaker={speaker}
                        key={`speaker-${speaker.Id}`}
                        modalHandler={() => getModal({ role: "speaker-modal", options, data: speaker })}
                    />
                ));
            }
        } else {
            return <h2>No Speakers Found</h2>;
        }
    };

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

    const industryArr = ["industry-1", "industry-2", "industry-3", "industry-4", "industry-5"]
    
    const sectorsArr = ["SECTOR-1", "SECTOR-2", "SECTOR-3", "SECTOR-4", "SECTOR-5"]
    const daysArr = ["day-1", "day-2", "day-3", "day-4", "day-5"]
    const sessionTypeArr = ["sessionType-1", "sessionType-2", "sessionType-3", "sessionType-4", "sessionType-5"]
    const stepsNames=[industryArr,sectorsArr,daysArr,sessionTypeArr ]
    const stepNames = ["INDUSTRIES", "SECTORS", "DAYS", "SESSION TYPE"]

    const [countSteps, setCountSteps] = useState(1)
    const [step, setStep] = useState(stepNames[countSteps])
    // const [countStepName, setCountStepName] = useState(1)
    let [buttonsStatus, setButtonStatus] = useState("")
    console.log(buttonsStatus)
    // const onClickHandler = () => {
    //     setStep("Sectors")
    // }

    const pipeSpeakers = speakers => {
        speakers = filterQuery(speakers);
        speakers = filterAlphabet(speakers);
        return speakers;
    };
    if (loading) {
        return (
            <div className="confman conference-agenda conference-agenda--loading d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    } else {
        const pipedSpeakers = pipeSpeakers(speakers);
        return (
            <section className={`confman speaker-list speaker-list--${show}`}>

                <MainNav desktop={window.innerWidth > 992}>
                    <div className="container">
                        <div className="row">
                            <div className="col-7">
                                <h1 className="text-dark">THE PERFECT CONFERENCE COCKTAIL</h1>
                                <p className="text-dark pb-2">Sit back and let us design your perfect conference sessions for our
                                    extensive program at XXX. WIth over XXX sessions, XXX top tier speakers
                                    and X stages... we have all the ingredients we need to serve you a
                                    flawless slice of conference learning this May.</p>
                                <p><b>Simply select from the options below and within a few
                                    minutes we will have your conference cocktail ready!</b> </p>
                            </div>


                            <div className="col-5">

                                <img src={'../../../confman/public/capture.PNG'} />
                            </div>

                        </div>




                    </div>



                </MainNav>
                <div className="container mb-5">
                    <div className="row border-5 border-dark border-top   pb-1  pb-md-3  mb-md-1">
                        

                        {
                            buttonsStatus !== "START THE MIX"
                                ?
                                <h3 className="text-dark"><b>STEP {countSteps}:</b>{stepNames[countSteps - 1]}</h3>
                                : <span><h3 className="text-dark">YOUR PERFECT MIX</h3>
                                    <p><b>Look below to see what we have served up!</b></p></span>
                        }

                        {buttonsStatus!=="START THE MIX" ?stepsNames[countSteps-1].map(el => (<CocktailStep el={el} key={el} />)): <CocktailSlide  days={daysArr.length} sessions={sessionTypeArr.length} sectors={sectorsArr}/>}



                        {/* <button type="button" onClick={onClickHandler} className="btn btn-dark">STEP 2:SECTORS </button>
                 */}
                      


                    </div>
                    <div className="row border-5 border-dark border-bottom pb-3 ">
                            <CocktailButton countStepName={stepNames[countSteps - 1]} countStep={countSteps} onClickHandler={count => setCountSteps(count)} onClickHandlerBack={count => setCountSteps(count)} onClickHandlerMix={count => setButtonStatus(count)} buttonsStatus={buttonsStatus} />
                        </div>
                </div>

            </section>

        );
    }
};


export default CocktailExpo