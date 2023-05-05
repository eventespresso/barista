import classNames from 'classnames';

import { __ } from '@eventespresso/i18n';
import { useDisclosure } from '@eventespresso/hooks';
import { GlobalOutlined } from '@eventespresso/icons';

import { IconButton } from '../../';
import { Popover } from '../';
import Content from './Content';
import type { TimezoneTimeInfoProps } from './types';

import './style.scss';

export const TimezoneTimeInfo: React.FC<TimezoneTimeInfoProps> = ({ siteTime, userTime, utcTime, ...props }) => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const className = classNames('ee-timezone-info', props.className);

	return (
		<div className={className}>
			<IconButton
				borderless
				className='ee-timezone-info__button'
				icon={GlobalOutlined}
				onClick={onToggle}
				tooltip={__('click for timezone information')}
			/>
			<Popover
				isLazy
				content={<Content siteTime={siteTime} userTime={userTime} utcTime={utcTime} />}
				header={__('This Date Converted To:')}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</div>
	);
};
