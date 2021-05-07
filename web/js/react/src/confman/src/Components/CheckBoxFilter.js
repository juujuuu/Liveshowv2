import React from "react";

class CheckBoxFilter extends React.Component {
	constructor(props) {
		super(props);
	}
	static defaultProps = {
		name: "Filter Name",
		class: "filter-class",
		handler: false,
		checked: true,
		value: -1,
	};
	handleClick = (event) => {
		if (this.props.handler != false) {
			this.props.handler(this.props.value);
		}
	};

	render() {
		return (
			<div className={`checkbox-filter checkbox-filter--${this.props.class}`}>
				<div className="checkbox-filter__checkbox">
					{this.props.checked ? (
						<>
							<i onClick={this.handleClick} className="bi bi-check-square-fill" style={{cursor: "pointer"}}></i>
							<input type="checkbox" name={this.props.class} checked hidden />
						</>
					) : (
						<>
							<i onClick={this.handleClick} className="bi bi-square" style={{cursor: "pointer"}}></i>
							<input type="checkbox" name={this.props.class} hidden />
						</>
					)}
				</div>
				<div className="checkbox-filter__name">
					<h3>{this.props.name}</h3>
				</div>
			</div>
		);
	}
}
export default CheckBoxFilter;
