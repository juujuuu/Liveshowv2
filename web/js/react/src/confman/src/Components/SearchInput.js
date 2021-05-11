import React from "react";

class SearchInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: "" };
	}
	static defaultprops = {
		role: false,
		handler: false,
	};
	handleChange = (event) => {
		let val = event.target.value;
		this.setState((prevState) => {
			prevState.value = val;
			return prevState;
		});
	};
	handleSubmit = (event) => {
		event.preventDefault();
		if (this.props.handler != false) {
			let val = this.state.value;
			this.props.handler(val);
		}
	};

	render() {
		return (
			<form className="confman__search" onSubmit={this.handleSubmit}>
				<input onChange={this.handleChange} id="confman__search" type="text" name="confman_search" placeholder="" value={this.state.value} />
				{this.props.role == "conference-search" ? <span onClick={this.handleSubmit}>{">"}</span> : ""}
			</form>
		);
	}
}

export default SearchInput;
