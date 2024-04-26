import { Reducer } from 'react';

export interface ModalState {
	isOpen?: boolean;
	data: Record<string, any>;
}

/**
 * state = {
 *     [modalId]: ModalState
 * }
 */
export type GlobalModalState = Record<string, ModalState>;

export type GlobalModalActionType = 'OPEN_MODAL' | 'CLOSE_MODAL' | 'SET_MODAL_DATA';

export interface GlobalModalAction {
	data?: Record<string, any>;
	modalName: string;
	type: GlobalModalActionType;
}

export interface GlobalModalManager<D = Record<string, any>> {
	closeModal: (modalName: string) => void;
	getData: () => GlobalModalState;
	getModalData: (modalName: string) => D;
	isModalOpen: (modalName: string) => boolean;
	openModal: (modalName: string) => void;
	openModalWithData: (modalName: string, data: D) => void;
	setModalData: (modalName: string, data: D) => void;
}

export type GlobalModalStateReducer = Reducer<GlobalModalState, GlobalModalAction>;

export interface GlobalModal<D = Record<string, any>> {
	close: () => void;
	getData: () => D;
	isOpen: boolean;
	open: () => void;
	openWithData: (data: D) => void;
	setData: (data: D) => void;
}
