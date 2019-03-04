import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
import {userInfo} from "../../templates/contacts";

export default class ContactsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const list = {
			rows: [
				{
					view: "toolbar",
					elements: [
						{
							view: "text",
							localId: "listFilter",
							placeholder: "type to find matcing contacts",
							on: {
								"onTimedKeyPress": () => {
									const value = this.$$("listFilter").getValue().toLowerCase();
									const dateStr = webix.Date.dateToStr("%d %M %Y");

									this.$$("list").filter((obj) => {
										for (let key in obj) {
											if(obj[key]){
												if (typeof obj[key] === "string" && obj[key].toString().toLowerCase().indexOf(value) != -1) {
													return true;
												}
												else if(obj[key] instanceof Date && dateStr(obj[key]).toLowerCase().indexOf(value) != -1) {
													return true;
												}
											}
										}
									});
								}
							}
						}
					]
				},
				{
					view: "list",
					localId: "list",
					width: 300,
					css: "users_list",
					select: true,
					template: userInfo,
					type: {
						height: 50
					},
					on: {
						"onAfterSelect": (id) => {
							this.show(`/top/contacts.contacts?id=${id}/contacts.details`);
						},
						"data->onIdChange": (oldId, newId) => {
							this.show(`/top/contacts.contacts?id=${newId}/contacts.details`);
						}
					},
				},
				{
					view: "button",
					type: "form",
					value: _("Add"),
					click: () => {
						const id = this.getParam("id", true);
						this.show(`/top/contacts.contacts?id=${id}&new=true/contacts.form`);
					}
				},
				{
					height: 15
				}
			]
		};
		return {
			margin: 20,
			cols: [
				list,
				{ $subview: true }
			]
		};
	}

	init() {
		this.$$("list").sync(contacts);

		this.on(this.app, "onContactDelete", () => {
			const id = contacts.getFirstId();
			if (id) {
				this.$$("list").select(id);
			}
		});
	}

	urlChange() {
		contacts.waitData.then(() => {
			const id = this.getParam("id") || contacts.getFirstId();
			if (id && contacts.exists(id)) {
				this.$$("list").select(id);
			}
		});
	}
}
