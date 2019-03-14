import { JetView } from "webix-jet";
import { contacts } from "models/contacts";
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
			localId: "contactCard",
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
		if (id && contactsCollection.exists(id)) {
			let contactData = webix.copy(contactsCollection.getItem(id));
			const StatusIdVal = contactData.StatusID;
			contactData.StatusID = StatusIdVal.value;

			let format = webix.Date.dateToStr("%d-%m-%Y");
			contactData.Birthday = format(contactData.Birthday);

			this.$$("contactTitle").setValue(contactData.FirstName + " " + contactData.LastName);
			this.$$("contactCard").setValues(contactData);
		}
	}

	removeContact() {
		const _ = this.app.getService("locale")._;
		const contactsCollection = 

		webix.confirm({
			title: _("Confirm_titile"),
			text: _("Confirm_text"),
			callback: (result) => {
				if (result) {
					this.app.callEvent("onContactDelete");

					const id = this.getParam("id", true);
					contactsCollection.removeItem(id);
				}
			}
		});
	}
}
