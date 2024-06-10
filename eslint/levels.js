// lower packages CANNOT import higher level packages
module.exports = [
	['types'],
	['config'],
	['constants', 'i18n', 'events', 'ioc', 'toaster', 'utils'],
	['data', 'dates', 'hooks', 'icons', 'plugins', 'slot-fill', 'registry', 'styles', 'storage'],
	['adapters', 'predicates', 'services'],
	['ui-components'],
	['rich-text-editor'],
	['form', 'form-builder', 'rrule-generator'],
	['edtr-services', 'ee-components', 'helpers'],
	['tpc'],
];
// higher packages CAN import lower level packages
