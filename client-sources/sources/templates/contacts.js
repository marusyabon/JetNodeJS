const detailsTempl = (contact) => {
	return (
		`<div class="col contact_card">
			<div class="photo_wrap contact_avatar">
				<img src="${contact.Photo ? contact.Photo : 'https://cs.unc.edu/~csturton/HWSecurityatUNC/images/person.png'}" />
			</div>
			<p class="contact_status">${contact.StatusID}</p>
		</div>
			<div class="col icon_p">
			<p><i class="fas fa-envelope"></i>${contact.Email}</p>
			<p><i class="fab fa-skype"></i>${contact.Skype}</p>
			<p><i class="fas fa-tag"></i>${contact.Job}</p>
			<p><i class="fas fa-briefcase"></i>${contact.Company}</p>
		</div>
		<div class="col icon_p">
			<p><i class="fas fa-calendar-alt"></i>${contact.Birthday}</p>
			<p><i class="fas fa-map-marker-alt"></i>${contact.Address}</p>
		</div>`
	);
}

const userInfo = (obj) => `<div class='user_icon'>\
							<img src="${obj.Photo ? obj.Photo : 'https://cs.unc.edu/~csturton/HWSecurityatUNC/images/person.png'}" />\
						</div>\
						<p class='user_name'>${obj.FirstName} ${obj.LastName}</p><p class='user_email'>${obj.Email}</p>`;

export {detailsTempl, userInfo};
