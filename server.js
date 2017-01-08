/* Config variables */

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

/* Development middleware */

if (process.env.NODE_ENV !== 'production') {
	// Webpack hot reloading
	const webpack = require('webpack');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const webpackConfig = require('./webpack.config.js');
	const compiler = webpack(webpackConfig);
	app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
	app.use(webpackHotMiddleware(compiler));
	// Logging
	const morgan = require('morgan');
	app.use(morgan('dev'));
}

db.once('open', () => {
	app.listen(process.env.PORT, (err) => {
		if (err) throw `Error starting server: ${err}`;
		console.log(`Node server on port ${process.env.PORT}`);
	});
});

db.on('error', (err) => {
	console.log(`Database error: ${err}`);
});

require('./server/routes')(app);