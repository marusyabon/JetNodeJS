function isExist (collection, id) {
	return collection.find(item => item.id == id);
}

function setData(collection, scope) {
	if (collection) {
		let _contactId = scope.getParam("id", true);
		if (_contactId) {
			const filteredData = collection.filter((item) => {
				const contactIdVal = item.ContactID;
				return contactIdVal._id == _contactId;
			});
			$$("actTable").clearAll();
			$$("actTable").parse(filteredData);
		}
		else {
			$$("activitiesTable").clearAll();
			$$("activitiesTable").parse(collection);
		}
	}
}

export {isExist, setData}
