import React from "react";
const cocktailIntros=({show,sessions,showName})=>{


    switch (show) {
        case "FMX":
        case "ABX":
        case "FME":
        case "ABE":
        case "TEE":
           return(<div className="header__container__text col-12 col-md-6 order-2 order-md-0">
            <h1 className="header__container__text--title text-dark lh-1"><b>THE PERFECT CONFERENCE COCKTAIL</b></h1>
            <p className="header__container__text--intro text-dark pb-2">Sit back and let us create your perfect personalized mix of conference sessions from the extensive program at  <b>{showName}</b>. With more than  <b>{sessions.length} sessions </b>, and
            <b className=""> 60 sector leaders</b>, we have all the ingredients needed to serve you a flawless slice of conference learning.</p>
    
           <p className="header__container__text--intro"> <b>Simply ‘START THE MIX’, make your selections, and within a few seconds, we will have THREE conference cocktail blends ready to share!    </b></p>
        </div>)
    
        case "BRE":
             return(<div className="header__container__text col-12 col-md-6 order-2 order-md-0">
            <h1 className="header__container__text--title text-dark lh-1"><b>THE PERFECT CONFERENCE COCKTAIL</b></h1>
            <p className="header__container__text--intro text-dark pb-2">Searching for a quick way to find the perfect conference sessions to watch? Sit back and let us create your perfect personalised mix of conference sessions from the extensive programmes at  <b>{showName}</b>. With more than  <b>40 sessions</b>, and
            <b className=""> over 150 expert speakers</b>, we have all the ingredients needed to serve you your perfect conference cocktail.</p>
        
           <p className="header__container__text--intro"> <b>Simply ‘START THE MIX’, make your selections, and within a few seconds, we will have THREE conference cocktail blends ready to share!    </b></p>
        </div>)
           default:
            return "Acronym not found";
    
            }
            
           
           
    }

    export default cocktailIntros