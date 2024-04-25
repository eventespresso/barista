export interface TabbableTextProps {
	'aria-describedby'?: string; // LATER: shouldn't it be ariaDescribeBy?
	className?: string;
	icon?: React.ReactNode;
	isDisabled?: boolean;
	onClick: VoidFunction;
	text?: string | JSX.Element;
	tooltip?: string;
}
