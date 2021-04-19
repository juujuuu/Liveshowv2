import React from "react";
import Spinner from "./Spinner";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: props.mode,
			loading: true,
			data: null,
			renderList: null,
		};
	}

	getFullAgenda = (conf) => {
		this.sfGet(conf, "agenda").then((data) => {
			console.log(data);
			return;
		});
	};

	sfGet = async (id, mode = "agenda") => {
		if (mode == "agenda") {
			let url = `./rest/confman.php?call[]=presentation&call[]=session&confId=${id}`;
			try {
				let response = await fetch(url, {
					method: "GET", // *GET, POST, PUT, DELETE, etc.
					mode: "same-origin", // no-cors, *cors, same-origin
					cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
					credentials: "same-origin", // include, *same-origin, omit
					headers: {
						"Content-Type": "application/json",
					},
				});
				console.log(response);
				response.json().then((data) => {
					console.log(data);
				});
				//match presentations to sessions
				/*let presentations = data.presentation;
					data = data.session.map((session) => {
						//check if any presentations match the session id
						session.presentations = [];
						while (typeof presentations.find((presentation) => presentation.Session__c == session.Id) != undefined) {
							let found = presentations.find((presentation) => {
								return presentation.Session__c == session.Id;
							});
							let index = presentations.indexOf(found);
							if (index > -1) {
								presentations.splice(index, 1);
							}
							session.presentations.push(found);
						}
						return session;
					});
					return data;*/
			} catch (e) {
				console.error(e);
				return e;
			}
		}
	};

	componentDidMount = () => {
		//Initial loading
		switch (this.state.mode) {
			case "full-agenda":
				return this.getFullAgenda(this.props.options.conf);
				break;
			default:
				return this.getFullAgenda(this.props.options.conf);
		}
	};

	render() {
		if (this.state.loading) {
			return (
				<div className="conference-agenda conference-agenda--loading d-flex justify-content-center align-items-center">
					<Spinner />
				</div>
			);
		} else {
			return this.state.renderList;
			//return <NavMenu />;
		}
	}
}
export default App;
