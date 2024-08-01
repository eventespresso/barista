// import { HStack } from '@chakra-ui/react';
import ClockIcon from '../../../assets/icons/ClockIcon';
import LocationPinIcon from '../../../assets/icons/LocationPinIcon';
import React from 'react';

function formatEventTime(startStr, endStr) {
	const startDate = new Date(startStr);
	const endDate = new Date(endStr);

	const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

	const startTime = startDate.toLocaleTimeString([], options);
	const endTime = endDate.toLocaleTimeString([], options);

	return `${startTime} - ${endTime}`;
}

export default function Event({ event }) {
	return (
		<div
			style={{
				backgroundColor: event.color || '#4cc2e6',
				color: '#fff',
				padding: '10px',
				borderRadius: '4px',
				boxSizing: 'border-box',
				minHeight: '100%',
			}}
		>
			<strong>{event.title}</strong>
			<p style={{ margin: '0px', display: 'flex' }}>
				<span style={{ marginRight: '10px' }}>
					<ClockIcon />
				</span>
				{formatEventTime(event.start, event.end)}
			</p>
			<p style={{ margin: '0px', display: 'flex' }}>
				<span style={{ marginRight: '10px' }}>
					<LocationPinIcon />
				</span>
				{event.venue}
			</p>
			{/* <HStack> */}

			{/* </HStack> */}
			{/* <p>{event.description} Description</p> */}
			{/* <span>
				 {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
				{event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
			</span> */}
		</div>
	);
}
