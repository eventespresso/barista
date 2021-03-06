import { ApolloMockedProvider } from '@eventespresso/edtr-services/src/context/test';
import { ContextProvider } from '../../context';
import { nodes as tickets } from '@eventespresso/edtr-services/src/apollo/queries/tickets/test/data';
import { useCacheRehydration } from '@eventespresso/edtr-services';
import { useInitStateListeners } from '../../stateListeners';

const mockTicket = tickets[0];

const TPCComponent: React.FC = ({ children }) => {
	useInitStateListeners();
	return <>{children}</>;
};

const TPCWrapper: React.FC = ({ children }) => {
	// cache must be rehydrated before TPC gets initialized
	useCacheRehydration();
	return (
		<ContextProvider ticketId={mockTicket.id}>
			<TPCComponent>{children}</TPCComponent>
		</ContextProvider>
	);
};

const ApolloWrapper = ApolloMockedProvider();

const TestWrapper: React.FC = ({ children }) => {
	return (
		<ApolloWrapper>
			<TPCWrapper>{children}</TPCWrapper>
		</ApolloWrapper>
	);
};

export default TestWrapper;
