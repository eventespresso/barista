import React from 'react';
import { __ } from '@eventespresso/i18n';
import { FormSpy } from '@eventespresso/form';
import { anyPass, isNil, isEmpty } from 'ramda';

import { ButtonRow, ButtonType, Next, Previous, Submit } from '@eventespresso/components';
import { TicketPriceCalculator } from '@eventespresso/tpc';
import { usePrevNext } from '@eventespresso/hooks';
import { TicketAssignmentsManager } from '@edtrUI/ticketAssignmentsManager/components';
import { useDataState as useTAMDataState } from '@edtrUI/ticketAssignmentsManager/data';
import TicketFormSteps from './TicketFormSteps';
import useDataListener from './useDataListener';

/**
 * This component is inside both RFF and TAM contexts, so we can use all of their features
 */
const subscription = { values: true, submitting: true, hasValidationErrors: true, hasSubmitErrors: true };
const ContentBody: React.FC = ({ children }) => {
	// init data listener to update RFF data
	useDataListener();

	const { current, goto, prev, next } = usePrevNext();
	const { hasOrphanEntities } = useTAMDataState();
	const isSubmitDisabled = hasOrphanEntities();

	return (
		<FormSpy subscription={subscription}>
			{({ form, hasSubmitErrors, hasValidationErrors, submitting, values }) => {
				const isSaveDisabled = submitting || hasValidationErrors || hasSubmitErrors;

				const prices = values?.prices || [];
				const isTPCSubmitDisabled =
					prices.length && prices.some(({ amount }) => anyPass([isNil, isEmpty])(amount));

				return (
					<div>
						<TicketFormSteps current={current} />
						{/* RFF fields */}
						{current === 0 && (
							<>
								{children}
								<ButtonRow>
									<Next
										buttonText={__('Add ticket prices')}
										buttonType={ButtonType.SECONDARY}
										isDisabled={isSaveDisabled}
										onClick={next}
									/>
									<Next
										buttonText={__('Skip prices - assign dates')}
										isDisabled={isSaveDisabled}
										onClick={() => goto(2)}
										skippable
									/>
								</ButtonRow>
							</>
						)}

						{current === 1 && (
							<>
								<TicketPriceCalculator context='editTicketForm' />
								<ButtonRow>
									<Previous onClick={prev} />
									<Next
										buttonText={__('Save and assign dates')}
										onClick={next}
										isDisabled={isTPCSubmitDisabled}
									/>
								</ButtonRow>
							</>
						)}

						{current === 2 && (
							<>
								<TicketAssignmentsManager />
								<ButtonRow>
									<Previous buttonText={__('Ticket details')} onClick={() => goto(0)} skippable />
									<Previous onClick={prev} />
									<Submit onClick={form.submit} isDisabled={isSubmitDisabled} />
								</ButtonRow>
							</>
						)}
					</div>
				);
			}}
		</FormSpy>
	);
};

export default ContentBody;
