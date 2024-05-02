export module User {
	export interface Interface {
		id: string;
		capabilities: string[];
		description: string;
		email: string;
		firstName: string;
		lastName: string;
		isa?: boolean;
		locale: string;
		name: string;
		nicename: string;
		nickname: string;
		roles?: string[];
		username: string;
	}

	export type EventManager = Pick<Interface, 'id' | 'name'>;
}
