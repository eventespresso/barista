import { useMemo, forwardRef } from 'react';
import classNames from 'classnames';

import { Select as SelectAdapter } from '@eventespresso/adapters';
import { withDebounce } from '../withDebounce';

import './style.scss';

import type { InlineSelectProps } from './types';

const InlineSelect = forwardRef<HTMLSelectElement, InlineSelectProps>((props, ref) => {
	const className = classNames('ee-select--inline', props.className);
	const rootClassName = classNames('ee-select-wrapper--inline', props?.rootProps?.className);
	const rootProps = useMemo(
		() => ({ ...props.rootProps, className: rootClassName }),
		[props.rootProps, rootClassName]
	);

	return <SelectAdapter {...props} ref={ref} className={className} rootProps={rootProps} />;
});

export default withDebounce(InlineSelect);
