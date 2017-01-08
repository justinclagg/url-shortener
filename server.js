if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const Promise = require('es6-promise').Promise;
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = Promise; // Replaces mpromise (deprecated)

app.use(express.static('./public'));

db.once('open', () => {
	app.listen(process.env.PORT, (err) => {
		if (err) throw `Error starting server: ${err}`;
		console.log(`Node server on port ${process.env.PORT}`);
	});
});

db.on('error', (err) => {
	console.log(`Database error: ${err}`);
	mongoose.connect(process.env.MONGODB_URI);
});

require('./server/routes')(app);