import React from "react";

class SearchInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: "" };
	}
	static defaultProps = {
		role: false,
		handler: false,
		placeholder: "",
		bonusClass: "",
	};
	handleChange = (event) => {
		const val = event.target.value;
		if (this.props.role == "conference-search") {
			this.setState((prevState) => {
				prevState.value = val;
				return prevState;
			});
		} else {
			if (this.props.handler != false) {
				this.props.handler(val);
			}
		}
	};
	handleSubmit = (event) => {
		event.preventDefault();
		if (this.props.role != false) {
			if (this.props.handler != false) {
				let val = this.state.value;
				this.props.handler(val);
			}
		}
	};

	render() {
		const { role, value, placeholder, bonusClass } = this.props;
		if (role == false) {
			return (
				<form className={`react__search react__search`} onSubmit={this.handleSubmit}>
					<input
						id="react__search"
						className={bonusClass}
						type="text"
						name="react__search"
						placeholder={placeholder}
						value={value}
						onChange={this.handleChange}
					/>
				</form>
			);
		} else if (role == "conference-search") {
			return (
				<form className="react__search react__search--conference" onSubmit={this.handleSubmit}>
					<input
						onChange={this.handleChange}
						id="confman__search"
						type="text"
						name="confman_search"
						placeholder={placeholder}
						value={value}
					/>
					<span onClick={this.handleSubmit}>{">"}</span>
				</form>
			);
		}
	}
}

export default SearchInput;
