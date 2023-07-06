import { renderHook, act } from '@testing-library/react-hooks';

import { actWait } from '@eventespresso/utils/src/test';
import useGenerateDates from '../useGenerateDates';
import { FormStateProvider } from '../../context';
import { useFormState } from '../';

const testCases = [
	{
		name: 'tests rRule',
		rRule: 'DTSTART:20190923T183000Z\nRRULE:FREQ=YEARLY;BYMONTH=3;BYMONTHDAY=5;COUNT=2;WKST=MO',
		exRule: '',
		rDates: [],
		exDates: [],
		expectedDates: ['2020-03-05T18:30:00.000Z', '2021-03-05T18:30:00.000Z'],
	},
	{
		name: 'tests rRule with exRule',
		rRule: 'DTSTART:20190923T183000Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR;COUNT=6;WKST=MO',
		exRule: 'DTSTART:20190923T183000Z\nRRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=WE;COUNT=6;WKST=MO',
		rDates: [],
		exDates: [],
		expectedDates: [
			'2019-09-23T18:30:00.000Z',
			'2019-09-27T18:30:00.000Z',
			'2019-09-30T18:30:00.000Z',
			'2019-10-02T18:30:00.000Z',
			'2019-10-04T18:30:00.000Z',
			'2019-10-07T18:30:00.000Z',
		],
	},
	{
		name: 'tests rRule with rDates',
		rRule: 'DTSTART:20190923T183000Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR;COUNT=6;WKST=MO',
		exRule: '',
		rDates: ['2020-10-25T18:30:00.000Z', '2020-11-13T18:30:00.000Z'],
		exDates: [],
		expectedDates: [
			'2019-09-23T18:30:00.000Z',
			'2019-09-25T18:30:00.000Z',
			'2019-09-27T18:30:00.000Z',
			'2019-09-30T18:30:00.000Z',
			'2019-10-02T18:30:00.000Z',
			'2019-10-04T18:30:00.000Z',
			// the rDates
			'2020-10-25T18:30:00.000Z',
			'2020-11-13T18:30:00.000Z',
		],
	},
	{
		name: 'tests rRule with exDates',
		rRule: 'DTSTART:20190923T183000Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR;COUNT=6;WKST=MO',
		exRule: '',
		rDates: [],
		exDates: ['2019-09-30T18:30:00.000Z', '2019-10-02T18:30:00.000Z'],
		expectedDates: [
			'2019-09-23T18:30:00.000Z',
			'2019-09-25T18:30:00.000Z',
			'2019-09-27T18:30:00.000Z',
			// exDates
			// '2019-09-30T18:30:00.000Z',
			// '2019-10-02T18:30:00.000Z',
			'2019-10-04T18:30:00.000Z',
		],
	},
	{
		name: 'tests rRule with exRule and rDates',
		rRule: 'DTSTART:20190923T183000Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR;COUNT=6;WKST=MO',
		exRule: 'DTSTART:20190923T183000Z\nRRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=WE;COUNT=6;WKST=MO',
		rDates: ['2020-10-25T18:30:00.000Z', '2020-11-13T18:30:00.000Z'],
		exDates: [],
		expectedDates: [
			'2019-09-23T18:30:00.000Z',
			'2019-09-27T18:30:00.000Z',
			'2019-09-30T18:30:00.000Z',
			'2019-10-02T18:30:00.000Z',
			'2019-10-04T18:30:00.000Z',
			'2019-10-07T18:30:00.000Z',
			// the rDates
			'2020-10-25T18:30:00.000Z',
			'2020-11-13T18:30:00.000Z',
		],
	},
	{
		name: 'tests rRule with exRule and exDates',
		rRule: 'DTSTART:20190923T183000Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR;COUNT=6;WKST=MO',
		exRule: 'DTSTART:20190923T183000Z\nRRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=WE;COUNT=6;WKST=MO',
		rDates: [],
		exDates: ['2019-09-30T18:30:00.000Z', '2019-10-02T18:30:00.000Z'],
		expectedDates: [
			'2019-09-23T18:30:00.000Z',
			'2019-09-27T18:30:00.000Z',
			// exDates
			// '2019-09-30T18:30:00.000Z',
			// '2019-10-02T18:30:00.000Z',
			'2019-10-04T18:30:00.000Z',
			'2019-10-07T18:30:00.000Z',
		],
	},
	{
		name: 'tests rRule with exRule, rDates and exDates',
		rRule: 'DTSTART:20190923T183000Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR;COUNT=6;WKST=MO',
		exRule: 'DTSTART:20190923T183000Z\nRRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=WE;COUNT=6;WKST=MO',
		rDates: ['2020-10-25T18:30:00.000Z', '2020-11-13T18:30:00.000Z'],
		exDates: ['2019-09-30T18:30:00.000Z', '2019-10-02T18:30:00.000Z'],
		expectedDates: [
			'2019-09-23T18:30:00.000Z',
			'2019-09-27T18:30:00.000Z',
			// exDates
			// '2019-09-30T18:30:00.000Z',
			// '2019-10-02T18:30:00.000Z',
			'2019-10-04T18:30:00.000Z',
			'2019-10-07T18:30:00.000Z',
			// the rDates
			'2020-10-25T18:30:00.000Z',
			'2020-11-13T18:30:00.000Z',
		],
	},
];

describe('useGenerateDates', () => {
	testCases.forEach(({ name, rRule, exRule, rDates, exDates, expectedDates }) => {
		it(name, async () => {
			const { result } = renderHook(
				() => {
					return {
						formState: useFormState(),
						generatedDates: useGenerateDates(),
					};
				},
				{ wrapper: FormStateProvider }
			);

			await actWait();

			act(() => {
				result.current.formState.setRRule(rRule);
				result.current.formState.setExRule(exRule);

				rDates.forEach((rDate) => {
					result.current.formState.addRDate(rDate);
				});
				exDates.forEach((exDate) => {
					result.current.formState.addExDate(exDate);
				});
			});

			// number of dates returned must be same
			expect(result.current.generatedDates.length).toBe(expectedDates.length);
			// every expected date must be in the list
			result.current.generatedDates.forEach(({ date }) => {
				expect(expectedDates).toContain(date.toISOString());
			});
		});
	});

	it('tests the edge cases for rRule and exRule', async () => {
		const { result } = renderHook(
			() => {
				return {
					formState: useFormState(),
					generatedDates: useGenerateDates(),
				};
			},
			{ wrapper: FormStateProvider }
		);

		await actWait();

		// empty values
		[null, undefined, ''].forEach((rRule) => {
			act(() => {
				result.current.formState.setRRule(rRule);
				result.current.formState.setExRule(rRule);
			});

			// no dates shoul be generated
			expect(result.current.generatedDates.length).toBe(0);
		});

		act(() => {
			result.current.formState.setRRule('invalid-rrule');
			result.current.formState.setExRule('invalid-exrule');
		});
		// invalid rule should throw an error
		expect(() => result.current.generatedDates).toThrow();
	});
});
