import { forwardRef, useMemo } from 'react';
import classNames from 'classnames';

import { Select as SelectAdapter } from '@eventespresso/adapters';
import { ArrowDownAlt } from '@eventespresso/icons';
import { withLabel } from '../withLabel';
import InlineSelect from './InlineSelect';

import type { SelectProps } from './types';

import './style.scss';

export const Select = forwardRef<HTMLSelectElement, SelectProps & React.ComponentProps<typeof InlineSelect>>(
	({ fitContainer, flow, id, noBorderColor, size, ...props }, ref) => {
		const className = classNames(
			'ee-select',
			noBorderColor && 'ee-select--no-border-color',
			props.className,
			size && size !== 'default' && [`ee-select--${size}`]
		);
		const wrapperClassName = classNames('ee-select-wrapper', fitContainer && 'ee-select-wrapper--fit-container');
		const rootProps = useMemo(() => ({ className: wrapperClassName, width: 'max-content' }), [wrapperClassName]);

		if (flow === 'inline') {
			return (
				<InlineSelect
					debounceDelay={2500}
					{...props}
					className={className}
					id={id}
					ref={ref}
					rootProps={rootProps}
				/>
			);
		}

		return (
			<SelectAdapter
				{...props}
				className={className}
				icon={<ArrowDownAlt />}
				id={id}
				ref={ref}
				rootProps={rootProps}
			/>
		);
	}
);

export const SelectWithLabel = withLabel(Select);
