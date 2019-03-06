import {JetView} from "webix-jet";
import { activities } from "models/activities";
import { activitytypes } from "models/activitytypes";
import ActivitiesForm from "../activities/form";

export default class ActivitiesTable extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const _table = {
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
					options: activitytypes,
					template: (val) => {
						return val.TypeID.Value
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
								activities.remove(id);
								return false;
							}
						}
					});
				}
			},
			on: {
				onAfterFilter: () => {
					const id = this.getParam("id", true),
						actTable = this.$$("actTable");
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

	init() {
		this.actForm = this.ui(ActivitiesForm);

		this.on(this.app, "onContactDelete", () => {
			const id = this.getParam("id", true);

			let actToRemove = activities.find((item) => {
				return item.ContactID == id
			});
			actToRemove.forEach((item) => {
				activities.remove(item.id);
			});
		});
	}

	urlChange() {
		activities.waitData.then(() => {
			const id = this.getParam("id", true);
			const dTable = this.$$("actTable");

			// filter by contact id

			if (id) {
				dTable.sync(activities, () => {
					dTable.filter((item) => {
						const contactIdVal = item.ContactID;
						return contactIdVal._id == id;
					});
				});
			}
		});
	}
}
