import React from "react";
import Cta from "./Cta";
import ExpoSelector from "./ExpoSelector";

class MainMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = { query: "", offsetTop: 0, offsetBottom: 0 };
		this.ref = React.createRef();
	}

	resetQuery = () => {
		this.setState((prevState) => {
			this.props.searchHandler("");
			this.props.alphHandler("Show All");
			this.props.expoHandler("", "", true);
			prevState.query = "";
			return prevState;
		});
	};

	handleChange = (event) => {
		event.preventDefault();
		let val = event.target.value;
		this.setState((prevState) => {
			this.props.searchHandler(val);
			prevState.query = val;
			return prevState;
		});
	};
	handleSubmit = (event) => {
		event.preventDefault();
	};
	handleScroll = (event) =>{
		console.log(this.ref.current.getBoundingClientRect());
		this.setState(prevState=>{
			prevState.offsetTop = this.ref.current.getBoundingClientRect().top;
			prevState.offsetBottom = this.ref.current.getBoundingClientRect().bottom;
			return prevState;
		});
	}

	getMultiExpoCtas = (exposArray) => {
		if (exposArray.length >= 2) {
			let expoPickers = exposArray.map((expo, index) => {
				let infoObject;
				switch (expo) {
					case "a1x3A000001FLZr":
						infoObject = { show: "fmx", expo: expo };
						break;
					case "a1x3A000001FLZm":
						infoObject = { show: "abx", expo: expo };
						break;
					case "a1x4V000001Q9aU":
						infoObject = { show: "fme", expo: expo };
						break;
					case "a1x3A000001FOPe":
						infoObject = { show: "abe", expo: expo };
						break;
					default:
						break;
				}
				return (
					<div className="col-6 col-md-12">
						<ExpoSelector
							key={"ExpoSelector-" + infoObject.expo + "-" + this.props.resetIndex}
							show={infoObject.show}
							expo={infoObject.expo}
							clickHandler={this.props.expoHandler}
						/>
					</div>
				);
			});
			return <div className="main-menu__expo-pickers">{expoPickers}</div>;
		}
	};

	//Get cerion banenr for cex
	getCexSponsor = () => {
		return (
			<a
				href="https://cerionnano.com/?utm_source=ceramics-expo&utm_medium=display&utm_campaign=2021-ceramics-expo&utm_content=exhibitor-list-sponsor-banner-ad"
				target="_blank"
				className="main-menu__ctas__cerion-banner">
				<img src="./assets/web/js/react/src/exhibitors/src/assets/banner_cerion_360x80_v1.jpg" alt="Cerion banner" />
			</a>
		);
	};

	//should affix based off of window position
	shouldAffix = () =>{
		if(window.innerWidth < 990){
			if(this.state.offsetTop < -350){
				return "main-menu--fixed-top";
			} else{
				return "main-menu--default";
			}
		} else{
			if(this.state.offsetTop < -220 && this.state.offsetBottom > 300){
				return "main-menu--fixed-left";
			} else{
				return "main-menu--default";
			}
		}
	}
	componentDidMount = () => {
		window.addEventListener('scroll', this.handleScroll);
	}

	render() {
		return (
			<div ref={this.ref} className="col-md-4 main-menu">
				<div className={this.shouldAffix()}>
					<div className="main-menu__title">
						<div>
							<h4>Refine Results</h4>
							<Cta size="small" type="reset" text="Clear Filters" clickHandler={this.resetQuery} />
						</div>
						<hr />
					</div>
					<div className="main-menu__ctas">
						<form onSubmit={this.handleSubmit}>
							<div className="form-group mb-2">
								<input
									type="text"
									value={this.state.query}
									onChange={this.handleChange}
									className="form-control"
									id="query"
									placeholder="Refine By Keyword"
								/>
							</div>
						</form>
						{this.getMultiExpoCtas(this.props.expo.replace(/'/g, "").split(","))}
						<Cta size="max" clickHandler={this.props.pdfHandler} text="Download Full List PDF" />
						{this.props.options.pdf !== "" ? <Cta size="max" text="Convince Your Boss PDF" /> : ""}
						{this.props.options.reglink !== "" ? (
							<Cta size="max" type="reg">
								<a href={this.props.options.reglink} target="_blank" title="Register To Attend">
									Register To Attend
								</a>
							</Cta>
						) : (
							""
						)}
						{this.props.options.show == "CEX" || this.props.show == "CEX-Test" ? this.getCexSponsor() : ""}
					</div>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default MainMenu;
