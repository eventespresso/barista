import * as Chakra from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import { Preview } from '../Preview';
import { Input } from '../Input';

import type { Factory as InputProps } from '../Input/types';
import type { Props, Value, Event } from './types';

export const InlineEdit = <T extends InputProps.InputType>({
	container: { placeholder, value, defaultValue, ...container },
	preview,
	input,
}: Props.Type<T>) => {
	const initialValue: Value = useMemo(() => {
		return defaultValue || value || '';
	}, [value, defaultValue]);

	const [state, setState] = useState(initialValue);

	// this happens when value is updated *outside* this component
	useEffect(() => {
		setState(initialValue);
	}, [value, defaultValue]);

	const onSubmit: Event.OnSubmit = (newValue) => {
		/**
		 * Existing consumers of this component treat 'onChange' as
		 * 'onSubmit' i.e. updating database as soon as change happens
		 * but we want to separate 'onChange' and 'onSubmit'
		 */
		if (container.onSubmit) container.onSubmit(newValue);
		if (container.onChange) container.onChange(newValue);
	};

	const onChange: Event.OnChange = (newValue) => {
		setState(newValue);
	};

	return (
		<Chakra.Editable
			placeholder={placeholder ?? ''}
			{...container}
			onChange={onChange}
			onSubmit={onSubmit}
			value={state}
		>
			{/* TODO: */}
			<Preview {...preview} />
			<Input {...input} />
		</Chakra.Editable>
	);
};
