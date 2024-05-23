import React, { useState, useEffect, } from "react";
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
    resetFiltersAction
    
} from "../Actions";

const CocktailButton = (props) => {
    let [buttonsStatus,setButtonStatus] =useState("")
    const stepNumberTitle = useSelector(state => state.cocktailReducer.totalStepN)
    let newCount = props.countStep
    const selectedTags=useSelector(state =>state.cocktailReducer.selectedTags)
    const sessions=useSelector(state =>state.sessions)
    const state=useSelector(state=>state)
    const options=useSelector(state=>state.options)
    // const state
    const { conf, show, mode ,continent,cocktailMinTagSelection} = options;
  const dispatch=useDispatch()
   
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
        
        props.onClickHandlerMix("START THE MIX")  
        // props.onClickHandlerBack(newCount)
    }
    const onClickHandlerReset=()=>{
      //  dispatch(setTags("RESET"))
      dispatch(resetFiltersAction([]))
        props.onClickHandler(1)
        props.onClickHandlerMix("")  

    }

// console.log(props)
 
if(props.buttonsStatus  == "START THE MIX"){
    if(window.innerWidth > 992){
//Desktop button Start-again



    return  <div className="col-12 p-0 ">
 
   {<button style={{ float: "right" }} type="button"  onClick={onClickHandlerReset} className="btn btn-dark pb-0 pt-0 border-0"><b>START AGAIN</b></button>}
   </div>
   }else{
    //Mobile button Start-again  
    return <div className="row">  <div className="col-12 "> 
   {<button  type="button"  onClick={onClickHandlerReset} className="btn btn-dark w-100 pb-0 pt-0 border-0"><b>START AGAIN</b></button>}
   </div>
   
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
      <b>STEP {props.countStep + 1}:</b> <span style={{color: "rgb(255, 0, 255)"}}>{props.countStepName.toUpperCase()}{" "}</span>
      <i className="bi bi-caret-right-fill"></i>
    </button>
  ) : (selectedTags.length >= 1  ? (
    <button style={{ float: "right", backgroundColor: "#FF00FF" }} type="button" onClick={onClickHandlerMix} className="btn btn-success pb-0 pt-0 border-0">
      <b>START THE MIX</b>
    </button>
  ):(<button style={{ float: "right", backgroundColor: "#FF00FF" }} type="button" onClick={onClickHandlerMix} className="btn btn-success disabled pb-0 pt-0 border-0">
    <b>START THE MIX</b>
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
      
        <div className="col-12 mb-2">
         {/* <button style={{ float: "right" }} onClick={onClickHandler} type="button" className="btn btn-dark">STEP {props.countStep}:SECTORS </button> */}
        
        {/* { props. props.buttonsStatus?}  */}
        
        {newCount<=stepNumberTitle.length 
         ?
         <button style={{ float: "right" }} onClick={onClickHandler} type="button" className="btn btn-dark w-100 border-0 p-0">STEP {props.countStep}:<span style={{color: "rgb(255, 0, 255)"}}> {props.countStepName.toUpperCase()}</span> </button> 
         :
         selectedTags.length >= 1
         ?
         <button style={{backgroundColor:"#FF00FF" }} type="button"  onClick={onClickHandlerMix} className="btn btn-success pb-0 pt-0 border-0 w-100"><b>START THE MIX</b></button>
         :
         <button style={{backgroundColor:"#FF00FF" }} type="button"  onClick={onClickHandlerMix} className="btn btn-success disabled pb-0 pt-0 border-0 w-100"><b>START THE MIX</b></button>  }
       

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
        <div className="col-12  ">
            {newCount > 2 ? <button type="button" onClick={onClickHandlerBack} className="btn btn-dark w-100 pb-0 pt-0 border-0"><i className="bi bi-caret-left-fill"></i> BACK </button> : null}

        </div>

        {/* { props.buttonslideName == "REGISTER TO ENJOY!" ?   <div className="col-6"> <button  style={{ float: "right" }} onClick={onClickHandler} type="button" className="btn btn-dark">{props.buttonslideName} </button> </div>: null}  */}
    </>
    )
}
}
}


export default CocktailButton