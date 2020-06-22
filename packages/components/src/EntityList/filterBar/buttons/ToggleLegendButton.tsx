import React from 'react';
import { useSpring, animated } from 'react-spring';
import { __ } from '@wordpress/i18n';

import { Button } from '../../../Button';
import { CompassFilled } from '@eventespresso/icons';
import { ToggleLegendButtonProps } from '../types';

import { getPropsAreEqual } from '@eventespresso/services';

const ToggleLegendButton: React.FC<ToggleLegendButtonProps> = ({ listId, showLegend, toggleLegend, ...rest }) => {
	const iconProps = useSpring({
		display: 'inline-flex',
		transform: `rotate(${showLegend ? 0 : 180}deg)`,
	});

	const icon = () => (
		<animated.div style={iconProps}>
			<CompassFilled />
		</animated.div>
	);

	const filterId = `ee-toggle-legend-btn-${listId}`;
	const tooltip = showLegend ? __('hide legend') : __('show legend');

	return (
		<Button
			active={showLegend}
			className='ee-filter-bar__btn ee-btn--small'
			icon={icon}
			id={filterId}
			onClick={toggleLegend}
			labelClassName={'ee-filter-bar__btn-wrap'}
			{...rest}
		>
			{tooltip}
		</Button>
	);
};

export default React.memo(ToggleLegendButton, getPropsAreEqual(['listId'], ['showLegend'], ['isDisabled']));
