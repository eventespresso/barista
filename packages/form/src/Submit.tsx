import { __ } from '@eventespresso/i18n';

import { Button, ButtonProps } from '@eventespresso/adapters';
import ResetButton from './ResetButton';
import type { FormButtonProps } from './types';
import { Save } from '@eventespresso/icons';

export interface SubmitProps extends Omit<ButtonProps, 'onClick' | 'loading'> {
	submitting: boolean;
	hasErrors?: boolean;
	resetButton: FormButtonProps;
	submitButton: FormButtonProps;
}

const Submit: React.FC<SubmitProps> = ({ submitting, hasErrors, submitButton, resetButton }) => {
	return (
		<div className='submit-wrapper'>
			<div className='submit-button'>
				<Button
					icon={Save}
					type='submit'
					isDisabled={hasErrors || submitting}
					isLoading={submitting}
					className='submit-button'
					buttonText={submitButton.buttonText || __('Submit')}
					{...submitButton}
				/>
			</div>

			{resetButton ? <ResetButton isDisabled={submitting} {...resetButton} /> : null}
		</div>
	);
};

export default Submit;
