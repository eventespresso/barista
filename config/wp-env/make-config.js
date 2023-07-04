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

const lifecycleScripts = {
	afterStart: makeCmd('wp plugin activate event-espresso-core'),
};

const wpEnv = {
	config,
	mappings,
	plugins,
	lifecycleScripts,
};

const json = JSON.stringify(wpEnv, undefined, 2);

const fileName = '.wp-env.json';

fs.writeFileSync(fileName, json);

/**
 * Create full command for @wordpress/env
 * @param {string} cmd
 * @return {string}
 */
function makeCmd(cmd) {
	const envs = ['cli', 'tests-cli'];
	const cmds = envs.map((e) => {
		return `yarn wp-env run ${e} ${cmd}`;
	});
	return cmds.join(' && ');
}
