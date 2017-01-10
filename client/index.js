import axios from 'axios';

require('./main.scss');

document.addEventListener('DOMContentLoaded', () => {
	const labelContainer = document.getElementById('label-container');
	const linkInput = document.getElementById('link-input');
	const linkForm = document.getElementById('link-form');
	const shortLink = document.getElementById('short-link');
	const copyBtn = document.getElementById('copy-btn');

	linkInput.addEventListener('keyup', (event) => {
		const empty = !linkInput.value;
		if (empty) {
			labelContainer.classList.remove('filled');
		}
		else {
			labelContainer.classList.add('filled');
		}
	});

	linkForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const userLink = linkInput.value;
		axios.post(`/url/${userLink}`)
			.then(res => {
				shortLink.value = res.data.shortLink;
				shortLink.parentElement.style.display = "block";
			})
			.catch(err => {
				console.log(err);
			});
	});

	copyBtn.addEventListener('click', () => {
		shortLink.select();
		const copySuccess = document.execCommand('copy');
		// display dialog(copySuccess)
	});

});