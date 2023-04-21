import { createElement, useMemo } from 'react';

import classNames from 'classnames';
import { is } from 'ramda';

import { Icon } from '@eventespresso/icons';
import { ColorSwatch } from '../ColorSwatch';
import { DescriptionList } from '../DescriptionList';

import type { LegendProps } from './types';
import type { IconName } from '@eventespresso/icons';

const Legend: React.FC<LegendProps> = ({ columnsPerRow, direction, legendConfig, termWhiteBg }) => {
	const { icons, swatches } = legendConfig;

	const iconsSource = icons.map(({ bgClassName, className, description, icon }) => {
		const term = (!is(String)(icon) && createElement(icon)) || (
			<Icon aria-label={description} name={icon as IconName} svgSize={18} />
		);

		return {
			bgClassName,
			className: classNames('ee-legend-item', className),
			description,
			term,
		};
	});

	const swatchesSource = useMemo(
		() =>
			swatches
				? Object.entries(swatches).map(([swatchClassName, description]) => {
						const colorSwatchClassName = 'ee-status-bg--' + swatchClassName;

						return {
							className: 'ee-legend-item',
							description,
							term: <ColorSwatch className={colorSwatchClassName} label={description} />,
						};
				  })
				: [],
		[swatches]
	);

	const dataSource = useMemo(() => [...iconsSource, ...swatchesSource], [iconsSource, swatchesSource]);

	return (
		<DescriptionList
			className='ee-legend'
			columnsPerRow={columnsPerRow}
			direction={direction}
			dataSource={dataSource}
			termWhiteBg={termWhiteBg}
		/>
	);
};

export default Legend;
