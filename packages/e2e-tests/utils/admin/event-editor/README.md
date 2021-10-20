# E2E tests for Event Editor

There are many utilities created for writing E2E test for Event Editor.

## [`createNewEvent`](./createNewEvent.ts)

This functions abstracts the creation of an event. This is the utility that will be used before any other logic in the tests. You can use this utility inside `beforeAll()` or similar.

## [`EDTRGlider`](./EDTRGlider.ts)

This class has methods to get and update the event/EDTR information.

## [`EntityListParser`](./EntityListParser.ts)

This class helps you to parse an entity list, for example dates and tickets list and get different information about the list.

## [`EntityEditor`](./EntityEditor.ts)

This class helps you to make updates to an entity list.

## [`DateEditor`](./DateEditor.ts)

This class is a dates list specific version of `EntityEditor` and provides list specific methods.

## [`TicketEditor`](./TicketEditor.ts)

This class is a tickets list specific version of `EntityEditor` and provides list specific methods.

## [`TAMRover`](./TAMRover.ts)

This class deals with the UI of Ticket Assignment Manager and helps you get or set the information in the TAM modal.

## [`TPCSafari`](./TPCSafari.ts)

This class helps you write tests for Ticket Price Calculator.
