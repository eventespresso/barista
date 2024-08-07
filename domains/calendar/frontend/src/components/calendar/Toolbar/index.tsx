import React from 'react';
import { Button, ButtonGroup, HStack, Text } from '@chakra-ui/react';
import { ToolbarProps } from 'react-big-calendar';
import { format } from 'date-fns';

const CustomToolbar: React.FC<ToolbarProps> = ({ date, view, onNavigate, onView, views }) => {
	const handleViewChange = (view: string) => {
		onView(view);
	};

	const formatDate = (date: Date, view: string) => {
		switch (view) {
			case 'month':
				return format(date, 'MMMM yyyy');
			case 'week':
				return format(date, 'MMMM dd, yyyy');
			case 'day':
				return format(date, 'MMMM dd, yyyy');
			case 'agenda':
				return format(date, 'MMMM dd, yyyy');
			default:
				return format(date, 'MMMM yyyy');
		}
	};

	return (
		<HStack spacing={4} p={4} bg='white' borderRadius='md' justify='space-between' align='center'>
			{/* Left Button Group */}
			<ButtonGroup spacing={0}>
				<Button
					onClick={() => onNavigate('PREV')}
					size='sm'
					colorScheme='blue'
					borderRadius='none'
					borderTopLeftRadius='sm'
					borderBottomLeftRadius='sm'
				>
					Back
				</Button>
				<Button onClick={() => onNavigate('NEXT')} size='sm' colorScheme='blue' borderRadius='none'>
					Next
				</Button>
				<Button
					onClick={() => onNavigate('TODAY')}
					size='sm'
					colorScheme='blue'
					borderRadius='none' // Rounded corners for rightmost button
					borderTopRightRadius='sm'
					borderBottomRightRadius='sm'
				>
					Today
				</Button>
			</ButtonGroup>

			{/* Center Date Display */}
			<Text fontSize='lg' fontWeight='bold'>
				{formatDate(date, view)}
			</Text>

			{/* Right Button Group */}
			<ButtonGroup spacing={0}>
				{views.map((viewType, index) => (
					<Button
						key={viewType}
						onClick={() => handleViewChange(viewType)}
						size='sm'
						colorScheme={view === viewType ? 'blue' : 'gray'}
						borderRadius='none'
						borderTopLeftRadius={index == 0 ? 'sm' : 0}
						borderBottomLeftRadius={index == 0 ? 'sm' : 0}
						borderTopRightRadius={index == views.length - 1 ? 'sm' : 0}
						borderBottomRightRadius={index == views.length - 1 ? 'sm' : 0}
					>
						{viewType.charAt(0).toUpperCase() + viewType.slice(1)}
					</Button>
				))}
			</ButtonGroup>
		</HStack>
	);
};

export default CustomToolbar;
