# EDTR services

This package contains the Event Editor (EDTR) specific services, mostly related to data services.

## Services provided

-   Contexts

    This package provides all the contexts needed for EDTR to work. It does so in [`ContextProvider.tsx`](./src/context/ContextProvider.tsx). There is also [`withEdtrContext`](./src/context/withEdtrContext.tsx) HOC which can be consumed to provide EDTR contexts to any component.

-   Data/Apollo Services

    All the data services required for EDTR are provided by this package. The reason for moving the data services fom EDTR domain to this package was that the services were consumed by other domains like REM.

## Data services

-   Cache rehydration

    The most important service that this package provides is the data rehydration of the Apollo cache. It reads the DOM data and updates/rehydrates the local cache to avoid network requests being sent for the initial data. It does so in [`useCacheRehydration`](./src/apollo/initialization/useCacheRehydration.ts).

-   Queries
    It provides all the data queries required for EDTR. The queries and all the related utilities are places in `src/apollo/queries` directory, organized into entity types.

-   Mutations
    It provides all the mutations required for EDTR. The mutations and all the related utilities are places in `src/apollo/mutations` directory, organized into entity types.

## Query Examples

-   [`useDatetimes()`](./src/apollo/queries/datetimes/useDatetimes.ts) - returns the list of all the datetimes available in cache, regardless of their status.

-   [`useDatetimeItem({ id })`](./src/apollo/queries/datetimes/useDatetimeItem.ts) - returns a single datetime (given by the `id`) from the local cache. It uses `typePolicies` of `InMemoryCache`. [More info here](../data/README.md#how-our-local-cache-works).

-   [`useTickets()`](./src/apollo/queries/tickets/useTickets.ts) - returns the list of all the tickets available in cache. By default, filters out the default tickets using `isNotDefault` predicate.

-   [`useTicketPrices()`](./src/apollo/queries/tickets/useTicketPrices.ts) - returns a callbak to get all the prices related to a given ticket.

## Mutation Examples

-   [`useDatetimeMutator()`](./src/apollo/mutations/datetimes/useDatetimeMutator.ts) - returns an object with three properties - `createEntity`, `updateEntity` and `deleteEntity` to help perform the corresponding operations.
-   [`useTicketMutator()`](./src/apollo/mutations/tickets/useTicketMutator.ts) and [`usePriceMutator()`](./src/apollo/mutations/prices/usePriceMutator.ts) work same as `useDatetimeMutator()`.
-   For each entity mutation, we have `useMutationHandler()` which
    -   Prepares the mutation inputs for the API requests
    -   Takes care of updating the local cache after the mutation.
    -   Provides optimistic responses for the UI to reflect the changes immediately.
