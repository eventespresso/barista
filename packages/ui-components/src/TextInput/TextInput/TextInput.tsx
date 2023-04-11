import { forwardRef } from 'react';
import classNames from 'classnames';

import { TextInput as TextInputAdapter, TextInputProps as TextInputAdapterProps } from '@eventespresso/adapters';

import { withLabel } from '../../withLabel';
import type { WithLabelProps } from '../../withLabel';

export interface TextInputProps extends TextInputAdapterProps, WithLabelProps { }

import './style.scss';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
	const className = classNames('ee-text-input ee-input-base', props.className);
	return <TextInputAdapter {...props} className={className} ref={ref} />;
});

export const TextInputWithLabel = withLabel(TextInput);
