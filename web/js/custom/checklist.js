$(function () {
	const getTasks = async (expo, booth) => {
		let allTasks = await fetch(`../rest/getExhibtasks.php?expo=${expo}`);
		allTasks = await allTasks.json();

		let completedTasks = await fetch(`../rest/getCompletedTasks.php?booth=${booth}`);
		completedTasks = await completedTasks.json();
		console.log("Tasks: ", allTasks);
		console.log("Completed Tasks: ", completedTasks);
		if (allTasks) {			
			allTasks = allTasks.map(task => {
				if (completedTasks.hasOwnProperty(task.task_status_field_name__c)) { //Does booth object have a matching field
					task.status = completedTasks[task.task_status_field_name__c]; 
					if (task.Not_Applicable_Fields__c) {
						if (task.Not_Applicable_Fields__c.includes(task.task_status_field_name__c)) {
							task.status = "NA";
						}
					}
				} else {
					task.status = "NO MAPPING";
				}
				return task;
			});
		} else {
			throw "Fetch Error - Rest Controllers null response";
		}
		return allTasks;
	};
	const getStatus = status => {
		if (status) {
			if (status === "NA") {
				return "NOT APPLICABLE";
			} else if (status === "NO MAPPING") {
				throw "No status for task found on booth";
			} else {
				return "COMPLETED";
			}
		} else {
			return "NOT STARTED";
		}
	};
	const getSelect = ({ Id, Update_Method__c, status }) => {
		let content;
		try {
			status = getStatus(status);
		} catch (error) {
			console.error(error);
		}

		if (Update_Method__c === "automatic" || status === "NO MAPPING") {
			content = status;
		} else {
			let options;
			console.log("manual", status);
			if (status === "NOT STARTED") {
				options = `<option>NOT STARTED</option><option>COMPLETED</option><option>NOT APPLICABLE</option>`;
			} else if (status === "COMPLETED") {
				options = `<option>COMPLETED</option><option>NOT STARTED</option><option>NOT APPLICABLE</option>`;
			} else {
				options = `<option>NOT APPLICABLE</option><option>NOT STARTED</option><option>COMPLETED</option>`;
			}
			content = `<select class="form-select" id="sel--${Id}" name="sellist--${Id}">${options}</select>`;			
		}
		return `<td>${content}</td>`;
	};

	const constructTable = (tasks, type) => {
		let heading;
		if (type === "main") {
			heading = "Compulsory For All Exhibitors";
		} else {
			heading = "Optional for All Exhibitors";
		}
		tasks =
			type === "main"
				? tasks.filter(({ Is_Compulsory__c }) => Is_Compulsory__c === "compulsory")
				: tasks.filter(({ Is_Compulsory__c }) => Is_Compulsory__c === "optional");

		let rowsHTML = ``;
		tasks.forEach((task, index) => {
			const {
				Name,
				Deadline__c,
				CurrencyIsoCode,
				Instructions__c,
				Expo__c,
				Link__c,
				Order__c,
				task_status_field_name__c,
				Update_Method__c,
			} = task;
			let outputDate = new Date(Deadline__c);
			const month = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			];
			outputDate = outputDate.getUTCDate() + " " + month[outputDate.getUTCMonth()];

			rowsHTML = rowsHTML + `<tr>`;
			rowsHTML = rowsHTML + `<td><a style="color: #fff;" href="${Link__c}" target="_blank">${Instructions__c}</a></td>`;
			rowsHTML = rowsHTML + `<td>${Deadline__c ? outputDate : "ASAP"}</td>`;
			rowsHTML = rowsHTML + getSelect(task);
			rowsHTML = rowsHTML + `</tr>`;
		});

		let html = `<table class="table table-dark table-striped"><thead><tr><th>${heading}</th></tr></thead><thead><tr><th>Task</th><th>Deadline</th><th>Status</th></tr></thead><tbody>${rowsHTML}</tbody></table>`;
		return html;
	};

	$(document).ready(function () {
		const rootEl = $("#checklist-root");
		let tasks;
		// $(`#sel--${Id}`).change(event =>{
		// 	console.log(event);
		// 	console.log("click registering")
		// });
		if (rootEl.length > 0) {
			const expo = rootEl.attr("data-expo");
			const booth = rootEl.attr("data-booth");

			getTasks(expo, booth)
				.then(response => {
					console.log(response);
					const mainList = $("#checklist-main");
					const secondaryList = $("#checklist-secondary");

					const mainHTML = constructTable(response, "main");
					const secondaryHTML = constructTable(response, "secondary");

					mainList.append(mainHTML);
					secondaryList.append(secondaryHTML);					
					tasks = response;
				})
				.catch(error => {
					rootEl.append(`<h2 style="text-align: center;">An Unexpected error occured</h2>`);
					console.error("fetch error:  ", error);
				});
		}
	});
});
