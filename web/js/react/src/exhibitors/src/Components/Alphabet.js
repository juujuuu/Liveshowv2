import React from "react";

class Alphabet extends React.Component {
	constructor(props) {
		super(props);
		this.state = { active: "Show All" };
	}

	handleClick = (event) => {
		let selected = event.target.innerHTML;
		this.props.handler(selected);
		//this.setState({ active: selected });
	};
	getActive = (letter) => {
		if (this.props.active == letter) {
			return { fontWeight: "bold" };
		} else {
			return { fontWeight: "normal" };
		}
	};

	alphabet = () => {
		let arr = [];
		arr.push("Show All");
		arr.push("0-9");
		let alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		arr = arr.concat(alph.split(""));

		return (
			<>
				{arr.map((item, index) => {
					return (
						<span key={"alph-" + index} onClick={this.handleClick} style={this.getActive(item)}>
							{item}
						</span>
					);
				})}
			</>
		);
	};

	render() {
		return (
			<div className="row enhanced-exhibitors__alphabet">
				<div className="col-sm-12">
					<div>{this.alphabet()}</div>
				</div>
			</div>
		);
	}
}

export default Alphabet;
