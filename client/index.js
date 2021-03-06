import axios from 'axios';

require('./main.scss');

document.addEventListener('DOMContentLoaded', () => {
	const labelContainer = document.getElementById('label-container');
	const linkInput = document.getElementById('link-input');
	const linkForm = document.getElementById('link-form');
	const shortLink = document.getElementById('short-link');
	const copyBtn = document.getElementById('copy-btn');

	// Check if the link input field is empty on keyup to style the label
	linkInput.addEventListener('keyup', () => {
		const empty = !linkInput.value;
		if (empty) {
			labelContainer.classList.remove('filled');
		}
		else {
			labelContainer.classList.add('filled');
		}
	});

	// Send submitted links to the server, and display the shortened link after getting a response
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

	// Copy the shortened link to the user's clipboard
	copyBtn.addEventListener('click', () => {
		shortLink.select();
		const copySuccess = document.execCommand('copy');
		// Can use copySuccess to display an appropriate dialog
	});
});