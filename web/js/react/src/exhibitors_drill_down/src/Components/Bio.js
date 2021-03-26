import React from "react";

class Bio extends React.Component {
	constructor(props) {
		super(props);
		this.state = { logo: "", webbio: "" };
	}

	componentDidMount = () => {
		this.setState({ logo: this.props.logo, webbio: this.props.webbio });
		let logo, webbio;
		if (this.props.logo === null) {
			logo = "../assets/files/images/coming-soon.jpg";
			this.setState((prevState) => {
				prevState.logo = logo;
				return prevState;
			});
		}
		if (this.props.webbio === null) {
			webbio = "Coming soon...";
			this.setState((prevState) => {
				prevState.webbio = webbio;
				return prevState;
			});
		}
	};

	getCats = (cats) => {
		if (!cats) {
			return;
		}
		cats = cats.split(";");
		cats = cats.map((cat, index) => {
			if (index + 1 !== cats.length) {
				return (
					<React.Fragment key={"cat-" + index}>
						{cat}
						{" / "}
					</React.Fragment>
				);
			} else {
				return <React.Fragment key={"cat-" + index}>{cat}</React.Fragment>;
			}
		});
		return <>{cats}</>;
	};
	render() {
		return (
			<div className="exhibitor-drilldown__bio row">
				<div>
					<div className="logo">
						<a href={this.props.link.includes("http") ? this.props.link : "http://" + this.props.link} title={this.props.name}>
							<img src={this.state.logo} alt={this.props.name} />
						</a>
					</div>
					<div className="body">
						<p className="short-bio">{this.state.webbio}</p>
						<div className="long-bio" dangerouslySetInnerHTML={{ __html: this.props.enhancedbio }}></div>
						{this.props.cats ? (
							<div className="cats">
								<p>
									<i>
										<span>Categories: </span>
										{this.getCats(this.props.cats)}
									</i>
								</p>
							</div>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		);
	}
}
export default Bio;
