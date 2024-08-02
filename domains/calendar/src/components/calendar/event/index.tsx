// import { HStack } from '@chakra-ui/react';
import { Box, Heading, Text } from '@chakra-ui/react';
import ClockIcon from '../../../assets/icons/ClockIcon';
import LocationPinIcon from '../../../assets/icons/LocationPinIcon';
import React from 'react';
import { Tooltip } from '@chakra-ui/react';
import { formatEventTime } from '../../../lib/utils';
// import Tooltip from '../../../components/ui/Tooltip';

export default function Event({ event }) {
	return (
		// <Tooltip label='hello world' placement='auto'>
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

			{/* <Tooltip placement='auto' label='meow'>
					<span>Hello hover me</span>
				</Tooltip> */}

			{/* <Tooltip label={() => <CustomTooltip content={event} />}>
				<span>hello</span>
			</Tooltip> */}

			{/* <Tooltip content='This is a custom tooltip' placement='top'>
				<Box p={4} bg='teal.500' color='white' borderRadius='md'>
					Hover over me
				</Box>
			</Tooltip> */}
			{/* <p style={{ margin: '0px', display: 'flex' }}>
				<span style={{ marginRight: '10px' }}>
					<LocationPinIcon />
				</span>
				{event.venue}
			</p> */}
			{/* <HStack> */}

			{/* </HStack> */}
			{/* <p>{event.description} Description</p> */}
			{/* <span>
				 {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
				{event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
			</span> */}
		</Box>
		// </Tooltip>
	);
}

const CustomTooltip = ({ content }) => (
	<Box p={2} bg='gray.700' color='white' borderRadius='md' boxShadow='md' fontSize='sm'>
		{content.start}
		hello workd
	</Box>
);
