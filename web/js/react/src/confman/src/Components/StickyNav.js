import React, { useRef, useState, useEffect } from "react";
/**
 * Container component for sticky elements
 * @param {object} param0
 * @returns
 */
const StickyNav = ({ children, role = false, startAffix = 0, endAffix = 2000 }) => {
    let ref = useRef();
    /**
     * Few bits of state for recording position.
     */
    const [offsetTop, setOffsetTop] = useState(0);
    const [offsetBottom, setOffsetBottom] = useState(0);
    const [offsetWidth, setOffsetWidth] = useState(false);

    //Run this code on window scroll
    const handleScroll = event => {
        //something here
        const { current } = ref;
        setOffsetTop(current.getBoundingClientRect().top);
        setOffsetBottom(current.getBoundingClientRect().bottom);
        setOffsetWidth(current.offsetWidth);
    };

    //On initial component mount, add a window scroll listener.
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);

    //Determaine whether to affix not based off page scroll position.
    const getAffix = () => {
        if (offsetTop < 0 && offsetTop + document.body.clientHeight > 2000) {
            return "affix";
        } else {
            return "fixed-top";
        }
    };

    return (
        <div className="sticky-container" ref={ref}>
            <div
                className={`confman__side-nav conference-agenda__secondary-nav secondary-nav--${getAffix()}`}
                style={offsetWidth != false ? { width: offsetWidth } : {}}>
                {children}
            </div>
        </div>
    );
};

export default StickyNav;
