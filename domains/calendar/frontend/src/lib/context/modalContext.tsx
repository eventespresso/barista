// ModalContext.js
import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define the type for the context value
interface ModalContextType {
	isOpen: boolean;
	content: ReactNode | null;
	openModal: (content: ReactNode) => void;
	closeModal: () => void;
}

// Default values for the context (for TypeScript, this must include all properties)
const defaultModalContextValue: ModalContextType = {
	isOpen: false,
	content: null,
	openModal: () => {},
	closeModal: () => {},
};

const ModalContext = createContext<ModalContextType>(defaultModalContextValue);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [content, setContent] = useState<ReactNode | null>(null);

	const openModal = (content: ReactNode) => {
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
