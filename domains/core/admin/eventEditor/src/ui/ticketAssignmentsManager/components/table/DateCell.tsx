import { parseISO } from 'date-fns';
import classNames from 'classnames';
import { __ } from '@eventespresso/i18n';

import type { RenderCellProps } from '../../types';
import { getDatetimeBackgroundColorClassName } from '@eventespresso/helpers';
import { useTimeZoneTime } from '@eventespresso/services';
import { LOCALIZED_DATE_SHORT_FORMAT } from '@eventespresso/constants';

const DateCell: React.FC<RenderCellProps> = ({ datetime }) => {
	const bgClassName = getDatetimeBackgroundColorClassName(datetime);
	const stripeClassName = classNames('date-stripe', bgClassName);

	const { formatForSite: format } = useTimeZoneTime();
	let startDate: any = datetime.startDate;
	if (startDate instanceof Date) {
		startDate = format(startDate, LOCALIZED_DATE_SHORT_FORMAT);
	} else if (startDate) {
		startDate = format(parseISO(datetime.startDate), LOCALIZED_DATE_SHORT_FORMAT);
	}

	return (
		<div className='date-cell-content'>
			<div className={stripeClassName}></div>
			<div className='ee-focus-priority-8 date-cell-content__id'>{`${__('ID')}: ${datetime.dbId}`}</div>
			<div className='ee-focus-priority-5 date-cell-content__name'>{datetime.name}</div>
			<div className='ee-focus-priority-6'>{startDate}</div>
		</div>
	);
};

export default DateCell;
