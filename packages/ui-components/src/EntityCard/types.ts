import type { Entity } from '@eventespresso/data';

export interface EntityCardProps {
	actionsMenu: JSX.Element;
	details: JSX.Element;
	entity: Entity;
	notice?: JSX.Element | string;
	reverse?: boolean;
	sidebar: JSX.Element;
	sidebarClass?: string;
}

export interface SimpleEntityCardProps {
	afterDetails?: JSX.Element;
	beforeDetails?: JSX.Element;
	className?: string;
	id: string;
	name: string;
	sidebar?: JSX.Element;
}
