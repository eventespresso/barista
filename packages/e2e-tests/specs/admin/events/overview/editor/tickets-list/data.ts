export const crazyTestCases = [
	{
		name: 'sets the price to 0 for non-numeric input',
		inputTotal: 'I am not crazy!',
		expectedTotal: 0,
	},
	{
		name: 'tests the craziness quotient by setting the price to 0 for the craziest input',
		inputTotal: '()*&@_+hkj&68(7)=!)(*0989^%$3(*^&(*%&^$^%#$%476hbgFYU^$%6VR87',
		expectedTotal: 0,
	},
	{
		name: 'tests the tolerance level of the editor',
		inputTotal: '999999999999999999999999999999999999999999',
		expectedTotal: 1e42,
	},
	{
		name: 'tests the niceness of the craziness',
		inputTotal: '00000000000000000000000000000000000000000000',
		expectedTotal: 0,
	},
	{
		name: 'tests the arrogance of the craziness',
		inputTotal: '999999999999999999999999999999999999999999.9999999999999999999999999999999999999',
		expectedTotal: 1e42,
	},
	{
		name: 'tests the smartness of the craziness',
		inputTotal: '000000000000000000000000000000000000000000.00000000000000000000000000000000000000000',
		expectedTotal: 0,
	},
	{
		name: 'sets the price to its absolute value if it is negative',
		inputTotal: '-876876.89',
		expectedTotal: 876876.89,
	},
	{
		name: 'sets the price to correct round figure - ceiling',
		inputTotal: '123456789.987654321',
		expectedTotal: 123456789.99,
	},
	{
		name: 'sets the price to correct round figure - floor',
		inputTotal: '123456789.123456789',
		expectedTotal: 123456789.12,
	},
];
