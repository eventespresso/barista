import { useSpring, animated } from 'react-spring';
import { __ } from '@eventespresso/i18n';

import { CompassFilled } from '@eventespresso/icons';
import { Button } from '../Button';
import type { ToggleLegendButtonProps } from './types';

const ToggleLegendButton: React.FC<ToggleLegendButtonProps> = ({
	className,
	noHorizontalMargin,
	showLegend,
	toggleLegend,
}) => {
	const iconProps = useSpring({
		display: 'inline-flex',
		transform: `rotate(${showLegend ? 0 : 180}deg)`,
	});

	// eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
	const icon = () => (
		<animated.div style={iconProps}>
			<CompassFilled />
		</animated.div>
	);

	const tooltip = showLegend ? __('hide legend') : __('show legend');

	return (
		<Button
			active={showLegend}
			className={className}
			icon={icon}
			noHorizontalMargin={noHorizontalMargin}
			onClick={toggleLegend}
			size='tiny'
		>
			{tooltip}
		</Button>
	);
};

export default ToggleLegendButton;
