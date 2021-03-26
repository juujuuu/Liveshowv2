import React from "react";

class QuickMenu extends React.Component {
	constructor(props) {
		super(props);
		console.log(props.types);
		this.state = {};
	}

	handleClick = (event) => {
		let jump = event.target.getAttribute("target");
		document.getElementById(jump).scrollIntoView({ behavior: "smooth" });
		document.getElementById(jump).scrollTop -= 50;
	};

	populateMenu = (types) => {
		console.log("types");
		console.log(types);
		if(!types.length > 0){
			return;
		}
		types = types.map((type, index) => {
			let typeObj = {};
			//More ui friendly names
			switch (type) {
				case "Downloadable Resource":
					typeObj.ui = "Resource Downloads";
					typeObj.jump = "downloads";
					break;
				case "Product":
					typeObj.ui = "Featured Products";
					typeObj.jump = "products";
					break;
				case "Video":
					typeObj.ui = "Videos";
					typeObj.jump = "videos";
					break;
				case "News":
					typeObj.ui = "News Articles";
					typeObj.jump = "news";
					break;
				default:
					break;
			}
			return (
				<span target={typeObj.jump} onClick={this.handleClick} key={"quick-" + index}>
					{typeObj.ui}
				</span>
			);
		});
		return <p>Jump to: {types}</p>;
	};

	render() {
		return (
			<div className="exhibitor-drilldown__quickMenu">
				{this.populateMenu(this.props.types)}
			</div>
		);
	}
}
export default QuickMenu;
