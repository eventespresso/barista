import { __ } from '@eventespresso/i18n';
import { GridItem, InlineEditText } from '@eventespresso/ui-components';
import type { EventRegistrationOptionsProps } from '../types';

interface Props extends Pick<EventRegistrationOptionsProps, 'altRegPage' | 'onAltRegPageChange'> {}

const AltRegPage: React.FC<Props> = ({ altRegPage, onAltRegPageChange }) => {
	const id = 'ee-event-registration-alt-reg-page';

	return (
		<GridItem className='ee-reg-option__alt-reg' id={id} label={__('Alternative Registration Page')} size='huge'>
			<div className='ee-reg-option__value'>
				<InlineEditText
					aria-describedby={id}
					onChange={onAltRegPageChange}
					placeholder='https://'
					tag='h4'
					value={altRegPage}
				/>
			</div>
		</GridItem>
	);
};

export default AltRegPage;
