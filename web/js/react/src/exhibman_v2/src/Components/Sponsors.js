import React from 'react'
export const Sponsors = ({show,href,src,alt,position,displayBanner}) => {

  const render=()=>{
    let html
  if(show.show==="BRE" && window.innerWidth > 768){
       html=""
  {     /*  position=="-top" ? src="./large.jpg":src="./small.jpg"
     html= <div className={`control-col__sponsor${position} vertical-margin--10 ${displayBanner}`}>
<a
       href={"https://www.ice.it/en/"}
       title="Italy at space Tech Expo Europe"
       target="_blank"> 
       <img
           style={{ width: "100%" }}
          //  src="./assets/resources/sat/web/images/misc/sponsor/SpaceTech_Top__Banner.jpg"
           //use an image in the same folder to najes it show otherwise it will error 
          src={src}
           className="img-fluid"
           alt={"Italy at space Tech Expo Europe"}
       />
    </a> 
</div> */}
} else if  (show.show==="ABE" && window.innerWidth > 768){
  let style,textAlignImage
  position=="-top" ? (src="./assets/resources/abe/web/images/misc/sponsor/Nitto_logo-exibitor-list.jpg", style= "40%",textAlignImage="right" ):(src="./assets/resources/abe/web/images/misc/sponsor/Nitto_logo-exibitor-list.jpg",style= " 100%" )
  
  html= <div style= {{ textAlign:textAlignImage}} className={`control-col__sponsor${position} vertical-margin--10 ${displayBanner}`}>
<a
    href={"https://www.ice.it/en/"}
    title="Italy at space Tech Expo Europe"
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
