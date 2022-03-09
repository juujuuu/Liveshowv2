import React, { useRef, useState, useEffect } from "react";

const StickyNav = ({ children, role = false, startAffix = 0, endAffix = 2000 }) => {
	let ref = useRef();
	const [offsetTop, setOffsetTop] = useState(0);
	const [offsetBottom, setOffsetBottom] = useState(0);
	const [offsetWidth, setOffsetWidth] = useState(false);

	const handleScroll = event => {
		//something here
		const {current} = ref;
		setOffsetTop(current.getBoundingClientRect().top);
		setOffsetBottom(current.getBoundingClientRect().bottom);
		setOffsetWidth(current.offsetWidth);
	};
	
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
	}, []);

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
