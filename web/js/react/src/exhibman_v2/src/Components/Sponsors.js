import React from 'react'
export const Sponsors = ({show,href,src,alt,position,displayBanner}) => {

  const render=()=>{
    let html
    let style,textAlignImage
  // if(show.show==="CEX" && window.innerWidth > 768){
    if(show.show==="BRE-1"){
       html="" 
       {   

  position=="-top" 
  ? 
 (src="https://www.spacetechexpo-europe.com/assets/resources/bre/ita-exhibitor-sponsor-banner.jpg", style= "40%",textAlignImage="right" )
  
:
  (src="./assets/resources/bre/ita-exhibitor-sponsor-banner.jpg",style= " 100%" )
  
  html= <div style= {{ textAlign:textAlignImage}} className={`control-col__sponsor${position} vertical-margin--10 ${displayBanner}`}>


<a
    href={"https://www.ice.it/en"}
    title="ITA - ITALIAN TRADE AGENCY"
    target="_blank"> 
    <img
        style= {{ width:style}}
        
       //  src="./assets/resources/sat/web/images/misc/sponsor/SpaceTech_Top__Banner.jpg"
        //use an image in the same folder to najes it show otherwise it will error 
       src={src}
        className="img-fluid"
        alt={"ITA - ITALIAN TRADE AGENCY"}
    />
 </a> 
</div> 

}
//} else if  (show.show==="ABE" && window.innerWidth > 768){
} else if  (show.show==="ABE"){
  let style,textAlignImage
  position=="-top" ?
   (src="/assets/resources/abe/web/images/misc/sponsor/gergonne-logo-exibitor-list.jpg", style= "40%",textAlignImage="right" )
   :
   (src="https://www.adhesivesandbondingexpo-europe.com/assets/resources/abe/web/images/misc/sponsor/gergonne-logo-exibitor-list.jpg",style= " 100%" )
  
  html= <div style= {{ textAlign:textAlignImage}} className={`control-col__sponsor${position} vertical-margin--10 ${displayBanner}`}>
<a
    href={"https://www.gergonne.com/en/"}
    title="Gergonne in Europa (Deutsch)"
    target="_blank"> 
    <img
        style= {{ width:style}}
        
       //  src="./assets/resources/sat/web/images/misc/sponsor/SpaceTech_Top__Banner.jpg"
        //use an image in the same folder to najes it show otherwise it will error 
       src={src}
        className="img-fluid"
        alt={"Gergonne Logo"}
    />
 </a> 
</div>
}
else{
html=""  
}
return html
  }

 
    return (
      <>{render()}</>
     
    )
 

  
}
