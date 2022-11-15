import React from 'react'
export const Sponsors = ({show,href,src,alt,position,displayBanner}) => {

  const render=()=>{
    let html
    if(show.show==="BRE" && window.innerWidth > 768){
     html= <div className={`control-col__sponsor${position} vertical-margin--10 ${displayBanner}`}>
<a
       href={href}
       title="Italy at space Tech Expo Europe"
       target="_blank"> 
       <img
           style={{ width: "100%" }}
          //  src="./assets/resources/sat/web/images/misc/sponsor/SpaceTech_Top__Banner.jpg"
           //use an image in the same folder to najes it show otherwise it will error 
          src={src}
           className="img-fluid"
           alt={alt}
       />
    </a> 
</div>
}else{
html=""  
}
return html
  }

 
    return (
      <>{render()}</>
     
    )
 

  
}
