# Event Editor

Event Editor (shortly called as EDTR) is one of the main domains (use cases) of Event Espresso. EDTR is the place where admin users can create/manage their events and the related entities/information. EDTR is rendered on the post edit page of a custom WP post type. Here are some points about what the EDTR comprises of:

-   The basic/parent entity inside EDTR is Event, which is a WordPress CPT as mentioned above
-   An Event can have Datetime(s) `(1:n)`, Ticket(s) and a Venue `(1:1)`
-   Every Datetime must be related to a Ticket and vice-versa `(m:n)`
-   Every Datetime can have its own Venue `(1:1)`
-   Ticket(s) have Price(s) `(1:n)`, Registration(s) `(1:n)`
-   Every Price is related to a PriceType `(1:1)`
-   All these entities have properties like Name/Title, Description etc.
-   Every Datetime and Ticket has a Start and End date.
-   Start and End dates of the datetimes eventually become the start and end dates for the Event.

So, to organize all of this, we divide EDTR into different sections:

-   **Event Details** - This section contains the UI to manage Event properties.
-   **Registration Options** - This section contains the UI related to Event Registration
-   **Venue Details** - This part of EDTR deals with the Event Venue.
-   **Event Dates List** - This section contains the list of all the dates related to the event.
-   **Available Tickets List** - This section contains the list of all the tickets related to the event.
-   **Registration Form** - This section manages the registration for the event.

More details [here](https://github.com/eventespresso/barista/wiki/Domains:-Event-Editor).

The root component of EDTR is [`EventEditor`](./src/ui/EventEditor.tsx) which is wrapped by all the contexts needed for the editor, which includes data and other services etc.

## How are the relations maintained?

When editing an event (a CPT), we need to have all the information about all its related entities and then their related entities and so on. We also need to have the information about the relations of all these entities. Simply put, we need to have a complete relational model on client-side. The changes in relations can happen while editing an event and the related details/entities, then we have to constantly update the UI.

Solution:
We have a multi-dimensional relational map, a plain JavaScript object and we treat it as a single source of truth about all the relational information our UI components need. Here, each key of the map is the entity type and the value is also an object, of which the keys are the IDs of those entities and each value being another object with keys being the related entity type and the value being an array of related entity IDs. OK, I know it's getting confusing, here is the structure we have.

```json
{
	"datetimes": {
		"datetime-abc": {
			"tickets": ["ticket-abc", "some-other-ticket"]
		}
	},
	"tickets": {
		"ticket-abc": {
			"datetimes": ["datetime-abc", "datetime-def"],
			"prices": ["price-abc", "price-xyz"]
		},
		"ticket-xyz": {
			"datetimes": ["datetime-abc"],
			"prices": ["price-pqr"]
		}
	},
	"prices": {
		"price-abc": {
			"tickets": ["ticket-abc"],
			"priceTypes": ["priceType-abc"]
		},
		"price-pqr": {
			"tickets": ["ticket-xyz"],
			"priceTypes": ["priceType-def"]
		}
	}
}
```

So, with that structure, given an entity type and the entity ID, we can easily find and update the related entities.
Now, to abstract the complexity, we have [useRelationsManager](../../../../packages/services/src/relations/useRelationsManager.ts), which provides the methods to read and update those relations.

We use the same Relations Manager to manage the state for Ticket Assignment Manager, another part of EDTR with complex requirements.

### Read more

-   [Addons integration](../../../../docs/addons.md)
-   [Data layer](../../../../docs/data.md)
-   [EDTR E2E tests](../../../../packages/e2e-tests/utils/admin/event-editor/README.md)
