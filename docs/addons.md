# Addons integration

To allow any addon to integrate with our apps, we use the [`@eventespresso/plugins`](../packages/plugins/README.md) package.
Inside the app we need to provide an area/container for the addons to execute their code. For this purpose, we render the `PluginArea` component of `@eventespresso/plugins`. For example we render `<PluginArea />` in [`<EventEditor />`](../domains/core/admin/eventEditor/src/ui/EventEditor.tsx).

Then addons can use `registerPlugin()` from `@eventespresso/plugins` to register their plugins which will be rendered inside `PluginArea`.

An example of the integration can be seen in `domains/eventSmart/admin/edtrSlots`.
