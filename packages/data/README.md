# Data

This package uses [Apollo Client](https://www.apollographql.com/docs/react/) to provide data layer for the applications. All of the Apollo Client initialization happens in [client.ts](./src/client.ts);

### `withDataProvider`

This HOC provides the data context to the App/Component

```tsx
import { withDataProvider, useCacheQuery } from '@eventespresso/data';

function App() {
	// this should now have access to local cache.
	useCacheQuery();

	return <div></div>;
}

export default withDataProvider(App);
```
