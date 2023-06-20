import { modifyDate, modifyDateProps } from '../../modifyDate';
import { fixture } from './fixture';

// https://github.com/date-fns/date-fns/issues/571
// it appears that when date-fns is supplied zulu-based (GMT+0) Date object, it erronously loses one hour due to DST; this is further corroborated by supplying env var TZ=UTC where hour is no longer lost

// at the moment, there is no need to be concerned with timezone conversion, DST, etc. as the times are saved as follows:
// - DB uses column type DATETIME where time supplied is converted to UTC based on server's timezone which is defined in WP Settings
// - when DATETIME is retrieved from the database, the time is converted using server's timezone which is defined in WP Settings
// - when displaying dates on public pages, the dates are shown in server's timezone, *NOT* user's so as per business logic, there is no need for supporting more than 1 timezone as 20.06.23

// REFACTOR: when jest is upgraded to version 27.0+, it will become possible to use $arg.unit and $arg.value when running .each()
// https://jestjs.io/docs/api#testeachtablename-fn-timeout
// https://stackoverflow.com/a/69872896

test('Pure function', () => {
	const date = new Date(2023, 0, 1, 0, 0, 0, 0);
	const args: modifyDateProps = {
		date: date,
		unit: 'hours',
		value: 1,
		type: 'later',
	};
	const modified = modifyDate(args);
	expect(date === modified).toBe(false);
});

test.each(fixture.add.integer)('add whole units: %p', ({ expected, ...args }) => {
	const date = modifyDate(args);
	expect(date).toEqual(expected);
});

test.each(fixture.sub.integer)('subtract whole units: %p', ({ expected, ...args }) => {
	const date = modifyDate(args);
	expect(date).toEqual(expected);
});

test.each(fixture.add.fraction)('add fractional units: %p', ({ expected, ...args }) => {
	const date = modifyDate(args);
	expect(date).toEqual(expected);
});

test.each(fixture.sub.fraction)('subtract fractional units: %p', ({ expected, ...args }) => {
	const date = modifyDate(args);
	expect(date).toEqual(expected);
});
