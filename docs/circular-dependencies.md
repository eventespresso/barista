In order to avoid circular dependency issue with Barista packages (see directory `packages/`), there is a custom eslint rule called `no-circular-imports` (see `eslint/index.js`). This rule works by checking the "level" (see `eslint/levels.js`) of the package during linting. The rule is that only higher level packages can import lower level packages and not the other way around. E.g. `edtr-services` can import `ui-components` but not the other way around.

In circumstances where you _do_ need to go the other way around i.e. import higher level package in a lower level package, consider that components defined in `domains/` directory are immune to this rule. So roughly it would look like this:

-   in `domains/` component, store higher level package/functiona/etc. in a variable
-   pass that variable to a lower level component either via a prop, or via React context ([example](./assets/context-diagram.png))

Passing a prop is appropriate if the prop is used immediately. If the prop needs to be passed through several components, it leads to an anti-pattern called prop drilling. In which case React context is more appropriate.

Further Reading:

-   [Circular dependency](https://en.wikipedia.org/wiki/Circular_dependency)
-   [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
-   [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
-   [createContext](https://react.dev/reference/react/createContext)
-   [useContext](https://react.dev/reference/react/useContext)
