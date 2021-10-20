# Plugins

EE Plugins package. This package works similar to [`@wordpress/plugins`](https://github.com/WordPress/gutenberg/tree/trunk/packages/plugins) package.

### `PluginArea`

A component that renders all plugin fills in a hidden div.

_Usage_

```js
import { PluginArea } from '@eventespresso/plugins';

const App = () => (
	<div>
		<PluginArea />
	</div>
);
```

### Plugins API

#### `getPlugin`

Returns a registered plugin settings.

_Parameters_

-   _name_ `string`: Plugin name.

_Returns_

-   `?Plugin`: Plugin setting.

#### `getPlugins`

Returns all registered plugins without a scope or for a given scope.

_Parameters_

-   _scope_ `[string]`: The scope to be used when rendering inside a plugin area. No scope by default.

_Returns_

-   `Plugin[]`: The list of plugins without a scope or for a given scope.

#### `registerPlugin`

Registers a plugin.

_Usage_

```js
import { registerPlugin } from '@eventespresso/plugins';

function Component() {
	// you can access all the app contexts here
	return <></>;
}
registerPlugin('plugin-name', {
	render: () => <Component />,
});
```

_Parameters_

-   _name_ `string`: A string identifying the plugin.Must be unique across all registered plugins.
-   _settings_ `Plugin`: The settings for this plugin.

_Returns_

-   `Plugin`: The final plugin settings object.

#### `unregisterPlugin`

Unregisters a plugin by name.

_Usage_

```js
import { unregisterPlugin } from '@eventespresso/plugins';

unregisterPlugin('plugin-name');
```

_Parameters_

-   _name_ `string`: Plugin name.

_Returns_

-   `?Plugin`: The previous plugin settings object, if it has been successfully unregistered; otherwise `undefined`.
