'use strict';

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

const PACKAGES_FOLDER = 'packages';
const DOMAINS_FOLDER = 'domains';

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const isLinux = process.platform === 'linux';

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL,
);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension => fs.existsSync(resolveFn(`${filePath}.${extension}`)));

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

const packages = ['components-typescript'];
const packagePaths = [];
const packageEntries = {};
packages.forEach(packageName => {
  packageEntries[packageName] = [resolveModule(resolveApp, PACKAGES_FOLDER + `/${packageName}/index`)];
  packagePaths.push(resolveApp(PACKAGES_FOLDER + `/${packageName}`));
});

const domains = ['eventEditor'];
const domainPaths = [];
const domainEntries = {};

domains.forEach(domain => {
  const domainEntry = resolveModule(resolveApp, DOMAINS_FOLDER + (isLinux ? '/../src/index' : `/${domain}/src/index`));
  const domainPath = resolveApp(DOMAINS_FOLDER + (isLinux ? '/../src/index' : `/${domain}/src/`));

  domainEntries[domain] = [domainEntry];
  domainPaths.push(domainPath);
});

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrlOrPath,
  entry: { ...packageEntries, ...domainEntries },
  includePaths: [...packagePaths, ...domainPaths],
};

module.exports.moduleFileExtensions = moduleFileExtensions;
