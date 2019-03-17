import {JetView} from "webix-jet";
import ContactsModel from "models/contacts";
import StatusesModel from "models/statuses";
import {isExist} from "common";

export default class ContactsForm extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		return {
			view: "form",
			localId: "contactForm",
			autoheight: false,
			elementsConfig: {
				labelWidth: 120
			},
			elements: [
				{
					view:"label",
					localId: "formLabel",
					label: _("Edit contact"),
					align:"center"
				},
				{
					margin: 50,
					cols: [
						{
							margin: 10,
							rows: [
								{ view: "text", label: _("First name"), name: "FirstName" },
								{ view: "text", label: _("Last name"), name: "LastName" },
								{ view: "datepicker", label: _("Joining date"), name: "StartDate", /*format: webix.Date.dateToStr("%d %M %Y"),*/ },
								{ view: "combo", label: _("Status"), localId: "StatusID", name: "StatusID", suggest: { body: { data: [] } } },
								{ view: "text", label: _("Job"), name: "Job" },
								{ view: "text", label: _("Company"), name: "Company" },
								{ view: "text", label: _("Website"), name: "Website" },
								{ view: "textarea", label: _("Address"), name: "Address" }
							]
						},
						{
							margin: 10,
							rows: [
								{ view: "text", label: _("Email"), name: "Email" },
								{ view: "text", label: _("Skype"), name: "Skype" },
								{ view: "text", label: _("Phone"), name: "Phone" },
								{ view: "datepicker", label: _("Birthday"), name: "Birthday", /*format: webix.Date.dateToStr("%d %M %Y"),*/ },
								{ view: "text", name: "Photo", localId: "Photo", hidden: true },
								{
									margin: 25,
									cols: [
										{
											width: 200,
											height: 200,
											localId: "cPhoto",
											css: "contact_avatar",
											template: contact => {
												return `<img src="${contact.Photo ? contact.Photo : 'https://cs.unc.edu/~csturton/HWSecurityatUNC/images/person.png'}" />`;
											}
										},
										{
											margin: 10,
											rows: [
												{},
												{
													view: "uploader",
													accept: "image/png, image/jpg, image/jpeg",
													value: _("Change photo"),
													autosend: false,
													multiple: false,
													on: {
														onBeforeFileAdd: (uploadedFile) => {
															const reader  = new FileReader();

															reader.onload = (e) => {
																this.$$("cPhoto").setValues({ Photo: e.target.result });
															};

															if (uploadedFile) {
																reader.readAsDataURL(uploadedFile.file);
															}
														}
													}
												},
												{
													view: "button", value: _("Delete photo"),
													click: () => {
														webix.confirm({
															title: _("Confirm_titile"),
															callback: (result) => {
																if (result) {
																	this.$$("cPhoto").setValues({ Photo: "" });
																}
															}
														});
													}
												}
											]
										}
									]
								}
							]
						},

					]
				},
				{},
				{
					margin: 20,
					cols: [
						{},
						{
							view: "button", value: _("Cancel"), width: 100,
							click: () => {
								webix.confirm({
									title: _("Confirm_titile"),
									callback: (result) => {
										if (result) {
											this.show("contacts.details");
										}
									}
								});
							}
						},
						{
							view: "button", localId: "saveBtn", value: _("Save"), type: "form", width: 80,
							click: () => {
								this.saveForm();
							}
						}
					]
				}
			],
			rules: {
				"FirstName": webix.rules.isNotEmpty,
				"LastName": webix.rules.isNotEmpty,
				"StatusID": webix.rules.isNotEmpty
			}
		};
	}

	async init() {
		const _ = this.app.getService("locale")._;
		const contactsCollection = await ContactsModel.getDataFromServer();
		const statusesCollection = await StatusesModel.getDataFromServer();

		const statuses = statusesCollection.map((item) => {
			item.value = item.Value;
			return item
		});

		this.$$("StatusID").define("suggest", statuses);

		const id = this.getParam("id", true);
		const isNew = this.getParam("new", true);

		if (isNew) {
			this.$$("formLabel").setValue(_("Add contact"));
			this.$$("saveBtn").setValue(_("Add"));
		}

		if (!isNew && id && isExist(contactsCollection, id)) {
			const contactData = webix.copy(contactsCollection.find(item => item.id == id));
			const statusData = webix.copy(statusesCollection.find(item => item.id == contactData.StatusID["id"]));

			contactData.StatusID = statusData ? statusData.id : {};

			this.$$("cPhoto").setValues(contactData);
			this.$$("contactForm").setValues(contactData);
		}
	}

	async saveForm () {
		const formView = this.$$("contactForm");

		const photoUrl = this.$$("cPhoto").getValues();
		this.$$("Photo").setValue(photoUrl.Photo);
		const values = formView.getValues();

		if (formView.validate()) {
			const id = this.getParam("id", true);
			const isNew = this.getParam("new", true);

			if(isNew) {
				await ContactsModel.addItem(values);
			}
			else {
				await ContactsModel.updateItem(id, {id: id, ...values});
			}
			const contactsCollection = await ContactsModel.getDataFromServer();

			$$("contactsList").parse(contactsCollection);

			this.show(`/top/contacts.contacts?id=${values._id}/contacts.details`);

			formView.clearValidation();
			formView.clear();
		}
	}
}
