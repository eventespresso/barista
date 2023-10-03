import { useEventsHandler, useCacheRehydration } from '@eventespresso/edtr-services';

const useEditorInitialization = (): boolean => {
	// register global event handlers
	useEventsHandler();

	// rehydrate data cache
	return useCacheRehydration();
};

export default useEditorInitialization;
