import { __ } from '@eventespresso/i18n';
import { RegistrationsLink } from '@eventespresso/ui-components';
import { useRegistrationsLink } from '@eventespresso/edtr-services';
import type { Datetime } from '@eventespresso/edtr-services';

interface Props {
	datetime: Datetime;
}

export const DateRegistrationsLink: React.FC<Props> = ({ datetime }) => {
	const regListUrl = useRegistrationsLink({ datetime_id: datetime.dbId });

	const tooltip = __('view ALL registrations for this date.');

	return <RegistrationsLink href={regListUrl} tooltip={tooltip} />;
};
