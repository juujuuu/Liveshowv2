
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
import CocktailButton from "./CocktailsButton";
// import logo from '../../../confman/public/capture.PNG'; // with import




const CocktailSlide = props => {

    //COCTAIL
    const [industry, setindustry] = useState([props.el])

    console.log(props.el, "what scoming ")

    return (
        <div className="col-12 col-md-6 pt-2" >

            <h3 className="text-dark">DAY 
             - STAGE X - TIME X</h3>
            <h3 className="text-dark">SESSION TITLE</h3>aa
            <p>Session info here: Ut eos intiore ctusamusdae vel ipsapitiatia cus et quis
                dicim eum adi berum alicipsum verumqui veruptam eum quiandit, od quae
                cones as rest, atesequia cus imolorem. Nam, si tent estoriam, officae ipis
                aspel iumquodis dendis cum faccabo. Nequatem fugiam as dit, in</p>
                <div className="row" > 
                {/* add those in the context as an option and get them from the root part*/}
                <div className="col-12 col-md-auto pb-1 pd-md-0  " ><button type="button"  className="btn btn-dark w-100 w-md-auto"><b> VIEW FULL AGENDA</b></button></div>
                <div className="col-12 col-md-auto  " > <button type="button" className="btn btn-dark w-100 w-md-auto" style={{backgroundColor:"#FF00FF"}}><b> REGISTER TO ENJOY </b></button></div>
                
                 

            
                </div>
        </div>
        
    )






}


export default CocktailSlide