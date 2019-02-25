export const activities = new webix.DataCollection({
	url: "http://localhost:3000/activities/",
	save: "rest->http://localhost:3000/activities/",
	updateFromResponse: true,
	scheme: {
		$change(obj) {
			let dateFormat = webix.Date.strToDate("%d-%m-%Y %H:%i");

			obj.DueDate = dateFormat(obj.DueDate);
		}
	}
});
