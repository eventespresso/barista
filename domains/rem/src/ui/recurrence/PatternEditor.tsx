import { useCallback, useMemo } from 'react';

import { __ } from '@eventespresso/i18n';

import { Button, ButtonRow, DebugInfo, Divider, ErrorMessage } from '@eventespresso/ui-components';
import { useDisclosure } from '@eventespresso/hooks';
import { CloseCircleOutlined, Repeat } from '@eventespresso/icons';

import { RRuleEditor, RRuleEditorProps } from '../rRule';
import { useFormState } from '../../data';
import { Warning } from '../generatedDates';

export const PatternEditor: React.FC = () => {
	const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
	const { exRule, rRule, setExRule, setRRule } = useFormState();

	const onRemoveClick = useCallback(() => {
		setExRule('');
		onClose();
	}, [onClose, setExRule]);

	// We need to show rRule even after coming back from next steps
	// isOpen is reset on each mount (step), exRule still remains in REM state
	const showExRule = exRule || isOpen;

	const debugData = useMemo(() => ({ rRule, exRule }), [exRule, rRule]);

	const onChangeRRule = useCallback<RRuleEditorProps['onChange']>(
		(newRRule) => {
			if (newRRule !== rRule) {
				setRRule(newRRule);
			}
		},
		[rRule, setRRule]
	);

	const onChangeExRule = useCallback<RRuleEditorProps['onChange']>(
		(newExRule) => {
			if (newExRule !== exRule) {
				setExRule(newExRule);
			}
		},
		[exRule, setExRule]
	);

	return (
		<>
			<ErrorMessage message={!rRule && __('You must set a recurrence pattern')} />
			<RRuleEditor
				desc={__('defines a rule or repeating pattern for generating event dates that occur regularly')}
				icon={Repeat}
				id='ee-r-rule'
				onChange={onChangeRRule}
				rRuleString={rRule}
				sidebarLabel={__('Recurrence Pattern')}
				type='recurrence'
			/>
			<Warning />
			<Divider type='dotted' />
			<ButtonRow horizontalAlign='left'>
				<Button
					buttonText={showExRule ? __('Remove exclusion pattern') : __('Add exclusion pattern')}
					noHorizontalMargin
					onClick={showExRule ? onRemoveClick : onOpen}
				/>
			</ButtonRow>
			{showExRule && (
				<RRuleEditor
					desc={__('defines a rule or repeating pattern that will remove dates from those generated above')}
					icon={CloseCircleOutlined}
					id='ee-ex-rule'
					onChange={onChangeExRule}
					rRuleString={exRule}
					sidebarLabel={__('Exclusion Pattern')}
					type='exclusion'
				/>
			)}
			<DebugInfo data={debugData} />
		</>
	);
};
