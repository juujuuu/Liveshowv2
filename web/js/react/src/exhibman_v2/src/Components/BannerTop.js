import React from 'react'
export const BannerTop = (props) => {

  const show=()=>{
    let html
    if(props.show.show==="BRE"){
     html= <div className="control-col__sponsor-top vertical-margin--10 d-none d-md-block">
<a
       href="https://www.ice.it/en/ "
       title="Italy at space Tech Expo Europe"
       target="_blank"> 
       <img
           style={{ width: "100%" }}
           src="./assets/resources/sat/web/images/misc/sponsor/SpaceTech_Top__Banner.jpg"
           //use an image in the same folder to najes it show otherwise it will error 
          // src="./large.jpg"
           className="img-fluid"
           alt="Italy at space Tech Expo Europe"
       />
    </a> 
</div>
}else{
html=""  
}
return html
  }

 
    return (
      <>{show()}</>
     
    )
 

  
}
