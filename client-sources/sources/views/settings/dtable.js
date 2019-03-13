import {JetView} from "webix-jet";

export default class DataTable extends JetView{
	constructor(app,name,data,label,options){
		super(app, name);
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
			select: true,
			editable: true,
			editaction:"dblclick",
			columns: [
				{
					id: "Value",
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
					console.log(id, value)
				}
			}
		};

		const addBtn = {
			view: "button",
			label: _("Add"),
			type: "form",
			click: () => {this.addVal()}
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
							const item = this.getRoot().queryView({view:"datatable"}).getSelectedId();
							this._tdata.remove(item);
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

	async addVal() {
		debugger
		await this._tdata.addItem({
			"Value": "",
			"Icon": ""
		});	
	}

	async init(view){
		const activitiesCollection = await this._tdata.getDataFromServer();
		view.queryView("datatable").parse(activitiesCollection);
	}
}
