function isExist (collection, id) {
	return collection.find(item => item.id == id);
}

export {isExist}
