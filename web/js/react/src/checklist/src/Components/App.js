import React, { useState, useEffect } from "react";

import { fetchExpoTasks } from "../Utils/fetchExpoTaks";
import _ from "lodash";

import ChecklistRow from "./ChecklistRow";
import Spinner from "../../../common_components/Spinner";
import { fetchExhibTasksStatus } from "../Utils/fetchExhibTasksStatus";

const App = ({ initOptions }) => {
    const { expo, booth, context } = initOptions;
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(false);
    let [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (loading) {
            fetchExpoTasks(expo)
                .then(response => {
                    fetchExhibTasksStatus(booth).then(response2 => {
                        setTasks(mapTasks(response, response2));
                        setLoading(false);
                    });
                })
                .catch(error => {
                    console.error("Fetch error", error);
                    setError(true);
                });
        }
    }, []);

    const mapTasks = (tasks, completedTasks) => {
        const { Not_Applicable_Fields__c } = completedTasks;
        tasks = tasks.map(task => {
            const { task_status_field_name__c } = task;
            if (_.has(completedTasks, task_status_field_name__c)) {
                //Does at least have something to map to
                const status = completedTasks[task_status_field_name__c];
                if (Not_Applicable_Fields__c !== null && Not_Applicable_Fields__c.includes(task_status_field_name__c)) {
                    task.status = "NOT APPLICABLE";
                } else if (status !== null) {
                    task.status = "COMPLETED";
                } else {
                    task.status = "NOT STARTED";
                }
                return task;
            }
        });
        tasks = tasks.filter(task => task !== undefined);
        tasks = tasks.filter(task => task.Update_Method__c === "automatic"); //temp automatics only
        return tasks;
    };

    const getTable = tasks => {
        tasks = tasks.map(task => <ChecklistRow payload={task} inputOptions={initOptions} key={`checklist row ${task.Id}`} />);
        return (
            <table className="table portal-checklist__table">
                <tbody>{tasks}</tbody>
            </table>
        );
    };

    const getPercentage = tasks => {
        const total = tasks.length;
        let count = 0;
        tasks.forEach(task => {
            if (task.status === "COMPLETED") {
                count++;
            }
        });
        return Math.floor((count / total) * 100);
    };

    if (error) {
        return <h2>An unexpected error has occured</h2>;
    } else if (loading) {
        return <Spinner />;
    } else {
        return (
            <div className="portal-checklist">
                <h2 className="portal-checklist__completion">
                    <strong>CHECKLIST -</strong> <i>{getPercentage(tasks)}%</i> COMPLETE
                </h2>
                {getTable(tasks)}
            </div>
        );
    }
};
export default App;
