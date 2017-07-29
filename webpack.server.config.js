const path = require('path');
const fs = require('fs');

module.exports = {
	entry: './server/server.js',
	output: {
		filename: 'server.js',
		path: path.join(__dirname, 'public'),
	},
	target: 'node',
	externals: fs.readdirSync('node_modules').reduce((acc, mod) => {
		if (mod === '.bin') {
			return acc;
		}
		acc[mod] = `commonjs ${mod}`;
		return acc;
	}, {}),
	node: {
		console: false,
		global: false,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
	},
	resolve: {
		extensions: ['.js', '.json'],
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: 'json-loader',
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: [
						[
							'env',
							{
								targets: { node: 7 },
								useBuiltIns: true,
							},
						],
						'react',
						'stage-2',
					],
					plugins: ['lodash'],
				},
			},
		],
	},
};
