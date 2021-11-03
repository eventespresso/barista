const R = require('ramda');
const {
	camelCaseDash,
	defaultRequestToExternal,
	defaultRequestToHandle,
} = require('@wordpress/dependency-extraction-webpack-plugin/lib/util');

const EVENTESPRESSO_NAMESPACE = '@eventespresso/';
const BUNDLED_PACKAGES = ['@eventespresso/icons'];

/**
 * Request to global transformation
 *
 * Transform @eventespresso dependencies:
 *
 *   request `@eventespresso/edtr-services` becomes `eventespresso.edtrServices`
 *
 * @type {import('.').RequestToExternal}
 */
function requestToExternal(request) {
	switch (true) {
		case BUNDLED_PACKAGES.includes(request):
			return undefined;

		case request.startsWith(EVENTESPRESSO_NAMESPACE):
			return ['eventespresso', camelCaseDash(request.substring(EVENTESPRESSO_NAMESPACE.length))];

		case request === 'ramda':
			return 'R';

		default:
			return defaultRequestToExternal(request);
	}
}

/**
 * Request to Eventespresso script handle transformation
 *
 * Transform @eventespresso dependencies:
 *
 *   request `@eventespresso/edtr-services` becomes `eventespresso-edtr-services`
 *   request `@eventespresso/escape-html` becomes `eventespresso-escape-html`
 *
 * @type {import('.').RequestToHandle}
 */
function requestToHandle(request) {
	if (request.startsWith(EVENTESPRESSO_NAMESPACE)) {
		return 'eventespresso-' + camelCaseDash(request.substring(EVENTESPRESSO_NAMESPACE.length));
	}

	return defaultRequestToHandle(request);
}

/**
 * Gets CLI args as object.
 */
function getCommandArgs() {
	const argList = process.argv;

	const arg = {};
	let a, opt, thisOpt, curOpt;
	for (a = 0; a < argList.length; a++) {
		thisOpt = argList[a].trim();
		opt = thisOpt.replace(/^-+/, '');

		if (opt === thisOpt) {
			// argument value
			if (curOpt) {
				arg[curOpt] = opt;
			}
			curOpt = null;
		} else {
			// argument name
			curOpt = opt;
			arg[curOpt] = true;
		}
	}
	return arg;
}

/**
 * Converts a comma separated string values to array
 * "ab, cd,ef " => ["ab", "cd", "ef"]
 *
 * @param {string} str
 *
 * @return {string[]}
 */
function commaStrToArray(str = '') {
	return R.map(R.trim, R.split(',', str)).filter(Boolean);
}

module.exports = {
	camelCaseDash,
	commaStrToArray,
	requestToExternal,
	requestToHandle,
	getCommandArgs,
};
