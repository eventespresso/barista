import { __ } from '@eventespresso/i18n';
import { InlineEditTextWithLabel } from '@eventespresso/ui-components';
import type { EventRegistrationOptionsProps } from '../types';

interface Props extends Pick<EventRegistrationOptionsProps, 'altRegPage' | 'onAltRegPageChange'> {}

const AltRegPage: React.FC<Props> = ({ altRegPage, onAltRegPageChange }) => {
	const id = 'ee-event-registration-alt-reg-page';

	return (
		<InlineEditTextWithLabel
			className='ee-reg-option__alt-reg'
			id={id}
			label={__('Alternative Registration Page')}
			size='huge'
			labelClassName='ee-grid__item-label'
			labelPosition='left-middle'
			aria-describedby={id}
			onChange={onAltRegPageChange}
			placeholder='https://'
			tag='h4'
			value={altRegPage}
		/>
	);
};

export default AltRegPage;
