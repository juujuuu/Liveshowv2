import React from "react";

/**
 *
 * @param {String} show - Show acronym.
 * @param {Number} day - Current day.
 * @param {String} extraMode - stuff like the innovation agenda.
 * @returns Theme for that day to show.
 */

const getShowLogos= ({text}) => {
  
    let res

    let image

    const text2=text.toString().replace(/\s/g, '').replace("+", '').replaceAll(",", '').replaceAll("amp;", '')
    // text2.search("ANADHESIVESBONDINGSESSION") !== -1 ? res="YES": res="NOT"
   
   
    if(text2.search("APLENARYSESSION") !== -1){

        image=( <div> <img src="https://www.adhesivesandbondingexpo-europe.com/assets/resources/shared/images/logos/adhesives-and-management-expo-europe.png" className="session__img img-fluid"/>
         <img alt="Foam Expo Europe Logo" src="https://www.adhesivesandbondingexpo-europe.com/assets/resources/shared/images/logos/foam-expo-europe-co-located.png" className="session__img img-fluid"/>
         <img src=" https://www.thermalmanagementexpo-europe.com/assets/resources/shared/images/logos/thermal-management-expo-europe.png" className="session__img img-fluid"/>
        </div>)
    } 
     else if(text2.search("ATHERMALMANAGEMENTSESSION") !== -1){

        image=<img src=" https://www.thermalmanagementexpo-europe.com/assets/resources/shared/images/logos/thermal-management-expo-europe.png" className="session__img img-fluid"/>
    
     } else if(text2.search("AFOAMSESSION") !== -1){
        image=<img src="https://www.adhesivesandbondingexpo-europe.com/assets/resources/shared/images/logos/foam-expo-europe-co-located.png" className="session__img img-fluid"/>
     }
     else if(text2.search("AFOAMADHESIVESSESSION") !== -1){

        image=(<div><img src="https://www.adhesivesandbondingexpo-europe.com/assets/resources/shared/images/logos/foam-expo-europe-co-located.png" className="session__img img-fluid"/>
         <img src="https://www.adhesivesandbondingexpo-europe.com/assets/resources/shared/images/logos/adhesives-and-management-expo-europe.png" className="session__img img-fluid"/> 
         </div>)
    }
    else if(text2.search("AFOAMADHESIVESTHERMALSESSION") !== -1){

        image=( <div> <img src="https://www.adhesivesandbondingexpo-europe.com/assets/resources/shared/images/logos/adhesives-and-management-expo-europe.png" className="session__img img-fluid"/>
         <img alt="Foam Expo Europe Logo" src="https://www.adhesivesandbondingexpo-europe.com/assets/resources/shared/images/logos/foam-expo-europe-co-located.png" className="session__img img-fluid"/>
         <img src=" https://www.thermalmanagementexpo-europe.com/assets/resources/shared/images/logos/thermal-management-expo-europe.png" className="session__img img-fluid"/>
        </div>)
    }
    else if(text2.search("AFOAMADHESIVESSESSION") !== -1){

        image=( <div> 
        <img src="https://www.adhesivesandbondingexpo-europe.com/assets/resources/shared/images/logos/adhesives-and-management-expo-europe.png" className="session__img img-fluid"/>
         <img alt="Foam Expo Europe Logo" src="https://www.adhesivesandbondingexpo-europe.com/assets/resources/shared/images/logos/foam-expo-europe-co-located.png" className="session__img img-fluid"/>
         
        </div>)
    }
    else if(text2.search("ANADHESIVES&BONDINGSESSION") !== -1){

        image=( <div> 
        <img src="https://www.adhesivesandbondingexpo-europe.com/assets/resources/shared/images/logos/adhesives-and-management-expo-europe.png" className="session__img img-fluid"/>
         
         
        </div>)
    }
    else if(text2.search("ATHERMALMANAGEMENTADHESIVESSESSION") !== -1){

        image=( <div> 
        <img src="https://www.adhesivesandbondingexpo-europe.com/assets/resources/shared/images/logos/adhesives-and-management-expo-europe.png" className="session__img img-fluid"/>
         
        <img src=" https://www.thermalmanagementexpo-europe.com/assets/resources/shared/images/logos/thermal-management-expo-europe.png" className="session__img img-fluid"/>
        </div>)
    }


    return(
<div>
    {res}
{ image}
</div>
       
    )
    
};
export default getShowLogos;
