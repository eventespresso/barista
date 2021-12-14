import type { Entity } from '@eventespresso/data';

export interface EntityCardProps {
	actionsMenu: JSX.Element;
	bg?: string;
	details: JSX.Element;
	entity: Entity;
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
