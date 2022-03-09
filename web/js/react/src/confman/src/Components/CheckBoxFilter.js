import React from "react";

const CheckBoxFilter = ({
	name = "Filter Name",
	inputClass = "filter-class",
	handler = false,
	checked = true,
	value = -1,
}) => {
	
	const handleClick = event => {
		if (handler != false) {
			handler(value);
		}
	};

	return (
		<div className={`checkbox-filter checkbox-filter--${inputClass}`}>
			<div className="checkbox-filter__checkbox">
				{checked ? (
					<>
						<i
							onClick={handleClick}
							className="bi bi-check-square-fill"
							style={{ cursor: "pointer" }}></i>
						<input type="checkbox" name={inputClass} checked hidden />
					</>
				) : (
					<>
						<i onClick={handleClick} className="bi bi-square" style={{ cursor: "pointer" }}></i>
						<input type="checkbox" name={inputClass} hidden />
					</>
				)}
			</div>
			<div className="checkbox-filter__name">
				<h3>{name}</h3>
			</div>
		</div>
	);
};
export default CheckBoxFilter;
