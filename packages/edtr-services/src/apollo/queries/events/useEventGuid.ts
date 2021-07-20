const useEventGuid = (): string => {
	return window?.eventEspressoData?.eventEditor?.event?.id || '';
};

export default useEventGuid;
