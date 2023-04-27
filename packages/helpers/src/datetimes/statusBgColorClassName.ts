import type { Datetime } from '@eventespresso/edtr-services';

const statusBgColorClassName = (date: Datetime): string => {
	if (date?.isTrashed) {
		return 'ee-status-bg--DTT';
	}

	if (date?.isExpired) {
		return 'ee-status-bg--DTE';
	}

	if (date?.isSoldOut) {
		return 'ee-status-bg--DTS';
	}

	if (date?.isActive) {
		return 'ee-status-bg--DTA';
	}

	return 'ee-status-bg--DTU';
};

export default statusBgColorClassName;
