import React from "react";

class Letter extends React.Component {
	constructor(props) {
		super(props);
	}
	static defaultprops = {
		value: "-1",
		handler: false,
	};
    handleClick = (event) =>{
        if(this.props.handler != false){
            this.props.handler(this.props.value);
        }
    }
	render() {
		return (
			<li className="confman__letter" onClick={this.handleClick}>
				{this.props.children}
			</li>
		);
	}
}

export default Letter;
