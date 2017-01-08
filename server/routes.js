const Link = require('./linkSchema');
const shortid = require('shortid');

module.exports = (app) => {

	app.get('/', (req, res) => {
		res.sendFile('./index.html');
	});

	// Redirect to stored link if it exists
	app.get('/:linkID', (req, res, next) => {
		Link.findOne({ linkID: req.params.linkID }, (err, link) => {
			if (err) return next(err);
			if (link) {
				res.redirect(link.userLink);
			}
			else {
				res.status(404).send('Invalid Link');
			}
		});
	});

	app.get('/url/*', (req, res, next) => {
		const userLink = req.params[0];
		Link.findOne({ userLink }, (err, link) => {
			if (err) return next(err);
			if (link) {
				// Send a stored link if it exists
				res.status(200).send(link);
			}
			else {
				// Otherwise save a new link
				const linkID = shortid.generate();
				const shortLink = `http://${req.headers.host}/${linkID}`;
				const newLink = new Link({ userLink, linkID, shortLink });
				newLink.save((err, newLink) => {
					if (err) return next(err);
					res.status(201).send(newLink);
				});
			}
		});
	});
};
