import React from "react";
/**
 *
 */
class Cta extends React.Component {
    constructor(props) {
        super(props);
    }
    static defaultProps = {
        link: false,
        download: false,
        handler: false,
        children: "CTA",
        /* max, reg , micro*/
        size: "reg",
        curved: true,
        /*primary == override.  Can also use every other Sass class name from context blocks (like cex-red)*/
        color: "cex-red",
        active: true,
        value: false,
        role: false,
        margin: "vertical-margin--10",
    };
    handleClick = () => {
       // console.log("active")
        if (this.props.handler != false) {
            if (this.props.role == false) {
                this.props.handler();
            } else if (this.props.role == "expand") {
                this.props.handler(this.props.value);
            } else if (this.props.role == "collapse") {
                this.props.handler(this.props.value);
            } else if (this.props.role == "pop-form") {
                //handle by site jquery
            }
        }
        return;
    };
    render() {
        //Have to change the output slightly for based off parameters because jsx seems to have an annoying bug where you can't conditionally output attributes themselves, only what's in them.
        if (this.props.role != "pop-form") {
            return (
                <button
                    className={`confman__cta curved-cta curved-cta--${this.props.size} ${!this.props.curved ? "curved-cta--hard" : ""} curved-cta--${
                        this.props.color
                    } ${this.props.active ? "active" : ""} ${this.props.margin} rounded`}
                    onClick={this.handleClick}>
                    {this.props.link != false ? (
                        <a className="curved-cta__link" href={this.props.link} download={this.props.download} title={this.props.children}>
                            {this.props.children}
                        </a>
                    ) : (
                        <a className="curved-cta__link" title={this.props.children}>
                            {this.props.children}
                        </a>
                    )}
                </button>
            );
        } else {
            /* modal pop up form */
            return (
                <button
                    className={`confman__cta curved-cta confman__cta--reg-pop curved-cta--${this.props.size} ${
                        !this.props.curved ? "curved-cta--hard" : ""
                    } curved-cta--${this.props.color} ${this.props.active ? "active" : ""} ${this.props.margin} `}>
                    <a className="curved-cta__link" href={this.props.link} title={this.props.children}>
                        {this.props.children}
                    </a>
                </button>
            );
        }
    }
}
export default Cta;

// import React from "react";
// /**
//  *
//  */
// const Cta=({
//     link=false,
//     download= false,
//     handler=false,
//     children= "CTA",
//     /* max, reg , micro*/
//     size= "reg",
//     curved= true,
//     /*primary == override.  Can also use every other Sass class name from context blocks (like cex-red)*/
//     color= "cex-red",
//     active= true,
//     value= false,
//     role= false,
//     margin= "vertical-margin--10",
// })=>{
  
   
//     handleClick = () => {
//         if (handler != false) {
//             if (role == false) {
//                 handler();
//             } else if (role == "expand") {
//                 handler(value);
//             } else if (role == "collapse") {
//                 handler(value);
//             } else if (role == "pop-form") {
//                 //handle by site jquery
//             }
//         }
//         return;
//     };
  
//         //Have to change the output slightly for based off parameters because jsx seems to have an annoying bug where you can't conditionally output attributes themselves, only what's in them.
//         if (role != "pop-form") {
//             return (
//                 <button
//                     className={`confman__cta curved-cta curved-cta--${size} ${!curved ? "curved-cta--hard" : ""} curved-cta--${
//                         color
//                     } ${active ? "active" : ""} ${margin}`}
//                     onClick={handleClick}>
//                     {link != false ? (
//                         <a className="curved-cta__link" href={link} download={download} title={children}>
//                             {children}
//                         </a>
//                     ) : (
//                         <a className="curved-cta__link" title={children}>
//                             {children}
//                         </a>
//                     )}
//                 </button>
//             );
//         } else {
//             /* modal pop up form */
//             return (
//                 <button
//                     className={`confman__cta curved-cta confman__cta--reg-pop curved-cta--${size} ${
//                         !curved ? "curved-cta--hard" : ""
//                     } curved-cta--${color} ${active ? "active" : ""} ${margin}`}>
//                     <a className="curved-cta__link" href={link} title={children}>
//                         {children}
//                     </a>
//                 </button>
//             );
//         }
//     }

// export default Cta;
