import { Box, Popover, PopoverBody, PopoverContent, PopoverTrigger, Portal, Text } from '@chakra-ui/react';
import ClockIcon from '../../../assets/icons/ClockIcon';
import { useMemo, useState } from 'react';
import EventPopover from '../event-popover';
import { format, isSameDay } from 'date-fns';

export default function Event({ event }) {
	const [isOpen, setIsOpen] = useState(false);
	const isSameDayEvent = useMemo(() => isSameDay(event.start, event.end), [event]);

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
						{format(event.start, isSameDayEvent ? 'h:mm a' : 'MMMM d h:mm a')} -{' '}
						{format(event.end, isSameDayEvent ? 'h:mm a' : 'MMMM d h:mm a')}
					</Text>
				</Box>
			</PopoverTrigger>
			<Portal>
				<PopoverContent>
					<PopoverBody p={0} background='none'>
						<EventPopover event={event} isSameDayEvent={isSameDayEvent} />
					</PopoverBody>
				</PopoverContent>
			</Portal>
		</Popover>
	);
}
