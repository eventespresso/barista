import { useSpring, animated } from 'react-spring';

import { __ } from '@eventespresso/i18n';
import { CompassFilled } from '@eventespresso/icons';
import { Button, ButtonType } from '../Button';
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

	const buttonType = showLegend ? ButtonType.PRIMARY : ButtonType.DEFAULT;

	return (
		<Button
			active={showLegend}
			buttonType={buttonType}
			className={className}
			icon={icon}
			noHorizontalMargin={noHorizontalMargin}
			onClick={toggleLegend}
			size='tiny'
		>
			{__('legend')}
		</Button>
	);
};

export default ToggleLegendButton;
