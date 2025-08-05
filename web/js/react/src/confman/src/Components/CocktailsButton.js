import React, { useState, useEffect,forwardRef } from "react";
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
    setCocktailSessions,
    resetFiltersAction,
    setCocktailMainStartYourMix
    
} from "../Actions";




const CocktailButton = forwardRef((props, ref) => {
    let [buttonsStatus,setButtonStatus] =useState("")
    const stepNumberTitle = useSelector(state => state.cocktailReducer.totalStepN)
    let newCount = props.countStep
    const selectedTags=useSelector(state =>state.cocktailReducer.selectedTags)
    const sessions=useSelector(state =>state.sessions)
    const state=useSelector(state=>state)
    const options=useSelector(state=>state.options)
    const cocktailMainStartYourMix = useSelector(state => state.cocktailReducer.setCocktailMainStartYourMix)
    // const state
    const { conf, show, mode ,continent,cocktailMinTagSelection,reglink} = options;
  
  const dispatch=useDispatch()
  // const cocktailMainContainer= useRef(null);
    newCount++
    const onClickHandler = (el) => {
        if (newCount <= stepNumberTitle.length) {
            props.onClickHandler(newCount)
            //this trigger the function getHeightHandler in Cocltail Expo
           props.getHeight()
        }

       
    }
    const onClickHandlerBack = (el) => {
        let newCount = props.countStep
        newCount--
        //this trigger the function getHeightHandler in Cocltail Expo
        props.getHeight()
        props.onClickHandlerBack(newCount)
          
    }

    const onClickHandlerMix = (el) => {
        //here it will be sent the data of the serach
        // let newCount = props.countStep
        
        const newSession = sessions.filter((session) => {
            // Check if cocktailsTags is not null and has at least one tag that matches with selectedTags
            if (session.cocktailsTags && session.cocktailsTags.length > 0) {
                return session.cocktailsTags.some(tag => selectedTags.includes(tag));
            }
            // If cocktailsTags is null or empty, exclude this session
            return false;
        })
        .sort((a, b) => {
            // Sorting based on the number of matched tags
            const countA = a.cocktailsTags.filter(tag => selectedTags.includes(tag)).length;
            const countB = b.cocktailsTags.filter(tag => selectedTags.includes(tag)).length;
            return countB - countA; // Descending order
        });
        dispatch(setCocktailSessions(newSession))
        
        props.onClickHandlerMix("SERVE UP!")  
        // props.onClickHandlerBack(newCount)
    }
    const onClickHandlerReset=()=>{
      //  dispatch(setTags("RESET"))
      dispatch(resetFiltersAction([]))
        props.onClickHandler(1)
        props.onClickHandlerMix("") 
        //reset the top button 
        dispatch(setCocktailMainStartYourMix(!cocktailMainStartYourMix))
        ref.current.scrollIntoView({behavior:"smooth"})

    }

    const onClickHandlerAmend=()=>{
      //  dispatch(setTags("RESET"))

        props.onClickHandler(1)
        props.onClickHandlerMix("")  
        
        const elementTop = ref.current.getBoundingClientRect().top + window.scrollY || window.pageYOffSet

        // Scroll to the position 20 pixels above the element
        window.scrollTo({
            top: elementTop + 155,
            behavior: 'smooth'
        });
    }

// console.log(props)
 
if(props.buttonsStatus  == "SERVE UP!"){
    if(window.innerWidth > 992){
//Desktop button Start-again


// onClickHandlerAmend removing this 
    return  <div className="col-12 p-0  row">
 
   {
      <div>
        {reglink? <a href={reglink} title="Registration Form" target="_blank" ><button style={{ backgroundColor:"#b62f25", float: "right" }} type="button"  className="cocktail-register-now btn btn-dark pb-0 pt-0 ms-2 border-0 float-lg-end"><b>REGISTER TODAY</b></button></a> : ""}
        <button style={{ float: "right" }} type="button"  onClick={onClickHandlerReset} className="btn btn-dark pb-0 pt-0 border-0 ms-2"><b>START AGAIN <i class="bi bi-arrow-clockwise"></i></b></button>
        <button style={{ float: "right" }} type="button"  onClick={onClickHandlerAmend} className="btn btn-secondary pb-0 pt-0 border-0 ms-2"><b>AMEND</b></button>
      


</div>
   }
   </div>
   }else{
    //Mobile button Start-again  
    return <div className="">  
    {<button  type="button"  onClick={onClickHandlerAmend} className="btn btn-secondary w-100 pb-0 pt-0 border-0 mb-2"><b>AMEND</b></button>}
   {<button  type="button"  onClick={onClickHandlerReset} className="btn btn-dark w-100 pb-0 pt-0 border-0 mb-2"><b>START AGAIN</b></button>}
   {reglink?<a href={reglink} title="Registration Form" target="_blank" > <button style={{ backgroundColor:"#b62f25" }} type="button"   className="cocktail-register-now btn btn-dark pb-0 pt-0 border-0  w-100 mb-2"><b>REGISTER TODAY</b></button> </a>: ""}
  
   
   </div>
   }
} else{
    if(window.innerWidth > 992){
    return (
        <>
      
       
            <div className="col-6 p-0 ">
                {newCount > 2 ? <button type="button" onClick={onClickHandlerBack} className="btn btn-dark pb-0 pt-0 border-0"><i className="bi bi-caret-left-fill"></i> BACK </button> : null}

            </div>
            <div className="col-6 p-0">
             {/* <button style={{ float: "right" }} onClick={onClickHandler} type="button" className="btn btn-dark">STEP {props.countStep}:SECTORS </button> */}
            
            {/* { props. props.buttonsStatus?}  */}
           {/* REMOVING THIS AS NO IT MAKES MORE SENSE TO HAVE THE CHECK OF AT LEAST ONE TAG SELECTED AT THE END */}
            {
            // selectedTags.length >= 0  ? (
              
  newCount <= stepNumberTitle.length ? (
    <button style={{ float: "right" }} onClick={onClickHandler} type="button" className="btn btn-dark pb-0 pt-0 border-0">
      <b>STEP {props.countStep + 1}:{" "}
<span>
  {props.countStepName === "Themes"
    ? "TOPIC"
    : props.countStepName.toUpperCase()}{" "}
</span></b>
      <i className="bi bi-caret-right-fill"></i>
    </button>
  ) : (selectedTags.length >= 1  ? (
    <button style={{ float: "right" }} type="button" onClick={onClickHandlerMix} className="cocktailColoredButtons btn  pb-0 pt-0 border-0">
      <b>SERVE UP!</b>
    </button>
  ):(<button style={{ float: "right" }} type="button" onClick={onClickHandlerMix} className="cocktailColoredButtons btn  disabled pb-0 pt-0 border-0">
    <b>SERVE UP!</b>
  </button>)
  
  )
  

// ) : (
//     <button
//     style={{ float: "right" }}
//     type="button"
//     className="btn btn-dark disabled"
//   >
//     <b>STEP {props.countStep + 1}:</b> {props.countStepName.toUpperCase()}{" "}
//     <i className="bi bi-caret-right-fill"></i>
//   </button>
// )
}
            </div>
  
            {/* { props.buttonslideName == "REGISTER TO ENJOY!" ?   <div className="col-6"> <button  style={{ float: "right" }} onClick={onClickHandler} type="button" className="btn btn-dark">{props.buttonslideName} </button> </div>: null}  */}
        </>

    )
}else{
    return (
        <>
      
        <div className="col-12 p-0 mb-2">
         {/* <button style={{ float: "right" }} onClick={onClickHandler} type="button" className="btn btn-dark">STEP {props.countStep}:SECTORS </button> */}
        
        {/* { props. props.buttonsStatus?}  */}
        
        {newCount<=stepNumberTitle.length 
         ?
         <button style={{ float: "right" }} onClick={onClickHandler} type="button" className="btn btn-dark w-100 border-0 p-0">STEP {props.countStep}:<span> {props.countStepName.toUpperCase()}</span> </button> 
         :
         selectedTags.length >= 1
         ?
         <button style={{backgroundColor:"#B62F25" }} type="button"  onClick={onClickHandlerMix} className="btn btn-success pb-0 pt-0 border-0 w-100"><b>SERVE UP!</b></button>
         :
         <button style={{backgroundColor:"#B62F25" }} type="button"  onClick={onClickHandlerMix} className="btn btn-success disabled pb-0 pt-0 border-0 w-100"><b>SERVE UP!</b></button>  }
       

{/* (         selectedTags.length >= 1  ? (
    <button
      style={{ float: "right", backgroundColor: "#FF00FF" }}
      type="button"
      onClick={onClickHandlerMix}
      className="btn btn-success pb-0 pt-0 border-0"
    >
      <b>START THE MIXs</b>
    </button>
  ):(<button
    style={{ float: "right", backgroundColor: "#FF00FF" }}
    type="button"
    onClick={onClickHandlerMix}
    className="btn btn-success disabled pb-0 pt-0 border-0"
  >
    <b>START THE MIXa</b>
  </button>) */}


       
        </div>
        <div className="col-12 p-0 ">
            {newCount > 2 ? <button type="button" onClick={onClickHandlerBack} className="btn btn-dark w-100 pb-0 pt-0 border-0"><i className="bi bi-caret-left-fill"></i> BACK </button> : null}

        </div>

        {/* { props.buttonslideName == "REGISTER TO ENJOY!" ?   <div className="col-6"> <button  style={{ float: "right" }} onClick={onClickHandler} type="button" className="btn btn-dark">{props.buttonslideName} </button> </div>: null}  */}
    </>
    )
}
}
})


export default CocktailButton