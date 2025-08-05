// import React from "react";

// /**
//  * The big Day buttons at the top of the full agenda
//  */
// class MainNavButton extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     static defaultProps = {
//         children: "XXX",
//         active: false,
//         handler: false,
//         value: -1,
//         active: false,
//     };
//     handleClick = event => {
//         if (this.props.handler != false) {
//             this.props.handler(this.props.value);
//         }
//     };
//     render() {
//         return (
//             <div className={`main-nav__nav-button day-${this.props.value} ${this.props.active ? "active" : ""}`} onClick={this.handleClick}>
//                 <h3>{this.props.children}</h3>
//             </div>
//         );
//     }
// }
// export default MainNavButton;
import React, { useEffect } from "react";
import { connect,useSelector,useDispatch } from "react-redux";
import { setDay,setOpenSlides} from "../Actions";



/**
 * The big Day buttons at the top of the full agenda
 */
const MainNavButton =(props)=>{
    
    const dispatch=useDispatch()
    const openSlides = useSelector(state => state.openSlides)

    MainNavButton.defaultProps = {
        children: "XXX",
        active: false,
        handler: false,
        value: -1,
        active: false,
    };
    const handler=useSelector(state=>state.filters.day)
  
   const handleClick = event => {
        if (props.handler != false) {
            dispatch(setDay(props.value));
         
                                   
            
        }
    };
   
        return (
            <div className={`main-nav__nav-button day-${props.value} ${props.active ? "active" : ""}`} onClick={handleClick}>
                
                {(props.options.show == "TEE" ||props.options.show == "ABE" || props.options.show == "FME"?
               
                <span>  
               <h3> {props.children[0]}</h3>
               <h4 className="button-theme d-flex justify-content-center">{props.children[1]}</h4></span>:
                <h3>{props.children}</h3>
                )}
            </div>
        );
    
}
export default MainNavButton;

