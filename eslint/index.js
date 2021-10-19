/* eslint-disable */
const levels = require('./levels');

/**
 * This creates a map (package: level) like this
 * {
 *     adapters: 2,
 *     components: 4,
 *     constants: 1,
 *     data: 1,
 *     edtr-services: 4,
 *     form: 3,
 *     helpers: 4,
 * }
 */
const packageLevels = levels.reduce((res, curr, i) => {
	return {
		...res,
		...curr.reduce((list, item) => {
			return { ...list, [item]: i + 1 };
		}, {}),
	};
}, {});

const safeToImportAnywhere = ['@eventespresso/icons', '@eventespresso/i18n'];

module.exports = {
	rules: {
		'no-circular-imports': {
			create: function (context) {
				return {
					ImportDeclaration(node) {
						const importSource = node.source.value;
						const isTypeImport = node.importKind === 'type';
						const isBaristaPackage = importSource.startsWith('@eventespresso/');
						const isSafeToImportAnyWhere = safeToImportAnywhere.includes(importSource);

						if (isBaristaPackage && !isTypeImport && !isSafeToImportAnyWhere) {
							const path = context.getFilename();
							// ignore tests
							if (path.match(/[.\\/]tests?[.\\/](tsx?$)?/)) {
								return;
							}
							// TODO use file system to resolve paths
							const match = path.match(/[\\/]packages[\\/](?<package>[^\\/]+)[\\/]/);
							if (match && match.groups && match.groups.package) {
								const dependency = importSource.split('/')[1];
								const sourcePkg = match.groups.package;

								if (
									packageLevels[sourcePkg] &&
									packageLevels[dependency] &&
									packageLevels[sourcePkg] <= packageLevels[dependency]
								) {
									context.report({
										node: node,
										message: `You cannot import "${importSource}" into "@eventespresso/${sourcePkg}"`,
									});
								}
							}
						}
					},
				};
			},
		},
		'no-stories-i18n': {
			create: function (context) {
				return {
					ImportDeclaration(node) {
						const importSource = node.source.value;
						const path = context.getFilename();

						if (
							path.endsWith('.stories.tsx') &&
							importSource.endsWith('/i18n') &&
							node.specifiers.some((specifier) => specifier.imported.name.startsWith('_'))
						) {
							context.report({
								node: node,
								message: 'Stories should not be translated.',
							});
						}
					},
				};
			},
		},
	},
};
