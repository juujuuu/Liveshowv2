import React from 'react'
export const Sponsors = ({show,href,src,alt,position,displayBanner}) => {

  const render=()=>{
    let html
    let style,textAlignImage
  // if(show.show==="CEX" && window.innerWidth > 768){
    if(show.show==="CEX"){
       html="" 
       {   

  position=="-top" 
  ? 
  (src="./assets/resources/cex/images/onpage/sponsors/custom-processing-services.svg", style= "40%",textAlignImage="right" )
  :
  (src="./assets/resources/cex/images/onpage/sponsors/custom-processing-services.svg",style= " 100%" )
  
  html= <div style= {{ textAlign:textAlignImage}} className={`control-col__sponsor${position} vertical-margin--10 ${displayBanner}`}>


<a
    href={"https://www.customprocessingservices.com/"}
    title="Custom Processing Services"
    target="_blank"> 
    <img
        style= {{ width:style}}
        
       //  src="./assets/resources/sat/web/images/misc/sponsor/SpaceTech_Top__Banner.jpg"
        //use an image in the same folder to najes it show otherwise it will error 
       src={src}
        className="img-fluid"
        alt={"Custom Processing Services"}
    />
 </a> 
</div> 

}
//} else if  (show.show==="ABE" && window.innerWidth > 768){
} else if  (show.show==="ABE"){
  let style,textAlignImage
  position=="-top" ?
   (src="./assets/resources/abe/web/images/misc/sponsor/Nitto_logo-exibitor-list.jpg", style= "40%",textAlignImage="right" )
   :
   (src="./assets/resources/abe/web/images/misc/sponsor/Nitto_logo-exibitor-list.jpg",style= " 100%" )
  
  html= <div style= {{ textAlign:textAlignImage}} className={`control-col__sponsor${position} vertical-margin--10 ${displayBanner}`}>
<a
    href={"https://www.nitto.com/eu/en/"}
    title="Nitto in Europa (Deutsch)"
    target="_blank"> 
    <img
        style= {{ width:style}}
        
       //  src="./assets/resources/sat/web/images/misc/sponsor/SpaceTech_Top__Banner.jpg"
        //use an image in the same folder to najes it show otherwise it will error 
       src={src}
        className="img-fluid"
        alt={"Nitto Logo"}
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
