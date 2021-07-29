import { forwardRef } from 'react';

import classNames from 'classnames';

import type { AnyObject } from '@eventespresso/utils';
import { Tooltip } from '../';
import type { WithTooltipProps } from './types';
import type { ForwardRefComponent } from '../types';

import './style.scss';

const withTooltip = <P extends AnyObject>(
	WrappedComponent: React.ComponentType<P & WithTooltipProps>
): ForwardRefComponent<P & WithTooltipProps, typeof WrappedComponent> => {
	// Define ref type
	type Ref = React.Ref<typeof WrappedComponent>;
	type RefProps = { forwardedRef: Ref };

	const WithTooltip: React.ComponentType<P & WithTooltipProps & RefProps> = ({
		forwardedRef,
		showTooltipOnMobile = false,
		tooltip,
		tooltipProps,
		...props
	}) => {
		const noTooltip = !tooltip || props.buttonText === tooltip;

		if (noTooltip) {
			return <WrappedComponent {...(props as P)} ref={forwardedRef} />;
		}

		const wrappedComp = (
			<WrappedComponent aria-label={tooltip} {...(props as P)} ref={forwardedRef} tooltip={tooltip} />
		);

		if (!showTooltipOnMobile) {
			return (
				<Tooltip {...tooltipProps} tooltip={tooltip}>
					{wrappedComp}
				</Tooltip>
			);
		}

		const tooltipsClass = classNames('ee-mobile-help-text', tooltipProps?.className);

		const helpTextClass = classNames(
			'ee-mobile-help-text__tooltip',
			tooltip.length < 25 && 'ee-mobile-help-text--short',
			tooltip.length > 50 && 'ee-mobile-help-text--long'
		);

		return (
			<Tooltip className={tooltipsClass} {...tooltipProps} tooltip={tooltip}>
				<div className='ee-mobile-help-text__btn-wrap'>
					{wrappedComp}
					<div className={helpTextClass}>{tooltip}</div>
				</div>
			</Tooltip>
		);
	};

	const ForwardedComponentWithTooltip = (props: P, ref: Ref) => {
		return <WithTooltip {...props} forwardedRef={ref} />;
	};

	return forwardRef(ForwardedComponentWithTooltip);
};

export default withTooltip;
