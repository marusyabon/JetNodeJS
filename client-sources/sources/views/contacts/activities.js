import {JetView} from "webix-jet";
import { activities } from "models/activities";
import { activitytypes } from "models/activitytypes";
import ActivitiesForm from "../activities/form";

export default class ActivitiesTable extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		let _table = {
			view: "datatable",
			localId: "actTable",
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
					options: activitytypes
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
				"wxi-trash": function (e, id) {
					webix.confirm({
						title: _("Confirm_titile"),
						text: _("Confirm_text"),
						callback: function (result) {
							if (result) {
								activities.remove(id);
								return false;
							}
						}
					});
				}
			},
			on: {
				onAfterFilter: () => {
					let id = this.getParam("id", true),
						actTable = this.$$("actTable");
					actTable.blockEvent();
					actTable.filter((obj) => {
						return obj.ContactID == id;
					}, "", true);
					actTable.unblockEvent();
				}
			},
		};

		let _button = {
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

	init() {
		this.actForm = this.ui(ActivitiesForm);

		this.on(this.app, "onContactDelete", () => {
			let id = this.getParam("id", true);

			let actToRemove = activities.find((item) => item.ContactID == id);
			actToRemove.forEach((item) => {
				activities.remove(item.id);
			});
		});
	}

	urlChange() {
		activities.waitData.then(() => {
			let id = this.getParam("id", true);
			let dTable = this.$$("actTable");

			if (id) {
				dTable.sync(activities, () => {
					dTable.filter((item) => {
						return item.ContactID == id;
					});
				});
			}
		});
	}
}
