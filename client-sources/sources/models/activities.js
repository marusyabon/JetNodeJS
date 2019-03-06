export const activities = new webix.DataCollection({
	url: "http://localhost:3000/activities/",
	save: {
		url: "rest->http://localhost:3000/activities/",
		updateFromResponse: true
	},
	scheme: {
		$change(obj) {
			const dateFormat = webix.Date.strToDate("%d-%m-%Y %H:%i");

			obj.DueDate = dateFormat(obj.DueDate);
		}
	}
});
