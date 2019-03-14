class ActivitytypesModel {
	constructor() {
		this._data = [];
		this._getUrl = 'http://localhost:3000/activitytypes/';
		this._saveUrl = 'http://localhost:3000/activitytypes/';
	}

	async getDataFromServer() {
		const responseData = await webix.ajax().get(this._getUrl);
		this._data = responseData.json().data;
		return this._data;
	}
	async sendDataToServer(item) {
		const responseData = await webix.ajax().post(this._saveUrl, item);
		return responseData.json();
	}

	getCollection() {
		return this._data;
	}

	getItem(id) {
		return this._data.find(item => item.id === id.row);
	}

	async addItem(item) {
		const responseData = await webix.ajax().post(this._saveUrl, item);
		this._data.push(webix.copy(responseData.json().data));
		return responseData.json();
	}

	async updateItem(id, item) {
		const response = await webix.ajax().put(this._saveUrl, item);
		return response.json();
	}

	async removeItem(id) {
		const response = await webix.ajax().del(this._saveUrl, { id: id.row });
		return response.json();

	}
}

export default new ActivitytypesModel();
