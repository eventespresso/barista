import { useMemo, useCallback } from 'react';

import type { GlobalModal } from './types';
import useGlobalModalContext from './useGlobalModalContext';

const useGlobalModal = <D = Record<string, any>>(name: string): GlobalModal<D> => {
	const modalContext = useGlobalModalContext<D>();

	const { closeModal, getModalData, isModalOpen, openModal, openModalWithData, setModalData } = modalContext;

	type GM = GlobalModal<D>;

	const close = useCallback<GM['close']>(() => closeModal(name), [closeModal, name]);

	const getData = useCallback<GM['getData']>(() => getModalData(name), [getModalData, name]);

	const isOpen = useMemo<GM['isOpen']>(() => isModalOpen(name), [name, isModalOpen]);

	const open = useCallback<GM['open']>(() => openModal(name), [name, openModal]);

	const openWithData = useCallback<GM['openWithData']>(
		(data) => openModalWithData(name, data),
		[name, openModalWithData]
	);

	const setData = useCallback<GM['setData']>((data) => setModalData(name, data), [name, setModalData]);

	return useMemo(
		() => ({ close, getData, isOpen, open, openWithData, setData }),
		[close, getData, isOpen, open, openWithData, setData]
	);
};

export default useGlobalModal;
