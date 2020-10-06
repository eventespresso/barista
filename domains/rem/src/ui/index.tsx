import { NewEntitySubscription, ModalSubscription } from '@eventespresso/registry';
import { domain } from '@eventespresso/edtr-services';
import type { NewEntitySubscriptionCb, ModalSubscriptionCb } from '@eventespresso/registry';
import RemButton from './RemButton';
import RemInit from './RemInit';
import Container from './Modal/Container';
import { RemGlobalModals } from '../types';

// Register new entity option
const newEntitySubscription = new NewEntitySubscription(domain);
const newDateOptionsHandler: NewEntitySubscriptionCb<'datetime'> = ({ registry }) => {
	const { registerElement: registerOptionItem } = registry;

	registerOptionItem('rem', RemButton, 11);
};
newEntitySubscription.subscribe(newDateOptionsHandler, { entityType: 'datetime' });

// Register REM modal
const modalSubscription = new ModalSubscription(domain);
const modalRegistrationHandler: ModalSubscriptionCb<'rem'> = ({ registry }) => {
	const { registerContainer } = registry;

	registerContainer(RemGlobalModals.MAIN, Container);
	// this container is only for REM initialization
	registerContainer('reminit', RemInit);
};
modalSubscription.subscribe(modalRegistrationHandler);
