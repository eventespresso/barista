import classNames from 'classnames';

import { FormSectionSidebar } from '@eventespresso/form';
import RRuleGenerator from './RRuleGenerator';
import type { RRuleEditorProps } from './types';

import './style.scss';

const RRuleEditor: React.FC<RRuleEditorProps> = ({ desc, icon, id, onChange, rRuleString, sidebarLabel, type }) => {
	const wrapperClassName = classNames('rrule-generator-wrapper', type && `rrule-generator-wrapper-${type}`);

	return (
		<div className={wrapperClassName}>
			{sidebarLabel && <FormSectionSidebar desc={desc} Icon={icon} title={sidebarLabel} />}
			<RRuleGenerator id={id} onChange={onChange} rRuleString={rRuleString} type={type} />
		</div>
	);
};

export default RRuleEditor;
