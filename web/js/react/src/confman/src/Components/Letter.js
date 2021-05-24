import React from "react";

class Letter extends React.Component {
	constructor(props) {
		super(props);
	}
	static defaultProps = {
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
			<a className="confman__letter" onClick={this.handleClick}>
				{this.props.children}
			</a>
		);
	}
}

export default Letter;
