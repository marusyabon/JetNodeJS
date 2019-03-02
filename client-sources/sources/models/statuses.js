export const statuses = new webix.DataCollection({
	url: "http://localhost:3000/statuses/",
	save: {
		url: "rest->http://localhost:3000/statuses/",
		updateFromResponse: true
	}
});
