function isExist (collection, id) {
	return collection.find(item => item.id == id);
}

function modifyActivities(dataArr, id) {
	let values = dataArr.find(item => item.id == id.row);

	let dateTime = values.DueDate;

	values._Date = dateTime;
	values._Time = dateTime;
	values.TypeID = values.TypeID["id"];
	values.ContactID = values.ContactID["id"];

	return values;
}

function updateData(collection, scope) {
	collection.map((item) => {
		item.TypeID["value"] = item.TypeID["Value"];
		return item;
	});

	if (collection) {
		let _contactId = scope.getParam("id", true);
		if (_contactId) {
			const filteredData = collection.filter((item) => item.ContactID["id"] == _contactId);
			$$("actTable").clearAll();
			$$("actTable").parse(filteredData);
		}
		else {
			$$("activitiesTable").clearAll();
			$$("activitiesTable").parse(collection);
		}
	}
}

export {isExist, modifyActivities, updateData}
