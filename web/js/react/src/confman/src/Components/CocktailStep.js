
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
// import logo from '../../../confman/public/capture.PNG'; // with import




const CocktailStep = props => {
    //COCTAIL
const [industry,setindustry]=useState([props.el])
   
    console.log(props.el,"what scoming ")
       
       return(
        <div className="col-4 pb-2 pb-2" >
        <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
        <label className="form-check-label" for="defaultCheck1" >
         {props.el}
        </label>
      </div>
      </div>
    )
        
  

   


}


export default CocktailStep