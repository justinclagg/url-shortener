const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
	entry: './client/index.js',
	output: {
		path: path.resolve(__dirname, 'public'),
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
				test: /\.css$/, // Figure out how to do this with sass
				include: /client/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: 'css-loader'
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('main.css'),
	]
};

module.exports = config;