import React, { useState, useEffect } from "react";

import { fetchExpoTasks } from "./Utils.js/fetchExpoTaks";
import _ from "lodash";

import ChecklistRow from "./ChecklistRow";
import Spinner from "../../../common_components/Spinner";
import { fetchExhibTasksStatus } from "./Utils.js/fetchExhibTasksStatus";

const App = ({ initOptions }) => {
    const { expo, booth, context } = initOptions;
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(false);
    let [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (loading) {
            fetchExpoTasks(expo)
                .then((response) => {
                    fetchExhibTasksStatus(booth).then((response2) => {
                        console.log(response);
                        console.log(response2);
                        setTasks(mapTasks(response, response2));
                        setLoading(false);
                    });
                })
                .catch((error) => {
                    console.error("Fetch error", error);
                    setError(true);
                });
        }
    }, []);

    const mapTasks = (tasks, completedTasks) => {
        const { Not_Applicable_Fields__c } = completedTasks;
        tasks = tasks.map((task) => {
            const { task_status_field_name } = task;
            if (_.has(completedTasks, task_status_field_name)) {
                //Does at least have something to map to
                const status = completedTasks[task_status_field_name];
                if (Not_Applicable_Fields__c !== null && Not_Applicable_Fields__c.includes(task_status_field_name)) {
                    task.status = "NOT APPLICABLE";
                } else if (status !== null) {
                    task.status = "COMPLETE";
                } else {
                    task.status = "NOT STARTED";
                }
                return task;
            }
        });
        console.log(tasks);
        return tasks;
    };

    if (error) {
        return <h2>An unexpected error has occured</h2>;
    }
    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div className="portal-checklist">
                <ChecklistRow payload="{}" inputOptions={initOptions} />
            </div>
        );
    }
};
export default App;
