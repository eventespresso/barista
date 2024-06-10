import {
	Popover as ChakraPopover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverFooter,
	PopoverHeader,
	PopoverTrigger,
} from '@chakra-ui/react';

import type { PopoverProps } from './types';

export const Popover: React.FC<PopoverProps> = ({
	content,
	contentClassName,
	header,
	footer,
	trigger,
	children,
	...props
}) => {
	return (
		<ChakraPopover {...props}>
			{trigger && <PopoverTrigger>{trigger}</PopoverTrigger>}
			<PopoverContent zIndex={4} className={contentClassName}>
				<PopoverArrow />
				<PopoverCloseButton className='ee-popover__close-button' color='var(--ee-button-text-color)' />
				{header && (
					<PopoverHeader className='ee-popover__header' color='var(--ee-button-text-color)'>
						{header}
					</PopoverHeader>
				)}
				<PopoverBody>{content || children}</PopoverBody>
				{footer && <PopoverFooter className='ee-popover__footer'>{footer}</PopoverFooter>}
			</PopoverContent>
		</ChakraPopover>
	);
};
