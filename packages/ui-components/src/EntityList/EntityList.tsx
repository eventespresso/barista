import { __ } from '@eventespresso/i18n';
import { ButtonRow, ErrorIndicator, Heading, LoadingNotice } from '../..';
import type { EntityListProps } from './types';

import './style.scss';

export const EntityList: React.FC<EntityListProps> = ({
	activeFilters,
	afterHeading,
	afterList,
	entityList,
	error,
	filterBar,
	footer,
	headerText,
	id,
	legend,
	loading,
	pagination,
}) => {
	if (loading) return <LoadingNotice />;

	if (error) return <ErrorIndicator title={__('OOPS!')} message={__('Error Loading Entites List')} />;

	return (
		<div className='ee-entity-list ee-edtr-section' id={id}>
			<Heading as='h3' className='ee-entity-list__header ee-edtr-section-heading'>
				{headerText}
			</Heading>

			{afterHeading}

			{filterBar}

			{activeFilters}

			{entityList}

			<ButtonRow alignItems='start' justifyContent='space-between'>
				{pagination}
				{legend}
			</ButtonRow>

			<div className={'ee-entity-list__footer'}>{footer}</div>
			{afterList}
		</div>
	);
};
