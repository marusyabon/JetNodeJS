import {JetView} from "webix-jet";

export default class DataTable extends JetView{
	constructor(id,app,name,data,label,options){
		super(app, name);
		this._id = id;
		this._tdata = data;
		this._label = label;
		this._options = options;
	}

	config() {
		const _ = this.app.getService("locale")._;

		const label = {
			view:"label",
			label: this._label,
			align: "center"
		};

		const _table = {
			view: "datatable",
			id: this._id,
			select: true,
			editable: true,
			editaction:"dblclick",
			columns: [
				{
					id: "value",
					sort: "text",
					header: _("Type name"),
					fillspace: true,
					editor: "text"
				},
				{
					id: "Icon",
					header: _("Icon"),
					template: "<i class='fas fa-#Icon#'></i> #Icon#",
					editor: "richselect",
					suggest: {
						body: {
							data: this._options,
							template: "<i class='fas fa-#value#'></i> #value#"
						}
					}
				}
			],
			on: {
				onDataUpdate: (id, value) => {
					console.log(id, value);
					this.updateVal(id, value)
				}
			}
		};

		const addBtn = {
			view: "button",
			label: _("Add"),
			type: "form",
			click: () => {
				this.addVal()
			}
		};

		const removeBtn = {
			view: "button",
			label: _("Delete"),
			click: () => {
				webix.confirm({
					title: _("Confirm_titile"),
					text: _("Confirm_text"),
					callback: (result) => {
						if (result) {
							const itemId = this.getRoot().queryView({view:"datatable"}).getSelectedId();
							this.removeVal(itemId);
							$$(this._id).remove(itemId);
						}
						return false;
					}
				});
			}
		};

		return {
			rows: [
				label,
				_table,
				{
					cols: [
						addBtn, removeBtn
					]
				}
			]
		};
	}

	async init(){
		const collection = this._tdata;
		const activitiesCollection = await collection.getDataFromServer();
		$$(this._id).parse(activitiesCollection);
	}

	async addVal(id) {
		const response = await this._tdata.addItem({
			"value": "",
			"Icon": ""
		});
		if (response) {
			const collection = await this._tdata.getDataFromServer();
			if (collection) {
				$$(this._id).clearAll();
				$$(this._id).parse(collection);
			}
		}

	}

	async updateVal(id, value) {
		await this._tdata.updateItem(id, value);
	}

	async removeVal(id) {
		await this._tdata.removeItem(id);
	}
}
