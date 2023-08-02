import { z } from 'zod';

// unfortunately, read-only type is not supported *yet*
// https://github.com/colinhacks/zod/pull/1432

// event schemas
const EVT_ID = () => z.number().describe('event ID');
const EVT_name = () => z.string().describe('event name');

// datetime schemas
const DTT_ID = () => z.number().describe('datetime ID');
const DTT_name = () => z.string().describe('datetime name');

// ticket schemas
const TKT_ID = () => z.number().describe('ticket id');
const TKT_name = () => z.string().describe('ticket name');
// TKT_price is different format for GET and POST requests

const EventPost = z.object({
	EVT_name: EVT_name().optional().default(''),
});

const EventGet = z.object({
	EVT_ID: EVT_ID(),
	EVT_name: EVT_name(),
});

const DatetimePost = z.object({
	// we do need to specify event ID, but we cannot know it
	// in advance until we actually make event first
	EVT_ID: EVT_ID().optional(),
	DTT_name: DTT_name().optional().default(''),
});

const DatetimeGet = z.object({
	DTT_ID: DTT_ID(),
	EVT_ID: EVT_ID(),
	DTT_name: DTT_name(),
});

const TicketPost = z.object({
	TKT_name: TKT_name().optional().default(''),
	TKT_price: z.number().describe('ticket price').optional().default(0),
});

const TicketGet = z.object({
	TKT_ID: TKT_ID(),
	TKT_name: TKT_name(),
	TKT_price: z.object({
		raw: z.number(),
		pretty: z.string(),
	}),
});

const POST = {
	Event: EventPost,
	Datetime: DatetimePost,
	Ticket: TicketPost,
};

const GET = {
	Event: EventGet,
	Datetime: DatetimeGet,
	Ticket: TicketGet,
};

const Schema = {
	POST,
	GET,
};

export { Schema };