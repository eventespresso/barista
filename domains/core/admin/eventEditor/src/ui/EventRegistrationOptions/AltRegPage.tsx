import { __ } from '@eventespresso/i18n';
import { InlineEditTextWithLabel } from '@eventespresso/ui-components';
import type { EventRegistrationOptionsProps } from './types';

interface Props extends Pick<EventRegistrationOptionsProps, 'altRegPage' | 'onAltRegPageChange'> {}

const AltRegPage: React.FC<Props> = ({ altRegPage, onAltRegPageChange }) => {
	return (
		<InlineEditTextWithLabel
			className='ee-edtr-option ee-edtr-option__alt-reg-page'
			id='ee-event-registration-alt-reg-page'
			label={__('Alternative Registration Page')}
			size='huge'
			labelClassName='ee-grid__item-label'
			labelPosition='left-middle'
			onChange={onAltRegPageChange}
			placeholder='https://'
			tag='h4'
			value={altRegPage}
			wrapperClassName='ee-edtr-option__wrapper ee-edtr-option__alt-reg-page-wrapper'
		/>
	);
};

export default AltRegPage;
