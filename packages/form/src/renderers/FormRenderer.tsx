import { pick } from 'ramda';
import { FormSpy } from 'react-final-form';

import { __ } from '@eventespresso/i18n';
import { DebugInfo } from '@eventespresso/ui-components';

import Submit from '../Submit';
import { RenderFields } from '../RenderFields';
import RenderSections from '../RenderSections';
import type { FormRendererProps } from '../types';

const EMPTY_ARRAY = [];

const FormRenderer: React.FC<FormRendererProps> = (props) => {
	const {
		children,
		columns,
		submitting,
		sections = EMPTY_ARRAY,
		fields = EMPTY_ARRAY,
		submitButton,
		resetButton,
		formWrapper: FormWrapper,
		hasValidationErrors,
		hasSubmitErrors,
	} = props;

	const formOutput = (
		<div className='ee-form'>
			<div className='form-wrapper'>
				<form>
					<div className='ee-form__body'>
						{sections?.length ? <RenderSections columns={columns} sections={sections} /> : null}

						{fields?.length ? <RenderFields fields={fields} /> : null}

						{/* Maybe formWrapper handles form submission */}
						{submitButton ? (
							<Submit
								hasErrors={hasValidationErrors || hasSubmitErrors}
								submitting={submitting}
								submitButton={submitButton}
								resetButton={resetButton}
							/>
						) : null}
					</div>
					{children}
				</form>
				<FormSpy>
					{({ form }) => (
						<DebugInfo buttonText={__('Form Errors')} data={pick(['errors'], form.getState())} />
					)}
				</FormSpy>
			</div>
		</div>
	);

	if (FormWrapper) {
		return <FormWrapper {...props}>{formOutput}</FormWrapper>;
	}

	return formOutput;
};

export default FormRenderer;
