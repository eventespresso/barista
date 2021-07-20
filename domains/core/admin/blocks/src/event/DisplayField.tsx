import type { CSSProperties } from 'react';

import { Placeholder, Flex, FlexItem, Spinner } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';

import { useEvent } from '@blocksServices/apollo';
import { SelectEvent } from './controls/SelectEvent';
import { SelectField } from './controls/SelectField';

const controlWrapperStyle: CSSProperties = { flexDirection: 'column' };

export const DisplayField: React.FC<any> = (props) => {
	const { attributes } = props;
	const { data, error, loading } = useEvent(attributes.event);

	if (!attributes.event || !attributes.field) {
		return (
			<Placeholder>
				<Flex style={controlWrapperStyle}>
					{!attributes.event && (
						<FlexItem>
							<SelectEvent {...props} />
						</FlexItem>
					)}
					{!attributes.field && (
						<FlexItem>
							<SelectField {...props} />
						</FlexItem>
					)}
				</Flex>
			</Placeholder>
		);
	}

	if (loading) {
		return (
			<Placeholder>
				<Spinner />
			</Placeholder>
		);
	}

	if (error) {
		return <Placeholder>{__('There was some error fetching event details.')}</Placeholder>;
	}

	return <>{data?.espressoEvent?.[attributes.field]}</>;
};
