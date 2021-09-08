import type { AnyObject } from '@eventespresso/utils';
import { doAction } from '@eventespresso/ioc';

export type RenderPlugin = (prevRender?: RenderPlugin) => JSX.Element;

export type Settings = {
	name?: string;
	render: RenderPlugin;
};

export type Plugin = Required<Settings>;

const plugins: AnyObject<Plugin> = {};

const NAME_REGEX = /^[a-z][a-z0-9-]*$/;

export function registerPlugin(name: string, settings: Settings): Plugin {
	if (!NAME_REGEX.test(name)) {
		console.error(
			'Plugin names must include only lowercase alphanumeric characters or dashes, and start with a letter. Example: "my-plugin".'
		);
	}

	const plugin = {
		name,
		...settings,
	};

	plugins[name] = plugin;

	doAction('plugins.pluginRegistered', plugin);
	return plugin;
}

export function isPluginRegistered(name: string): boolean {
	return Boolean(plugins[name]);
}

export function updatePlugin(name: string, settings: Settings): Plugin {
	const plugin = plugins[name];

	const render = () => settings.render(plugin.render);

	plugins[name] = { ...plugin, render };

	doAction('plugins.pluginUpdated', plugins[name]);

	return plugin;
}

export function unregisterPlugin(name: string): Plugin {
	if (!plugins[name]) {
		console.error('Plugin "' + name + '" is not registered.');
		return;
	}

	const oldPlugin = plugins[name];

	delete plugins[name];

	doAction('plugins.pluginUnregistered', oldPlugin);

	return oldPlugin;
}

export function getPlugin(name: string): Plugin {
	return plugins[name];
}

export function getPlugins(): Array<Plugin> {
	return Object.values(plugins);
}
