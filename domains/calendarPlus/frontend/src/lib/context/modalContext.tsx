import React, { createContext, ReactNode, useContext, useState } from 'react';

import type { IEvent } from '../types';

interface IModalContent {
	event: IEvent;
	isSameDayEvent: boolean;
}
interface IModalContext {
	isOpen: boolean;
	content: IModalContent | null;
	openModal: (content: IModalContent) => void;
	closeModal: () => void;
}

const defaultModalContextValue: IModalContext = {
	isOpen: false,
	content: null,
	openModal: () => {},
	closeModal: () => {},
};

const ModalContext = createContext<IModalContext>(defaultModalContextValue);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [content, setContent] = useState<IModalContent | null>(null);

	const openModal = (content: IModalContent) => {
		setContent(content);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		setContent(null);
	};
	return <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>{children}</ModalContext.Provider>;
};

export const useModal = () => useContext(ModalContext);
