import React from 'react';
import type { Meta } from '@storybook/react/types-6-0';

import { Button, Select } from '../../';
import { noop } from '@eventespresso/utils';
import { EntityOptionsRow } from './';

export default {
	argTypes: {},
	component: EntityOptionsRow,
	title: 'Components/EntityOptionsRow-UI',
} as Meta;

// eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
const options = [
	{ label: 'Select…', value: '' },
	{ label: 'new date', value: 'RGF0ZXRpbWU6MTY1' },
	{ label: 'new date', value: 'RGF0ZXRpbWU6MTY2' },
	{ label: 'new date', value: 'RGF0ZXRpbWU6MTY3' },
	{ label: 'new date', value: 'RGF0ZXRpbWU6MTY4' },
	{ label: 'new date', value: 'RGF0ZXRpbWU6MTY5' },
	{ label: 'new date', value: 'RGF0ZXRpbWU6MTcw' },
	{ label: 'new date', value: 'RGF0ZXRpbWU6MTcx' },
	{ label: 'new date', value: 'RGF0ZXRpbWU6MTcy' },
	{ label: 'new date', value: 'RGF0ZXRpbWU6MTcz' },
];

const selectExistingID = 'existing-datetime';
const selectExisting = (
	<>
		<Select id={selectExistingID} options={options} onChangeValue={noop} />
		<Button buttonText='Select' onClick={noop} />
	</>
);

export const Default = () => {
	return (
		<EntityOptionsRow
			entityType='datetime'
			selectExisting={selectExisting}
			selectExistingID={selectExistingID}
			onAddNew={noop}
		/>
	);
};
