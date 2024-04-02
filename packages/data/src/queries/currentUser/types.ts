import type { User } from '@eventespresso/constants';
import type { EntityQueryArgs } from '../types';
import type { EntityEdge } from '../../types';

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
