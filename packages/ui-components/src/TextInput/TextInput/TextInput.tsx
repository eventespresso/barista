import { forwardRef } from 'react';
import classNames from 'classnames';

import { TextInput as TextInputAdapter, TextInputProps } from '@eventespresso/adapters';

import { withLabel } from '../../withLabel';
import type { WithLabelProps } from '../../withLabel';
import './style.scss';

export interface TextInputWithLabelProps extends TextInputProps, WithLabelProps {}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
	const className = classNames('ee-text-input ee-input-base', props.className);
	return <TextInputAdapter {...props} className={className} ref={ref} />;
});

export const TextInputWithLabel = withLabel(TextInput);
