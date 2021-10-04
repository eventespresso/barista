import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { Divider, NumberInput, Stack, Label } from '@eventespresso/ui-components';

import On from './On';
import OnThe from './OnThe';
import { useRRuleConfig, useRRuleState } from '../../../hooks';
import { useIntervalUpdater } from '../../../utils';
import type { BaseProps, OnChangeInput } from '../../types';
import type { RepeatMode } from '../../../types';

const Monthly: React.FC<BaseProps> = ({ id }) => {
	const {
		repeat: { monthly },
		setRepeatMode,
		setRepeatInterval,
	} = useRRuleState();
	const { monthlyModes } = useRRuleConfig();
	const isTheOnlyMode = monthlyModes?.length === 1;

	const onChangeInterval = useIntervalUpdater('monthly', setRepeatInterval);

	const onChangeMode = useCallback<OnChangeInput>(
		(event) => {
			setRepeatMode('monthly', event.target.value as RepeatMode);
		},
		[setRepeatMode]
	);

	return (
		<Stack className='rrule-generator__form-group-row rrule-generator__form-group-row--align-items-start rrule-generator__form-group-row--no-label rrule-generator__repeat-monthly'>
			<Label label={__('every')} />
			{/* <label className='rrule-generator__labelled-input'>
				<span>{__('every')}</span> */}
			{/* <Divider orientation='vertical' size='tiny' /> */}
			<NumberInput
				aria-label={__('Repeat monthly interval')}
				id={`${id}-interval`}
				name={`${id}-interval`}
				onChange={onChangeInterval}
				showStepper={false}
				value={monthly?.interval}
				visibleDigits={3}
			/>
			{/* <span>{__('month(s)')}</span>
			</label> */}
			<Label label={__('month(s)')} />

			{monthlyModes?.includes('ON') && (
				<On id={`${id}-on`} isTheOnlyMode={isTheOnlyMode} onChangeMode={onChangeMode} />
			)}
			{monthlyModes?.includes('ON_THE') && (
				<OnThe id={`${id}-onThe`} isTheOnlyMode={isTheOnlyMode} onChangeMode={onChangeMode} />
			)}
		</Stack>
	);
};

export default Monthly;
