import { __ } from '@eventespresso/i18n';
import { RegistrationsLink } from '@eventespresso/ui-components';
import { useRegistrationsLink, QueryURLRegStatus } from '@eventespresso/edtr-services';
import type { Datetime } from '@eventespresso/edtr-services';

interface Props {
	datetime: Datetime;
}

export const DateSoldLink: React.FC<Props> = ({ datetime }) => {
	const regListUrl = useRegistrationsLink({ datetime_id: datetime.dbId, _reg_status: QueryURLRegStatus.APPROVED });

	const tooltip = __('view approved registrations for this date.');

	return (
		<RegistrationsLink href={regListUrl} tooltip={tooltip}>
			{datetime.sold}
		</RegistrationsLink>
	);
};
