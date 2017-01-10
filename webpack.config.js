const webpack = require('webpack');
const path = require('path');
const SRC_DIR = path.resolve(__dirname, './client');
const DIST_DIR = path.resolve(__dirname, './public');

const config = {
	entry: [
		path.resolve(SRC_DIR, 'index.js'),
		'webpack-hot-middleware/client'
	],
	output: {
		path: DIST_DIR,
		filename: 'app.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				include: SRC_DIR,
				use: 'babel-loader'
			},
			{
				test: /\.scss$/,
				include: SRC_DIR,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	}
};

module.exports = config;