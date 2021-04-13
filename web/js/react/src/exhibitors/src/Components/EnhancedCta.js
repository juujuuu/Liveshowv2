import React from "react";

class EnhancedCta extends React.Component {
	constructor(props) {
		super(props);
	}
	static defaultProps = {
		clickHandler: () =>{return},
		size: "reg",
		text: "Button"
	};
	getAssets = (assettypes) => {
		let returnArray = [];
		let index = 0;
		for (const property in assettypes) {
			if (assettypes[property]) {
				switch (property) {
					case "contact":
						returnArray.push(<span key={"glyph-" + index}><i className="bi bi-envelope-fill"></i></span>);
						break;
					case "downloads":
                        returnArray.push(<span key={"glyph-" + index}><i className="bi bi-file-earmark-fill"></i></span>);
						break;
					case "videos":
                        returnArray.push(<span key={"glyph-" + index}><i className="bi bi-play-circle-fill"></i></span>);
						break;
					case "products":
                        returnArray.push(<span key={"glyph-" + index}><i className="bi bi-cart-fill"></i></span>);
						break;
					case "news":
                        returnArray.push(<span key={"glyph-" + index} className="glyphicon glyphicon-education"></span>);
						break;
					default:
						break;
				}
			}
			index++;
        }
		return returnArray;
	};
	handleClick = () => {
		console.log("click");
		if (typeof this.props.clickHandler === undefined) {
			return;
		}
		this.props.clickHandler();
	};
	render() {
		let type = this.props.type !== null ? `enhanced-exhibitors__cta--${this.props.type}` : ``;
		let classes = `enhanced-exhibitors__cta enhanced-exhibitors__cta--${this.props.size} ${type}`;
		return (
			<button className={classes} onClick={this.handleClick}>
				<span>{this.props.text}</span>
				<span className="glyph-container">{this.getAssets(this.props.assettypes)}</span>
			</button>
		);
	}
}

export default EnhancedCta;
