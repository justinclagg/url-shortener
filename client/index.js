import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
	const linkInput = document.getElementById('link-input');
	const linkForm = document.getElementById('link-form');
	const shortLink = document.getElementById('short-link');

	linkInput.addEventListener('keydown', (event) => {
		// Modify form styling
	});

	linkForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const userLink = linkInput.value;
		axios.post(`/url/${userLink}`)
			.then(res => {
				shortLink.value = res.data.shortLink;
			})
			.catch(err => {
				console.log(err);
			});
	});


});