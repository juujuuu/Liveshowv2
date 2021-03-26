import React from "react";

class ExpoSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = { active: true };
	}
	static defaultProps = {
		clickHandler: (a = 1) => {
			return;
		},
		show: "fmx",
		expo: "",
	};
	getText = (acronym) => {
		let name;
		switch (acronym) {
			case "fmx":
				name = "Foam Expo North America";
				break;
			case "abx":
				name = "Adhesives & Bonding Expo";
				break;
			case "fme":
				name = "Foam Expo Europe";
				break;
			case "abe":
				name = "Adhesives & Bonding Expo Europe";
				break;
			default:
				name = "Unkown expo Id";
				break;
		}
		return name;
	};

	handleClick = () => {
		this.props.clickHandler(this.props.expo, !this.state.active);
		this.setState((prevState) => {
			prevState.active = !prevState.active;
			return prevState;
		});
	};
	render() {
		
		let classes = `enhanced-exhibitors__cta enhanced-exhibitors__cta--max exhibitors__cta--checkbox-cta exhibitors__cta--flagged-${
			this.props.show
		} ${this.state.active ? "active" : "inactive"}`;
		return (
			<button className={classes} onClick={this.handleClick}>
				<div>
					<span className="exhibitors__cta--checkbox-text">{this.getText(this.props.show)}</span>
					{this.state.active ? (
						<span className="exhibitors__cta--checkbox-cta__checkbox hidden-xs">
							<img src="../assets/web/js/react/src/exhibitors/src/assets/tick.png" alt="tick" />
						</span>
					) : (
						""
					)}
				</div>
			</button>
		);
	}
}

export default ExpoSelector;
