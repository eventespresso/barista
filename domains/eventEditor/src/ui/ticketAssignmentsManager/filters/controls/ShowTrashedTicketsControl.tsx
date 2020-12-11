import React from 'react';
import { __ } from '@eventespresso/i18n';

import { Switch } from '@eventespresso/components';
import type { FilterStateManager } from '../filterState';

type ShowTrashedTicketsControlProps = Pick<FilterStateManager, 'showTrashedTickets' | 'setShowTrashedTickets'>;

const ShowTrashedTicketsControl: React.FC<ShowTrashedTicketsControlProps> = ({
	showTrashedTickets,
	setShowTrashedTickets,
}) => {
	return (
		<Switch
			isChecked={showTrashedTickets}
			label={__('show trashed tickets')}
			onChangeValue={setShowTrashedTickets}
		/>
	);
};

export default ShowTrashedTicketsControl;
