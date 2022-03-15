import type { EntityQueryArgs } from '../types';
import type { EntityEdge } from '../../types';

export interface User {
	capabilities: Array<string>;
	description: string;
	email: string;
	firstName: string;
	id: string;
	isa: boolean;
	lastName: string;
	locale: string;
	name: string;
	nicename: string;
	nickname: string;
	roles: Array<string>;
	username: string;
	__typename?: string;
}

export interface Viewer {
	viewer: User;
}

export interface UsersQueryWhereArgs {
	roleIn?: Array<string>;
}

export type UsersQueryArgs = EntityQueryArgs<UsersQueryWhereArgs>;

export interface UsersList {
	users: EntityEdge<User, 'RootQueryToUserConnectionWhereArgs'>;
}
