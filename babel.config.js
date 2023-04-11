module.exports = function (api) {
	api.cache(true);

	const presets = ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'];

	const plugins = [
		[
			'@babel/plugin-transform-runtime',
			{
				/**
				 * `absoluteRuntime` needs to be true for our monorepo set up
				 * @see https://babeljs.io/docs/en/babel-plugin-transform-runtime#absoluteruntime
				 */
				absoluteRuntime: true,
				corejs: false,
				helpers: true,
				regenerator: true,
			},
		],
	];

	const productionPlugins = [];
	if (process.env.BUILD_POT !== false) {
		productionPlugins.push([
			'@wordpress/babel-plugin-makepot',
			{
				output: './build/js-translations.pot',
			},
		]);
	}

	return {
		presets,
		plugins,
		env: {
			production: {
				plugins: productionPlugins,
			},
		},
	};
};
