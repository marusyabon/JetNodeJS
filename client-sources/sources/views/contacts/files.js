import { JetView } from "webix-jet";
import { files } from "models/files";

export default class FilesTable extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const _table = {
			view: "datatable",
			localId: "filesTable",
			select: true,
			autoConfig: true,
			columns: [
				{
					id: "FileName",
					header: _("Name"),
					sort: "text",
					fillspace: true
				},
				{
					id: "FileDate",
					sort: "date",
					header: _("Change Date")
				},
				{
					id: "FileSize",
					sort: "int",
					header: _("Size")
				},
				{
					header: "",
					template: "{common.trashIcon()}",
					width: 50
				}
			],
			onClick: {
				"wxi-trash": (e, id) => {
					webix.confirm({
						title: "Remove this?",
						text: "action cannot be undone",
						callback: (result) => {
							if (result) {
								files.remove(id);
							}
							return false;
						}
					});
				}
			}
		};

		const _button = {
			view: "uploader",
			label: _("Upload file"),
			localId: "fileUploader",
			type: "icon",
			icon: "fas fa-cloud-upload-alt",
			css: "uploader",
			width: 160,
			upload: "http://localhost:3000/files/upload",
			// autosend: false,
			on: {
				"onFileUpload": (file, response) => {
					if (response.status == "server") {
						file.FileName = file.name;
						file.FileDate = file.file["lastModifiedDate"];
						file.FileSize = file.size;
						file.ContactID = this.getParam("id", true);
						files.add(file);
					}
				},
				"onFileUploadError": () => {
					webix.message("Uploading failed");
				}
			}
		};

		return {
			rows: [
				_table,
				{ cols: [ {}, _button, {} ] }
			]
		};
	}
	init() {
		this.on(this.app, "onContactDelete", () => {
			const id = this.getParam("id", true);

			let filesToRemove = files.find((item) => item.ContactID == id);
			filesToRemove.forEach((item) => {
				files.remove(item.id);
			});
		});
	}

	urlChange() {
		files.waitData.then(() => {
			const id = this.getParam("id", true);
			const dTable = this.$$("filesTable");

			// filter by contact id

			if (id) {
				dTable.sync(files, () => {
					dTable.filter((item) => item.ContactID["id"]);
				});
			}
		});
	}
}
