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

## How does the `DataProvider` work?

`DataProvider` uses `ApolloProvider` from `@apollo/client`. It passes the client intance to `ApolloProvider` created in [client.ts](./src/client.ts). A few things happen in `client.ts` before creating an instance of `ApolloClient`:

-   It uses `BatchHttpLink` from `'@apollo/client/link/batch-http'` to serve as Apollo Client's network layer. `BatchHttpLink` helps in batching multiple GQL requests sent together in a single batch.
-   `uri` (our `graphqlEndpoint`) is passed to `BatchHttpLink` instance from DOM data.
-   `X-WP-Nonce` header is passed to authenticate the GQL requests server-side.
-   `InMemoryCache` from `@apollo/client` is used to handle local cache.
-   `typePolicies` for local cache are defined. [See below](#how-our-local-cache-works) for more information.

## How our local cache works?

It is assumed that entity lists will be fetched or rehydrated using DOM data with all the required fields. Apollo normalizes these entity lists to store each entity given by its entity type (GQL type) and its ID (GUID). For example, when `EspressoDatetime` list is rehydrated into Apollo cache, Apollo normalizes the list to create a reference (key) for each datetime.

![image](https://user-images.githubusercontent.com/18226415/139637045-980b564f-4331-4513-af5c-e5d7b716148c.png)

In this screenshot, you can see that the reference is created from GQL type (`EspressoDatetime`) and the GUID (`RGF0ZXRpbWU6Mzc0`), i.e. `EspressoDatetime:RGF0ZXRpbWU6Mzc0`.

Now, if we need to get the single datetime, we don't need to fetch it from the server, because it's already in the local cache. So we can use the above reference to get it. To be able to do this, we use the `typePolicies` configuration for each entity type. Currently (at the time of writing), we have added the configuration for these entity types:

-   `datetime`
-   `espressoEvent` (prefixed, because event is CPT)
-   `ticket`
-   `price`
-   `priceType`
-   `recurrence`

After defining those policies, we can query the cache for any given entity by its ID.

```gql
query GET_DATETIME($id: ID!) {
	datetime(id: $id) {
		id
		name
	}
}
```
