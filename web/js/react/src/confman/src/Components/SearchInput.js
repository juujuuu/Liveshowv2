import React, { useState } from "react";

/**
 * Searchy component for the speaker list and full agenda
 * @param {object} props
 */
const SearchInput = ({ role = false, handler = false, placeholder = "", value }) => {
    const [internalValue, setinternalValue] = useState("");

    const handleChange = event => {
        const val = event.target.value;
        if (role == "conference-search") {
            setinternalValue(val);
        } else {
            if (handler != false) {
                handler(val);
            }
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (role != false) {
            if (handler != false) {
                let val = internalValue;
                handler(val);
            }
        }
    };

    //speaker list
    if (role == false) {
        return (
            <form className="confman__search confman__search--standard" onSubmit={handleSubmit}>
                <input id="confman__search" type="text" name="confman_search" placeholder={placeholder} value={value} onChange={handleChange} />
            </form>
        );
    } else {
        //full agenda
        return (
            <form className="confman__search confman__search--conference" onSubmit={handleSubmit}>
                <input onChange={handleChange} id="confman__search" type="text" name="confman_search" placeholder={placeholder} value={internalValue} />
                {role == "conference-search" ? <span onClick={handleSubmit}>{">"}</span> : ""}
            </form>
        );
    }
};

export default SearchInput;
