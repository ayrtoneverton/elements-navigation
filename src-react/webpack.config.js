var path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		Carousel: './Carousel.jsx',
		Grid: './Grid.jsx'
	},
	output: {
		path: path.resolve('../react'),
		libraryTarget: 'commonjs2'
	},
	module: {
		rules: [
			{
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	externals: {
		react: 'react'
	}
};
