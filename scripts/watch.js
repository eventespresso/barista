/* eslint-disable */
const DEVELOPMENT = 'development';
process.env.NODE_ENV = DEVELOPMENT;

const webpack = require('webpack');
const config = require('../config/webpack.config.js');
const devConfig = config(DEVELOPMENT);

webpack(devConfig).watch(
	{
		poll: true,
		ignored: /packages\/(^[a-zA-Z\-].*)\/node_modules/,
	},
	(err, stats) => {
		if (err) {
			console.error(err);
		}
		console.log(
			stats.toString({
				chunks: false,
				colors: true,
			})
		);
	}
);
