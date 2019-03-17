import {JetView} from "webix-jet";
import ActivitiesModel from "models/activities";
import ActivitytypesModel from "models/activitytypes";
import ActivitiesForm from "../activities/form";

export default class ActivitiesTable extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const activitytypes = this.getActivitytypes();

		const _table = {
			view: "datatable",
			id: "actTable",
			select: true,
			columns: [
				{
					id: "State",
					header: "",
					template: "{common.checkbox()}",
					width: 30
				},
				{
					id: "TypeID",
					sort: "text",
					header: [_("Activity type"), { content: "selectFilter" }],
					options: activitytypes,
					template: (val) => {
						return val.TypeID.value
					}
				},
				{
					id: "DueDate",
					header: [_("Due date"), { content: "datepickerFilter" }],
					sort: "date",
					format: webix.Date.dateToStr("%d %M %y")
				},
				{
					id: "Details",
					sort: "text",
					header: [_("Details"), { content: "textFilter" }],
					fillspace: true
				},
				{
					id: "EditAct",
					header: "",
					template: "{common.editIcon()}",
					width: 50
				},
				{
					id: "RemoveAct",
					header: "",
					template: "{common.trashIcon()}",
					width: 50
				}
			],
			onClick: {
				"wxi-pencil": (e, id) => {
					this.actForm.showWindow(id);
				},
				"wxi-trash": (e, id) => {
					webix.confirm({
						title: _("Confirm_titile"),
						text: _("Confirm_text"),
						callback: (result) => {
							if (result) {
								this.removeItem(id);
							}
						}
					});
				}
			},
			on: {
				onAfterFilter: () => {
					const id = this.getParam("id", true),
						actTable = $$("actTable");
					actTable.blockEvent();
					actTable.filter((obj) => {
						return obj.ContactID == id;
					}, "", true);
					actTable.unblockEvent();
				}
			},
		};

		const _button = {
			view: "button",
			label: _("Add activity"),
			type: "icon",
			css: "btn",
			icon: "fas fa-plus-square",
			width: 100,
			click: () => { this.actForm.showWindow(); }
		};

		return {
			rows: [
				_table,
				{ cols: [ {}, _button ] }
			]
		};
	}

	async init() {
		this.actForm = this.ui(ActivitiesForm);
		const activities = await ActivitiesModel.getDataFromServer();
		this.on(this.app, "onContactDelete", () => {
			const id = this.getParam("id", true);
			let activitiesToRemove = activities.filter(item => item.ContactID["id"] == id);

			if(activitiesToRemove) {
				activitiesToRemove.forEach((item) => {
					ActivitiesModel.removeItem(item.id);
				});
			}
		});
	}

	async urlChange() {
		const id = this.getParam("id", true);
		const dTable = $$("actTable");

		// filter by contact id

		if (id) {
			const activitiesCollection = await ActivitiesModel.getDataFromServer();
			const filteredData = activitiesCollection
			.filter(
				item => item.ContactID["id"] == id
			)
			.map((item) =>{
				item.TypeID["value"] = item.TypeID["Value"];
				return item;
			});
			dTable.clearAll();
			dTable.parse(filteredData);
		}
	}

	async removeItem(id) {
		const response = await ActivitiesModel.removeItem(id);
		$$("actTable").remove(id);
	}

	async getActivitytypes() {
		let activitytypesData = await ActivitytypesModel.getDataFromServer();
		return activitytypesData;
	}
}
