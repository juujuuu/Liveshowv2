import React, { Component } from "react";

export default class Alphabet extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	static defaultProps = {
		activeLetter: "Show All",
		handler: false,
	};

	handleClick = (event) => {
		const { innerText } = event.target;
		const { handler } = this.props;
		if (handler) {
			handler(innerText);
		}
	};

	getAlphabet = (props) => {
		const { activeLetter } = this.props;
		let letters = `Show All|0-9|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z`.split("|");

		return letters.map((letter) => {
			console.log("active letter: ", activeLetter, "Letter: ", letter, "Equal: ", activeLetter == letter);
			return (
				<span
					onClick={this.handleClick}
					className={`alphabet__letter alphabet__letter--${activeLetter == letter ? "active" : "inactive"}`}
					key={`letter--${letter}`}>
					{letter}
				</span>
			);
		});
	};

	render() {
		return <div className="alphabet row">{this.getAlphabet(this.props)}</div>;
	}
}
