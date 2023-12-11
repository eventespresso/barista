import type { Datetime } from '@eventespresso/edtr-services';

const statusBgColorClassName = (date: Datetime): string => {

	if (date?.isTrashed) {
		return 'ee-status-bg--DTT';
	}

	if (date?.isCancelled) {
		return 'ee-status-bg--DTC';
	}

	if (date?.isPostponed) {
		return 'ee-status-bg--DTP';
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

	if (date?.isUpcoming) {
		return 'ee-status-bg--DTU';
	}

	// default to "TO_BE_DETERMINED" if nothing else matches
	return 'ee-status-bg--DTB';
};

export default statusBgColorClassName;
