
import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import {
    fetchSpeakerList,
    setLoading,
    // setOpenSlides,
    // setDay,
    // setTrack,
    setLetter,
    // setDealtWithInitialParams,
    setQuery,
    setTags,
    setCocktailMaxTagSelection,
    setCocktailMaxTagSelectionTracking

} from "../Actions";
import getModal from "../Utils/getModal";
import Letter from "./Letter";
import MainNav from "./MainNav";
//to re add 
// import SearchInput from "../../../common_components/SearchInput";
//to removed 
// import SearchInput from "../Components/SearchInput";
// import Cta from "../../../common_components/Cta";
// import Body from "../../../common_components/Body";
// import SpeakerSlide from "./SpeakerSlide";
// import DesignSpeakerSlide from "./DesignSpeakerSlide";

// import logo from '../../../confman/public/capture.PNG'; // with import




const CocktailStep = props => {
    //    console.log(props,"props")
    const { listcheckedElement, el, stepNumber, stepNumberTitle } = props
    const options = useSelector(state => state.options)
    const { conf, show, mode, continent, cocktailMaxTagSelection } = options;
    const dispatch = useDispatch()
    //COCTAIL
    const selectedTags = useSelector(state => state.cocktailReducer.selectedTags)
    // const checkedItems = useSelector(state => state.cocktailReducer.checkedItems)
    // const [industry, setindustry] = useState([el])
    const [check, setCheck] = useState(false)

    const cocktailMaxTagS = useSelector(state => state.cocktailReducer.cocktailMaxTagSelection)
    const cocktailMaxTagSTracking = useSelector(state => state.cocktailReducer.CMaxTagSelectionTracking2)

    const [limitTagSelection, setLimitTagSelection] = useState(0)


    
    useEffect(() => {




        for (let key in cocktailMaxTagSTracking) {

            if (stepNumberTitle == (key)) {

                setLimitTagSelection(cocktailMaxTagSTracking[key].length)

            }

        }
        console.log(limitTagSelection, "limitTagSelection")

    });


    const handleClick = event => {

       setCheck(!check);
        dispatch(setTags([el]))

        //**DISPATCHES THE ARRAY WITH THE NUMBER OF MAX TAGS SELECTABLE     
        dispatch(setCocktailMaxTagSelection(cocktailMaxTagSelection))
        dispatch(setCocktailMaxTagSelectionTracking([el]))
     
       



    };


    return (
        <div className="col-12 col-md-4 pb-2 pb-3 cocktail--conaine-step " >


            {listcheckedElement.includes(el) ? (
                <div onClick={() => handleClick()} style={{ cursor: "pointer", borderLeft: "2px solid  black" }} className="form-check p-4  rounded cocktails shadow-sms border-start-5">
                    <div className="checkbox-filter__checkbox" >

                        <i className="bi bi-check-circle-fill pe-1" > <b>{el.toUpperCase()}</b></i>


                    </div>
                </div>

            ) : (cocktailMaxTagS[stepNumber - 1] <= limitTagSelection ? (

                <div onClick={() => handleClick()} style={{ opacity: 0.5, pointerEvents: "none", pointer: "none" }} className="form-check p-4  shadow-sms rounded">
                    <div className="checkbox-filter__checkbox" >


                        <i className="bi bi-circle pe-1" style={{}}> <b>{el.toUpperCase()}</b></i>


                    </div>
                </div>

            ) : (
                <div onClick={() => handleClick()} style={{ cursor: "pointer", position: "relative", overflow: "hidden", borderLefts: "2px solid black", background: "#fcfcfc" }} className="form-check p-4  shadow-sms rounded ">
                    {/* <div className> <div class="loader"></div><b>{el.toUpperCase()}</b> </div>   */}
                    <div className="checkbox-filter__checkbox  " >
                        <i className="bi bi-circle pe-1" > <b>{el.toUpperCase()}</b></i>


                    </div>
                    {/* <div className="checkbox-filter__checkbox--image  "  style={{ opacity:"0.7",borderRadius:"0px", width:"10px",position:"absolute", right:"0px",bottom:"0",top:"0px",backgroundImage: `URL(https://oda0cs26.modx.dev//assets/resources/shared/images/testcocktails/a-1.png)`, backgroundSize:"cover"}}>  </div> */}
                </div>
            )

            )

            }






        </div>
    )






}


export default CocktailStep