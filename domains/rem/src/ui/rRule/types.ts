type PatternType = 'recurrence' | 'exclusion';

interface CommonProps {
	desc?: string;
	id: string;
	onChange: (rRuleString: string) => void;
	rRuleString: string;
	sidebarLabel?: string;
	type: PatternType;
}

export interface EditorControlsProps {}

export interface PatternEditorProps extends Omit<CommonProps, 'type'> {}

export interface RRuleEditorProps extends CommonProps, EditorControlsProps {
	icon?: React.ComponentType<{ className?: string }>;
}
