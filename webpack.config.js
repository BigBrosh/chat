var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: __dirname + '/public',
		filename: 'bundle.js'
	},

	module: {
		rules: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}, {
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
				'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true,
						},
					},
				],
			}, {
				test: /\.sass$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				],
			}, {
				test: /\.json$/,
				loader: "json-loader"
			}
		]
	}
};