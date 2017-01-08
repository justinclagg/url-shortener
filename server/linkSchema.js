const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
	linkID: 'string',
	userLink: 'string',
	shortLink: 'string'
});

module.exports = mongoose.model('Link', linkSchema);