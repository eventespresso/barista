require('dotenv').config({
	path: '.wp-env',
});

if (!process.env.WP_CONTENT) {
	throw new Error('Missing env var WP_CONTENT (either export it or use .wp-env');
}

const fs = require('fs');

const config = {
	WP_DEBUG: true,
	WP_DEBUG_DISPLAY: true,
	WP_DEBUG_LOG: true,
};

const mappings = {
	'wp-content': process.env.WP_CONTENT,
};

const plugins = ['.'];

const wpEnv = {
	config,
	mappings,
	plugins,
};

const json = JSON.stringify(wpEnv, undefined, 2);

const fileName = '.wp-env.json';

fs.writeFileSync(fileName, json);
