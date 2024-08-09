import { Box, Heading, Text, VStack, Flex, HStack, Image } from '@chakra-ui/react';
import ClockIcon from '../../../assets/icons/ClockIcon';
import LocationPinIcon from '../../../assets/icons/LocationPinIcon';
import { format } from 'date-fns';
import { useModal } from '../../../lib/context/modalContext';

import type { IEvent } from '../../../lib/types';

interface IEventPopoverProps {
	event: IEvent;
	isSameDayEvent: boolean;
}
export default function EventPopover({ event, isSameDayEvent }: IEventPopoverProps) {
	const { openModal } = useModal();

	const handleOpenModal = () => {
		openModal({ event, isSameDayEvent });
	};
	return (
		<Box
			p={8}
			bg='hsla(252, 13%, 46%, 1)'
			color='white'
			borderRadius='md'
			boxShadow='md'
			onClick={handleOpenModal}
			cursor='pointer'
		>
			<VStack alignItems='flex-start'>
				{event.image && <Image src={event.image} width='full' h='200px' maxH='200px' borderRadius='lg' />}
				<HStack gap={0} alignItems='flex-start'>
					<VStack gap={0} alignItems='flex-start' lineHeight={1}>
						<Text as='span' my={0} fontSize='35px' fontWeight='900'>
							{format(event.start, 'dd')}
						</Text>
						<Text as='span' fontWeight='700' className='event-month-text'>
							{format(event.start, 'MMM')}
						</Text>
					</VStack>
					{!isSameDayEvent && (
						<>
							<Text fontWeight='900' className='margin-0'>
								-
							</Text>
							<VStack gap={0} alignItems='flex-start' fontWeight='900' lineHeight={1} pt='2px' ml='3px'>
								<Text as='span' my={0} mt='3px'>
									{format(event.end, 'dd')}
								</Text>
								<Text as='span' marginTop='0px' className='event-month-text'>
									{format(event.end, 'MMM')}
								</Text>
							</VStack>
						</>
					)}
				</HStack>
				<Heading fontSize='30px' fontWeight='900' color='white'>
					{event.title}
				</Heading>
				<Flex m={0} fontSize='12px' fontWeight='600'>
					<Flex as='span' mr={1} pt='2px'>
						<ClockIcon width={12} height={12} />
					</Flex>
					{format(event.start, isSameDayEvent ? 'h:mm a' : 'MMMM d h:mm a')} -{' '}
					{format(event.end, isSameDayEvent ? 'h:mm a' : 'MMMM d h:mm a')}
					{/* (GMT-11:00) */}
				</Flex>
				<Flex m={0} fontSize='12px' fontWeight='600'>
					<Flex as='span' mr={1} pt='2px'>
						<LocationPinIcon width={12} height={12} />
					</Flex>
					{event.venue}
				</Flex>
			</VStack>
		</Box>
	);
}
