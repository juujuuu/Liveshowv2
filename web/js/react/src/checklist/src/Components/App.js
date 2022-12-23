import React, { useState, useEffect } from "react";

import { fetchExpoTasks } from "../Utils/fetchExpoTasks";
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

    const updateList = (_id, _status) =>{
        console.log("old tasks: ", tasks);
        let task = tasks.find(({Id})=>_id === Id);
        
        task.status = task.status === "COMPLETED" ? "NOT STARTED" : "COMPLETED";
        const index = tasks.findIndex(({Id})=>_id === Id);

        let newTasks = [...tasks];
        newTasks[index] = task;
        console.log("new tasks: ", newTasks);
        setTasks(newTasks);
    };

    const mapTasks = (tasks, completedTasks) => {
        console.log("mapTasks input", tasks, completedTasks);
        const { Not_Applicable_Fields__c } = completedTasks;
        tasks = tasks.map(task => {
        
            const { task_status_field_name__c } = task;
            if (_.has(completedTasks, task_status_field_name__c)) {
                //Does at least have something to map to
                const status = completedTasks[task_status_field_name__c];
            
                if (Not_Applicable_Fields__c !== null && Not_Applicable_Fields__c.includes(task_status_field_name__c)) {
                    task.status = "NOT APPLICABLE";
                }else if(status == false )  {
                   
                        task.status = "NOT STARTED";
                }
                 else if (status !== null || status ===true) {
                    task.status = "COMPLETED";
                   
                }
                else {
                    task.status = "NOT STARTED";
                }
                return task;
            }
            return task;
        });
        console.log("tasks after map1", tasks);
        tasks = tasks.filter(task => task !== undefined);
        console.log("tasks after undefineds removed", tasks);
        tasks = tasks.sort((a, b) => {
            const { Order__c: aOrder } = a;
            const { Order__c: bOrder } = b;
            return aOrder - bOrder;
        });
        return tasks;
    };

    const getAutomaticTable = tasks => {
        tasks = tasks.map(task => <ChecklistRow payload={{ ...task, booth }} updateList={updateList} inputOptions={initOptions} key={`checklist row ${task.Id}`} />);
        return (
            <>
                <h3>Automatic Tasks</h3>
                <p>(These tasks will complete automatically once submitted)</p>
                <table className="table portal-checklist__table">
                    <tbody>{tasks}</tbody>
                </table>
            </>
        );
    };

    const getManualTable = tasks => {
        tasks = tasks.map(task => <ChecklistRow payload={{ ...task, booth }} updateList={updateList} inputOptions={initOptions} key={`checklist row ${task.Id}`} />);
        return (
            <>
                <h3>Manual Tasks</h3>
                <p>(Manual tasks will take a couple of seconds to refresh)</p>
                <table className="table portal-checklist__table">
                    <tbody>{tasks}</tbody>
                </table>
            </>
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
                {getAutomaticTable(tasks.filter(task => task.Update_Method__c === "automatic"))}
                {getManualTable(tasks.filter(task => task.Update_Method__c !== "automatic"))}
            </div>
        );
    }
};
export default App;
