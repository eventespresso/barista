import { z } from 'zod';

// unfortunately, read-only type is not supported *yet*
// https://github.com/colinhacks/zod/pull/1432

const EVT_ID = () => z.number().describe('event ID');
const EVT_name = () => z.string().optional().default('');
const DTT_ID = () => z.number().describe('datetime ID').optional();
const DTT_name = () => z.string().describe('datetime name').optional();

const EventPost = z.object({
	EVT_name: EVT_name().optional().default(''),
});

const EventGet = z.object({
	EVT_ID: EVT_ID(),
	EVT_name: EVT_name(),
});

const DatetimePost = z.object({
	EVT_ID: EVT_ID(),
	DTT_name: DTT_name().optional().default(''),
});

const DatetimeGet = z.object({
	DTT_ID: DTT_ID(),
	EVT_ID: EVT_ID(),
	DTT_name: DTT_name(),
});

const POST = {
	Event: EventPost,
	Datetime: DatetimePost,
};

const GET = {
	Event: EventGet,
	Datetime: DatetimeGet,
};

const Schema = {
	POST,
	GET,
};

export { Schema };
