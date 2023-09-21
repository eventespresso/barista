<!-- TODO: finish me -->

This document pertains to [form package](../packages/form/package.json);

So the way the form works, as I am understanding, is as follows

-   component [`<EspressoForm />`](../packages/form/src/EspressoForm.tsx) is a form component as it implements [`<ReactFinalForm />`](https://www.npmjs.com/package/react-final-form)
-   its returns [`withConfig()`](../packages/form/src/context/withConfig.tsx) which is a [Higher Order Component (HOC)](https://legacy.reactjs.org/docs/higher-order-components.html) that contains context [`FormConfigContext`](../packages/form/src/context/ConfigProvider.tsx)
-   inside that context provider, the context is immediately consumed and the merging of provided config with default config
-   and inside [`FormConfigProvider`](../packages/form/src/context/ConfigProvider.tsx), there is also merging of config with default values
-   the context [`FormConfigContext`](../packages/form/src/context/ConfigProvider.tsx) can be used as a custom hook [`useFormConfig`](../packages/form/src/hooks/useFormConfig.ts)
-   this config is used for form field adapters
-   in other words, this custom hook allows to access form's config inside form field adapters without form drilling
-   adapters are [actual adapters](https://refactoring.guru/design-patterns/adapter) which bridge custom logic and/or data with 3rd party React libraries
-   the components themselves, however, follow [decorator pattern](https://refactoring.guru/design-patterns/decorator)
-   please note that the form component does _not_ define any fields itself as those are available are either available as standalone custom packages or taken from [Charka UI React](https://www.npmjs.com/package/@chakra-ui/react)

<!-- TODO: there are adapters inside the form package but there is also a standalone packaged called 'adapters'??? -->

<!-- TODO: there is also 'ee-components' package ??? What does it do??? -->
