import type { IconName } from '@eventespresso/icons';
import { ButtonProps } from '../Button';

export interface LegendBaseProps {
	className?: string;
	columnsPerRow?: number;
	direction?: 'row';
	termWhiteBg?: boolean;
}

export interface LegendProps extends LegendBaseProps {
	legendConfig: LegendConfig<string>;
}

interface IconType<ClassName = string> {
	bgClassName?: string;
	className?: ClassName;
	description: string;
	icon: IconName | React.ElementType;
}

export interface LegendConfig<ClassName> {
	icons: IconType<ClassName>[];
	swatches?: Record<string, any>;
}

export interface ToggleLegendButtonProps extends ButtonProps {
	showLegend?: boolean;
	toggleLegend: VoidFunction;
}
