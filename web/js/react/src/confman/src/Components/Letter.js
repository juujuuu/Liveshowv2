import React from "react";
/**
 * Letters for the alphabet filter on the Speaker list.
 * @param {object} props
 */
const Letter = ({ value = "-1", handler = false, children }) => {
    const handleClick = event => {
        if (handler != false) {
            handler(value);
        }
    };
    return (
        <a className="confman__letter" onClick={handleClick}>
            {children}
        </a>
    );
};

export default Letter;
