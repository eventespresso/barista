import {
	Box,
	Heading,
	Text,
	VStack,
	Flex,
	HStack,
	Image,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
} from '@chakra-ui/react';
import ClockIcon from '../../../assets/icons/ClockIcon';
import LocationPinIcon from '../../../assets/icons/LocationPinIcon';
import { format, isSameMonth, isSameYear, isSameDay } from 'date-fns';
import { useMemo } from 'react';
import { useModal } from '../../../lib/context/modalContext';

export default function EventDetailModal() {
	const { isOpen, closeModal, content } = useModal();

	return (
		<Modal isOpen={isOpen} size='xl' onClose={() => closeModal()}>
			<ModalOverlay />
			<ModalContent>
				<ModalBody p={0}>
					<Box
						as='section'
						bg='rgb(76, 194, 230)'
						p={6}
						borderTopRightRadius='xl'
						borderTopLeftRadius='xl'
						color='white'
					>
						<HStack alignItems='flex-start'>
							<HStack gap={0} alignItems='flex-start'>
								<VStack gap={0} alignItems='flex-start' lineHeight={1}>
									<Text as='span' my={0} fontSize='35px' fontWeight='900'>
										01
									</Text>
									<Text as='span' fontWeight='700' className='event-month-text'>
										AUG
									</Text>
								</VStack>
								{true && (
									<>
										<Text fontWeight='900' className='margin-0'>
											-
										</Text>
										<VStack
											gap={0}
											alignItems='flex-start'
											fontWeight='900'
											lineHeight={1}
											pt='2px'
											ml='3px'
										>
											<Text as='span' my={0} mt='3px'>
												30
											</Text>
											<Text as='span' marginTop='0px' className='event-month-text'>
												SEP
											</Text>
										</VStack>
									</>
								)}
							</HStack>
							<VStack alignItems='flex-start'>
								<Box height='30px' />
								<Heading fontSize='30px' fontWeight='900' color='white'>
									Event that span across months
								</Heading>
								<Flex m={0} fontSize='14px' fontWeight='500'>
									<Flex as='span' mr={1} pt='2px'>
										<ClockIcon width={12} height={12} />
									</Flex>
									(august 1) 1:00 am - (september 30) 8:00 pm(GMT-11:00)
									{/* (GMT-11:00) */}
								</Flex>
								<Flex m={0} fontSize='14px' fontWeight='500'>
									<Flex as='span' mr={1} pt='2px'>
										<LocationPinIcon width={12} height={12} />
									</Flex>
									Kngston Town, 400 Southwest Kingston Avenue Portland, OR
								</Flex>
							</VStack>
						</HStack>
					</Box>
					<Box as='section' p={4} bg='white'>
						<Image
							src={
								'https://demo.myeventon.com/wp-content/uploads/2016/08/Screen-Shot-2022-07-05-at-1.48.47-PM.png'
							}
							width='full'
							h='300px'
							maxH='300px'
							borderRadius='lg'
						/>
					</Box>
					<HStack p={4} pt={0}>
						<Box p={6} bg='gray.100' borderRadius='xl' height='150px'>
							<HStack alignItems='flex-start'>
								<ClockIcon width={24} height={24} />
								<VStack alignItems='flex-start'>
									<Heading color='#202124' fontSize='larger'>
										Time
									</Heading>
									<Text m={0} mb={8} color='#656565' fontSize='14px'>
										08/01/2023 1:00 am - 09/30/2024 8:00 pm(GMT-11:00)
									</Text>
								</VStack>
							</HStack>
						</Box>
						<Box p={6} bg='gray.100' borderRadius='xl' height='150px'>
							<HStack alignItems='flex-start'>
								<LocationPinIcon width={24} height={24} />
								<VStack alignItems='flex-start'>
									<Heading color='#202124' fontSize='larger'>
										Location
									</Heading>
									<Text m={0} mb={8} color='#656565' fontSize='14px'>
										Kngston Town 400 Southwest Kingston Avenue Portland, OR
									</Text>
								</VStack>
							</HStack>
						</Box>
					</HStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
