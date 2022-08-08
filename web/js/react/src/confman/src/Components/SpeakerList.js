import React, { useEffect } from "react";
import { connect } from "react-redux";

import Spinner from "../../../common_components/Spinner";

import { getSiteFromAcronym } from "../Utils/getSite";

import {
    fetchSpeakerList,
    setLoading,
    setOpenSlides,
    setDay,
    setTrack,
    setLetter,
    setDealtWithInitialParams,
    setQuery,
    resetFiltersAction,
    setError,
} from "../Actions";
import getModal from "../Utils/getModal";
import Letter from "./Letter";
import MainNav from "./MainNav";
import SearchInput from "../../../common_components/SearchInput";
import Cta from "../../../common_components/Cta";
import Body from "../../../common_components/Body";
import SpeakerSlide from "./SpeakerSlide";
import DesignSpeakerSlide from "./DesignSpeakerSlide";

const SpeakerList = props => {
    const {
        loading,
        speakers,
        fetchSpeakerList,
        options,
        setLoading,
        setQuery,
        setLetter,
        dealtWithInitialParams,
        setDealtWithInitialParams,
        filters,
        setError,
        resetFiltersAction,
    } = props;

    const { query, letter } = filters;

    const { conf, show, mode } = options;

    //Run on start.
    useEffect(() => {
        if (loading) {
            fetchSpeakerList(getSiteFromAcronym(show), conf).then(response => {
                setLoading(false);
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
                    <Letter handler={setLetter} value="-1" key={`letter-view-all`}>
                        {letter}
                    </Letter>
                );
            } else {
                return (
                    <Letter handler={setLetter} value={letter} key={`letter-${letter}`}>
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

    const resetFilters = () => {
        resetFiltersAction();
        document.getElementById("react__search").value = "";
    };

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
                            <div className="col-12 col-lg-10">
                                <SearchInput handler={setQuery} placeholder="Refine By Speaker Or Company Name" key="search" value={query} />
                            </div>
                            <div className="col-12 col-lg-2">
                                <Cta key="cta speaker-clear" curved={false} color="black" handler={resetFilters} margin="vertical-margin--0">
                                    CLEAR SEARCH
                                </Cta>
                            </div>
                        </div>
                    </div>
                    <div className="container speaker-list__alphabet">
                        <div className="row">
                            <div className="col-12">{getLetters()}</div>
                        </div>
                    </div>
                </MainNav>
                <Body>
                    <div className="container speaker-list__slide-list">{getSpeakerSlides(pipedSpeakers)}</div>
                </Body>
            </section>
        );
    }
};

const mapStateToProps = (store, ownProps) => {
    return { ...store };
};
export default connect(mapStateToProps, {
    setLoading,
    fetchSpeakerList,
    setDay,
    setTrack,
    setQuery,
    setOpenSlides,
    setLetter,
    setDealtWithInitialParams,
    resetFiltersAction,
    setError,
})(SpeakerList);
