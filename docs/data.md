# Data

We use our `@eventespresso/data` package to abstract our data layer. The package provides all the data and local cache/state management services to our apps.

To improve the UX, we try to avoid network requests as much as possible. To load the initial data required for our apps, we dump the data to DOM from the backend and then use this data to rehydrate our apps. An example of this can be seen in [`useCacheRehydration`](../packages/edtr-services/src/apollo/initialization/useCacheRehydration.ts).
