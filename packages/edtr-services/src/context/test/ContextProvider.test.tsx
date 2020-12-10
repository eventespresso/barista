import React from 'react';
import { useApolloClient } from '@eventespresso/data';
import { ApolloClient } from '@apollo/client';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';

import { useStatus } from '@eventespresso/services';
import { useEventId } from '../../apollo/queries/events';
import { ApolloMockedProvider, eventId } from '../test';
import { actWait } from '@eventespresso/utils/src/test';

describe('ContextProviders', () => {
	it('checks for Apollo context without ContextProviders', () => {
		const {
			result: { error },
		} = renderHook(() => useApolloClient());

		expect(error).toBeInstanceOf(Error);
		expect(error.name).toEqual('Invariant Violation');
		expect(typeof error.stack).toEqual('string');
	});

	it('checks for Apollo context with ContextProviders', async () => {
		const { result } = renderHook(() => useApolloClient(), { wrapper: ApolloMockedProvider() });
		await actWait();

		expect(result.current).toBeInstanceOf(ApolloClient);
	});

	const StatusComponent: React.FC = () => {
		const statusManager = useStatus();
		return <span>{`Status Manager is: ${statusManager === null ? 'NULL' : 'NOT_NULL'}`}</span>;
	};

	it('checks for statusProvider context without ContextProviders', () => {
		const { getByText } = render(<StatusComponent />);
		expect(getByText('Status Manager is: NULL')).toBeInTheDocument();
	});

	it('checks for statusProvider context with ContextProviders', async () => {
		const { getByText } = render(<StatusComponent />, { wrapper: ApolloMockedProvider() });
		await actWait();

		expect(getByText('Status Manager is: NOT_NULL')).toBeInTheDocument();
	});

	const EventIdComponent: React.FC = () => {
		const _eventId_ = useEventId() || 0;
		return <span>{`Event ID is: ${_eventId_}`}</span>;
	};

	it('checks for event id context without ContextProviders', () => {
		const { getByText } = render(<EventIdComponent />);
		expect(getByText('Event ID is: 0')).toBeInTheDocument();
	});

	it('checks for event id context with ContextProviders', async () => {
		const { getByText } = render(<EventIdComponent />, { wrapper: ApolloMockedProvider() });
		await actWait();

		expect(getByText(`Event ID is: ${eventId}`)).toBeInTheDocument();
	});
});
