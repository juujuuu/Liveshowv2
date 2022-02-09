/**
 * Split an array of ids into a nice comma delimited string for apis
 * @param {array} ids
 * @returns comma delimited string
 */
const sanitizeIds = ids => {
	if (!(ids instanceof Array)) {
		return ids;
	} else {
		let newIds;
		if (ids.length > 1) {
			ids.forEach(id => {
				newIds = newIds + id + ", ";
			});
			newIds = newIds.substring(0, newIds.length - 1);
		} else {
			newIds = ids[0];
		}
		return newIds;
	}
};
export default sanitizeIds;
