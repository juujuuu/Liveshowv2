import React from "react";

class StickyNav extends React.Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
		this.state = { offsetTop: 0, offsetBottom: 0 };
	}
	handleScroll = () => {
		console.log(this.ref.current.getBoundingClientRect());
		this.setState((prevState) => {
			prevState.offsetTop = this.ref.current.getBoundingClientRect().top;
			prevState.offsetBottom = this.ref.current.getBoundingClientRect().bottom;
			return prevState;
		});
	};
	componentDidMount = () => {
		window.addEventListener("scroll", this.handleScroll);
	};
    getAffix = () =>{
        return false;
        if(this.state.offsetTop < -300 && this.state.offsetBottom > 300){
            return "affix";
        } else{
            return "fixed-top";
        }
    }
	render() {
		return(
            <div className={`conference-agenda__secondary-nav secondary-nav--${this.getAffix()}`}>
                {this.props.children}
            </div>
        );
	}
}

export default StickyNav;
