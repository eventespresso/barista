import { Divider } from '@eventespresso/ui-components';

import { getRuleTextWithStartingDate } from '../../utils';

export interface RRuleTextProps {
	rRuleString?: string;
}

const RRuleText: React.FC<RRuleTextProps> = ({ rRuleString }) => {
	const ruleText = getRuleTextWithStartingDate(rRuleString);

	return (
		ruleText && (
			<>
				<div className='rrule-text'>{ruleText}</div>
				{/* <Divider size='small' /> */}
			</>
		)
	);
};

export default RRuleText;
