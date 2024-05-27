import { useCallback } from 'react';

import PriceModifierActions from '../../buttons/PriceModifierActions';
import { Price } from '..';

import type { TpcPriceModifier } from '../../types';
import type { BodyRow } from '@eventespresso/ui-components';

type Props = {
	index: number;
	isDisabled?: boolean;
	price: TpcPriceModifier;
};

type BodyRowGenerator = (props: Props) => BodyRow;

const useBodyRowGenerator = (): BodyRowGenerator => {
	return useCallback<BodyRowGenerator>(({ index, isDisabled, price }: Props) => {
		const cells = [
			{
				key: 'id',
				type: 'cell',
				className: 'ee-ticket-price-calculator__price-id ee-number-column',
				value: <Price.Input.ID price={price} />,
			},
			{
				key: 'order',
				type: 'cell',
				className: 'ee-ticket-price-calculator__price-order ee-number-column',
				value: <Price.Input.Order price={price} />,
			},
			{
				key: 'type',
				type: 'cell',
				className: 'ee-ticket-price-calculator__price-type',
				value: <Price.Input.Type price={price} />,
			},
			{
				key: 'name',
				type: 'cell',
				className: 'ee-ticket-price-calculator__price-name',
				value: <Price.Input.Name price={price} />,
			},
			{
				key: 'description',
				type: 'cell',
				className: 'ee-ticket-price-calculator__price-desc',
				value: <Price.Input.Description price={price} />,
			},
			{
				key: 'amount',
				type: 'cell',
				className: 'ee-ticket-price-calculator__amount ee-number-column',
				value: <Price.Input.Amount price={price} />,
			},
			{
				key: 'actions',
				type: 'cell',
				className: 'ee-ticket-price-calculator__actions',
				value: !isDisabled && <PriceModifierActions index={index} price={price} />,
			},
		];

		return {
			cells,
			rowClassName: `ee-editor-date-list-view-row ee-entity-list-item`,
			id: `ee-editor-date-list-view-row-${price.id}`,
			key: `row-${price.id}`,
			type: 'row',
		};
	}, []);
};

export default useBodyRowGenerator;
