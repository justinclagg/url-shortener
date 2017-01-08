module.exports = function validateUrl() {
	return (req, res, next) => {
		let url = req.params[0];
		if (/^http/i.test(url) === false) {
			// Add protocol if missing
			url = 'http://' + url;
		}

		if (/^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/.test(url)) {
			// Valid url
			req.params.userLink = url;
			return next();
		}
		else {
			// Invalid url
			res.status(400).send('Invalid link format');
		}
	};
};