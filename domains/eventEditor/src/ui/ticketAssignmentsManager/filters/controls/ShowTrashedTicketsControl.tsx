import React from 'react';
import { __ } from '@eventespresso/i18n';

import { SwitchInput } from '@eventespresso/components';
import { FilterStateManager } from '../filterState';

type ShowTrashedTicketsControlProps = Pick<FilterStateManager, 'showTrashedTickets' | 'setShowTrashedTickets'>;

const ShowTrashedTicketsControl: React.FC<ShowTrashedTicketsControlProps> = React.memo(
	({ showTrashedTickets, setShowTrashedTickets }) => {
		return (
			<SwitchInput
				label={__('show trashed tickets')}
				isChecked={showTrashedTickets}
				onChangeValue={setShowTrashedTickets}
			/>
		);
	}
);

export default ShowTrashedTicketsControl;
