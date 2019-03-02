export const contacts = new webix.DataCollection({
	url: "http://localhost:3000/contacts",
	save: {
		url: "rest->http://localhost:3000/contacts",
		updateFromResponse: true
	},
	scheme: {
		$change(obj) {
			obj.value = obj.FirstName + " " + obj.LastName;

			let dateFormat = webix.Date.strToDate("%d-%m-%Y %H:%i");

			obj.StartDate = dateFormat(obj.StartDate);
			obj.Birthday = dateFormat(obj.Birthday);
		},

		$save(obj) {
			let dateFormat = webix.Date.dateToStr("%d-%m-%Y %H:%i");

			obj.StartDate = dateFormat(obj.StartDate);
			obj.Birthday = dateFormat(obj.Birthday);
		}
	}
});
