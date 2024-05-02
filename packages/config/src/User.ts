import type { Type } from '.';

export function User(user?: Type.User) {
	return user ?? defaultUser;
}

const defaultUser: Type.User = {
	capabilities: [],
	description: '',
	email: '',
	firstName: '',
	id: '',
	lastName: '',
	locale: '',
	name: '',
	nicename: '',
	nickname: '',
	username: '',
};
