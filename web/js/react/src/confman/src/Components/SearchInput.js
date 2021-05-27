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
		if (this.props.role == false) {
			return (
				<form className="confman__search confman__search--standard" onSubmit={this.handleSubmit}>
					<input
						id="confman__search"
						type="text"
						name="confman_search"
						placeholder={this.props.placeholder}
						value={this.props.value}
						onChange={this.handleChange}
					/>
				</form>
			);
		} else {
			return (
				<form className="confman__search confman__search--conference" onSubmit={this.handleSubmit}>
					<input
						onChange={this.handleChange}
						id="confman__search"
						type="text"
						name="confman_search"
						placeholder={this.props.placeholder}
						value={this.state.value}
					/>
					{this.props.role == "conference-search" ? <span onClick={this.handleSubmit}>{">"}</span> : ""}
				</form>
			);
		}
	}
}

export default SearchInput;
