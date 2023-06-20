import { modifyDateProps } from '../../modifyDate';

// https://jestjs.io/docs/api#testeachtablename-fn-timeout
type Table = { expected: Date } & modifyDateProps;

const addInteger: Table[] = [
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 0),
		unit: 'milliseconds',
		value: 100,
		type: 'later',
		expected: new Date(2023, 0, 1, 0, 0, 0, 100),
	},
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 0),
		unit: 'seconds',
		value: 35,
		type: 'later',
		expected: new Date(2023, 0, 1, 0, 0, 35, 0),
	},
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 0),
		unit: 'minutes',
		value: 7,
		type: 'later',
		expected: new Date(2023, 0, 1, 0, 7, 0, 0),
	},
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 0),
		unit: 'hours',
		value: 10,
		type: 'later',
		expected: new Date(2023, 0, 1, 10, 0, 0, 0),
	},
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 0),
		unit: 'days',
		value: 5,
		type: 'later',
		expected: new Date(2023, 0, 6, 0, 0, 0, 0),
	},
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 0),
		unit: 'weeks',
		value: 3,
		type: 'later',
		expected: new Date(2023, 0, 22, 0, 0, 0, 0),
	},
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 0),
		unit: 'months',
		value: 2,
		type: 'later',
		expected: new Date(2023, 2, 1, 0, 0, 0, 0),
	},
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 0),
		unit: 'quarters',
		value: 3,
		type: 'later',
		expected: new Date(2023, 9, 1, 0, 0, 0, 0),
	},
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 0),
		unit: 'years',
		value: 1,
		type: 'later',
		expected: new Date(2024, 0, 1, 0, 0, 0, 0),
	},
];

const subInteger: Table[] = [
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 100),
		unit: 'milliseconds',
		value: 100,
		type: 'earlier',
		expected: new Date(2023, 0, 1, 0, 0, 0, 0),
	},
	{
		date: new Date(2023, 0, 1, 0, 0, 35, 0),
		unit: 'seconds',
		value: 35,
		type: 'earlier',
		expected: new Date(2023, 0, 1, 0, 0, 0, 0),
	},
	{
		date: new Date(2023, 0, 1, 0, 7, 0, 0),
		unit: 'minutes',
		value: 7,
		type: 'earlier',
		expected: new Date(2023, 0, 1, 0, 0, 0, 0),
	},
	{
		date: new Date(2023, 0, 1, 10, 0, 0, 0),
		unit: 'hours',
		value: 10,
		type: 'earlier',
		expected: new Date(2023, 0, 1, 0, 0, 0, 0),
	},
	{
		date: new Date(2023, 0, 6, 0, 0, 0, 0),
		unit: 'days',
		value: 5,
		type: 'earlier',
		expected: new Date(2023, 0, 1, 0, 0, 0, 0),
	},
	{
		date: new Date(2023, 0, 22, 0, 0, 0, 0),
		unit: 'weeks',
		value: 3,
		type: 'earlier',
		expected: new Date(2023, 0, 1, 0, 0, 0, 0),
	},
	{
		date: new Date(2023, 2, 1, 0, 0, 0, 0),
		unit: 'months',
		value: 2,
		type: 'earlier',
		expected: new Date(2023, 0, 1, 0, 0, 0, 0),
	},
	{
		date: new Date(2023, 9, 1, 0, 0, 0, 0),
		unit: 'quarters',
		value: 3,
		type: 'earlier',
		expected: new Date(2023, 0, 1, 0, 0, 0, 0),
	},
	{
		date: new Date(2024, 0, 1, 0, 0, 0, 0),
		unit: 'years',
		value: 1,
		type: 'earlier',
		expected: new Date(2023, 0, 1, 0, 0, 0, 0),
	},
];

const addFraction: Table[] = [
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 0),
		unit: 'milliseconds',
		value: 100.5,
		type: 'later',
		expected: new Date(2023, 0, 1, 0, 0, 0, 101),
	},
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 0),
		unit: 'seconds',
		value: 35.5,
		type: 'later',
		expected: new Date(2023, 0, 1, 0, 0, 35, 500),
	},
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 0),
		unit: 'minutes',
		value: 7.5,
		type: 'later',
		expected: new Date(2023, 0, 1, 0, 7, 30, 0),
	},
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 0),
		unit: 'hours',
		value: 10.66,
		type: 'later',
		expected: new Date(2023, 0, 1, 10, 39, 36, 0),
	},
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 0),
		unit: 'days',
		value: 5.23,
		type: 'later',
		expected: new Date(2023, 0, 6, 5, 31, 12, 0),
	},
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 0),
		unit: 'weeks',
		value: 3.76,
		type: 'later',
		expected: new Date(2023, 0, 27, 7, 40, 48, 0),
	},
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 0),
		unit: 'months',
		value: 2.5,
		type: 'later',
		expected: new Date(2023, 2, 15, 0, 0, 0, 0),
	},
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 0),
		unit: 'quarters',
		value: 3.15,
		type: 'later',
		expected: new Date(2023, 9, 13, 14, 24, 0, 0),
	},
	{
		date: new Date(2023, 0, 1, 0, 0, 0, 0),
		unit: 'years',
		value: 1.17,
		type: 'later',
		expected: new Date(2024, 2, 2, 2, 52, 48, 0),
	},
];

const subFraction = {};

const fixture = {
	add: {
		integer: addInteger,
		fraction: addFraction,
	},
	sub: {
		integer: subInteger,
		fraction: subFraction,
	},
};

export { fixture };
