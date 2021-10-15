export type PatternType = 'recurrence' | 'exclusion';

interface CommonProps {
	desc?: string;
	id: string;
	onChange: (rRuleString: string) => void;
	rRuleString: string;
	sidebarLabel?: string;
	type: PatternType;
}

export interface EditorControlsProps {}

export interface RRuleGeneratorProps extends CommonProps {}

export interface RRuleEditorProps extends CommonProps, EditorControlsProps {
	icon?: React.ComponentType<{ className?: string }>;
}
