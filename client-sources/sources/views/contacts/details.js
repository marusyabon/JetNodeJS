import { JetView } from "webix-jet";
import ContactsModel from "models/contacts";
import ActivitiesTable from "./activities";
import FilesTable from "./files";
import {detailsTempl} from "../../templates/contacts";

export default class ContactDetails extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const contactTitle = {
			view: "label",
			css: "contact_title",
			localId: "contactTitle"
		};

		const buttons = {
			cols: [
				{
					view: "button",
					label: _("Delete"),
					type: "icon",
					icon: "fas fa-trash-alt",
					width: 100,
					click: () => {
						this.removeContact();
					}
				},
				{
					view: "button",
					label: _("Edit"),
					type: "icon",
					icon: "fas fa-edit",
					width: 100,
					click: () => {
						const id = this.getParam("id", true);
						this.show(`/top/contacts.contacts?id=${id}/contacts.form`);
					}
				}
			]
		};

		const contactCard = {
			id: "contactCard",
			minHeight: 270,
			template: detailsTempl
		};

		return {
			rows: [
				{
					cols: [contactTitle, {}, buttons]
				},
				{
					height: 10
				},
				contactCard,
				{
					rows: [
						{
							view: "tabbar",
							value: _("Activities"),
							multiview: true,
							optionWidth: 150,
							options: [
								{ value: _("Activities"), id: "Activities" },
								{ value: _("Files"), id: "Files" }
							]
						},
						{
							id: "mymultiview",
							cells: [
								{ id: "Activities", $subview: ActivitiesTable },
								{ id: "Files", $subview: FilesTable }
							]
						}
					]
				}
			]
		};
	}

	async urlChange() {
		const contactsCollection = await ContactsModel.getDataFromServer();

		const id = this.getParam("id", true);
		const target = contactsCollection.find(item => item.id == id);

		if (id && target) {
			let contactData = webix.copy(target);
			contactData.StatusID = contactData.StatusID["Value"];

			let format = webix.Date.dateToStr("%d-%m-%Y");
			contactData.Birthday = format(contactData.Birthday);

			this.$$("contactTitle").setValue(contactData.FirstName + " " + contactData.LastName);
			$$("contactCard").setValues(contactData);
		}
	}

	async removeContact() {
		const _ = this.app.getService("locale")._;

		webix.confirm({
			title: _("Confirm_titile"),
			text: _("Confirm_text"),
			callback: async (result) => {
				if (result) {
					this.app.callEvent("onContactDelete");

					const id = this.getParam("id", true);
					const result = await ContactsModel.removeItem(id);
					if(result) {
						$$("contactsList").remove(id)
					}
				}
			}
		});
	}
}
