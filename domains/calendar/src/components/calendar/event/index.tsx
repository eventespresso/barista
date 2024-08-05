import { Box, Popover, PopoverBody, PopoverContent, PopoverTrigger, Portal, Text } from '@chakra-ui/react';
import ClockIcon from '../../../assets/icons/ClockIcon';
import { useState } from 'react';
import { formatEventTime } from '../../../lib/utils';
import EventPopover from '../event-popover';

export default function Event({ event }) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Popover placement='top-start' isLazy isOpen={isOpen} onClose={() => setIsOpen(false)}>
			<PopoverTrigger>
				<Box
					style={{
						backgroundColor: event.color || '#4cc2e6',
						color: '#fff',
						padding: '10px',
						borderRadius: '4px',
						boxSizing: 'border-box',
						fontSize: '12px',
						whiteSpace: 'normal',
					}}
					onMouseEnter={() => setIsOpen(true)}
					// onMouseLeave={() => setIsOpen(false)}
					cursor='pointer'
				>
					<Text mb={0} fontSize='13px' fontWeight={600}>
						{event.title}
					</Text>
					<Text style={{ margin: '0px', display: 'flex' }}>
						<Text as='span' style={{ marginRight: '3px', paddingTop: '2px' }}>
							<ClockIcon width={12} height={12} />
						</Text>
						{formatEventTime(event.start, event.end)}
					</Text>
				</Box>
			</PopoverTrigger>
			<Portal>
				<PopoverContent>
					<PopoverBody p={0} background='none'>
						<EventPopover event={event} />
					</PopoverBody>
				</PopoverContent>
			</Portal>
		</Popover>
	);
}
