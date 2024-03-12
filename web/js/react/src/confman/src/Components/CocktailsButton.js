import React, { useState, useEffect, } from "react";
// 


const CocktailButton = (props) => {
    let [buttonsStatus,setButtonStatus] =useState("")
    
    let newCount = props.countStep

  
   
    newCount++
    const onClickHandler = (el) => {
        if (newCount <= 4) {
            props.onClickHandler(newCount)
           
        }

       
    }
    const onClickHandlerBack = (el) => {
        let newCount = props.countStep
        newCount--
        props.onClickHandlerBack(newCount)
    }

    const onClickHandlerMix = (el) => {
        //here it will be sent the data of the serach
        // let newCount = props.countStep
        
       
        props.onClickHandlerMix("START THE MIX")  
        // props.onClickHandlerBack(newCount)
    }
    const onClickHandlerReset=()=>{
       
        props.onClickHandler(1)
        props.onClickHandlerMix("")  

    }

console.log(props)
 
if(props.buttonsStatus  == "START THE MIX"){
    if(window.innerWidth > 992){
//Desktop button Start-again



    return  <div className="col-12 p-0 ">
 
   {<button style={{ float: "right" }} type="button"  onClick={onClickHandlerReset} className="btn btn-dark">Start again</button>}
   </div>
   }else{
    //Mobile button Start-again  
    return <div className="row">  <div className="col-12 "> 
   {<button  type="button"  onClick={onClickHandlerReset} className="btn btn-dark w-100">Start again</button>}
   </div>
   
   </div>
   }
} else{
    if(window.innerWidth > 992){
    return (
        <>
      
       
            <div className="col-6 p-0 ">
                {newCount > 2 ? <button type="button" onClick={onClickHandlerBack} className="btn btn-dark">&#60;&#60; BACK </button> : null}

            </div>
            <div className="col-6 p-0">
             {/* <button style={{ float: "right" }} onClick={onClickHandler} type="button" className="btn btn-dark">STEP {props.countStep}:SECTORS </button> */}
            
            {/* { props. props.buttonsStatus?}  */}
            {newCount<=4  ?<button style={{ float: "right" }} onClick={onClickHandler} type="button" className="btn btn-dark">STEP {props.countStep}:{props.countStepName} </button> :<button style={{ float: "right", backgroundColor:"#FF00FF" }} type="button"  onClick={onClickHandlerMix} className="btn btn-success">START THE MIX</button>}
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
        {newCount<=4  ?<button style={{ float: "right" }} onClick={onClickHandler} type="button" className="btn btn-dark w-100">STEP {props.countStep}:{props.countStepName} </button> :<button style={{backgroundColor:"#FF00FF" }} type="button"  onClick={onClickHandlerMix} className="btn btn-success w-100">START THE MIX</button>}
        </div>
        <div className="col-12  ">
            {newCount > 2 ? <button type="button" onClick={onClickHandlerBack} className="btn btn-dark w-100">&#60;&#60; BACK </button> : null}

        </div>

        {/* { props.buttonslideName == "REGISTER TO ENJOY!" ?   <div className="col-6"> <button  style={{ float: "right" }} onClick={onClickHandler} type="button" className="btn btn-dark">{props.buttonslideName} </button> </div>: null}  */}
    </>
    )
}
}
}


export default CocktailButton