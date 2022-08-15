import React from "react";
import { useRef } from "react";
import { pushTaskStatus } from "../Utils/pushTaskStatus";

const ChecklistRow = ({ payload, inputOptions }) => {
    const { Instructions__c, Id, Deadline__c, Update_Method__c, status, booth, task_status_field_name__c } = payload;

    let ref = useRef();

    const getDeadline = ([day, month]) => {
        switch (month) {
            case 0:
                month = "January";
                break;
            case 1:
                month = "February";
                break;
            case 2:
                month = "March";
                break;
            case 3:
                month = "April";
                break;
            case 4:
                month = "May";
                break;
            case 5:
                month = "June";
                break;
            case 6:
                month = "July";
                break;
            case 7:
                month = "August";
                break;
            case 8:
                month = "September";
                break;
            case 9:
                month = "October";
                break;
            case 10:
                month = "November";
                break;
            case 11:
                month = "December";
                break;
        }
        return `${day} ${month}`;
    };

    let deadline;
    if (Deadline__c) {
        deadline = new Date(Deadline__c.split("-")[0], Deadline__c.split("-")[1] - 1, Deadline__c.split("-")[2]);
        deadline = getDeadline([deadline.getDate(), deadline.getMonth()]);
    } else {
        deadline = "ASAP";
    }
    const handleClick = event => {
        console.log("trying to update booth");
        if (Update_Method__c === "automatic") {
            return;
        } else {
            pushTaskStatus(payload);
        }
    };

    return (
        <tr id={Id} className={`potal-checklist__row portal-checklist__row--${status} portal-checklist__row--${Update_Method__c}`}>
            <td className={`portal-checklist__instruction`} colspan="2">
                <div>
                    <p>
                        <strong>{Instructions__c}</strong>
                    </p>
                </div>
            </td>
            <td className={`portal-checklist__deadline`}>
                <div>
                    <p>
                        <strong>{deadline}</strong>
                    </p>
                </div>
            </td>
            <td className={`portal-checklist__checkbox`}>
                <div>
                    {status === "COMPLETED" ? (
                        <>
                            <i ref={ref} onClick={() => handleClick()} className="bi bi-check-square"></i>
                            <input type="checkbox" name={Id} checked hidden />
                        </>
                    ) : (
                        <>
                            <i ref={ref} onClick={() => handleClick()} className="bi bi-square"></i>
                            <input type="checkbox" name={Id} hidden />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
};
export default ChecklistRow;
