export const activitytypes = new webix.DataCollection({
	url: "http://localhost:3000/activitytypes/",
	save: "rest->http://localhost:3000/activitytypes/",
	updateFromResponse: true,
	scheme: {
		$init(obj) {
			obj.value = obj.Value;
		}
	}
});
