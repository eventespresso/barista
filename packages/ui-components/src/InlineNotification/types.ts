export interface InlineMessageProps {
	/**
	 * Classname string
	 */
	className?: string;
	/**
	 * Icon to be displayed near the text
	 */
	icon?: JSX.Element;
	/**
	 * The id is being used on a div with aria-live attribute
	 */
	id?: string;
	/**
	 * The inline text
	 */
	message?: string;
	/**
	 * InlineNotification type
	 */
	type?: 'error' | 'info' | 'success' | 'warning';
	/**
	 * The modifier for different styles
	 */
	variant?: 'subtle' | 'solid';
	wrapperClassName?: string;
}
