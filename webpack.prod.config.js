const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SRC_DIR = path.resolve(__dirname, './client');
const DIST_DIR = path.resolve(__dirname, './public');

const config = {
	entry: path.resolve(SRC_DIR, 'index.js'),
	output: {
		path: DIST_DIR,
		filename: 'app.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.scss$/,
				include: SRC_DIR,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: 'css-loader!sass-loader'
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('main.css'),
	]
};

module.exports = config;