import type ErrorType from '$lib/types/Error';
import type UserType from '$lib/types/User';
import { serializeNonPOJOs } from '$lib/utils/helpers';
import type Client from 'pocketbase';

export const getAuthUser = (pb: Client) => {
	return serializeNonPOJOs(pb.authStore.model) as UserType;
};

export const getUserByUsername = async (pb: Client, username: string) => {
	try {
		const users = pb.collection('users');
		const user: UserType = serializeNonPOJOs(
			await users.getFirstListItem(`username='${username}'`)
		);
		return {
			user,
			err: null
		};
	} catch (err) {
		return {
			err: {
				status: 404,
				message: 'User not found'
			} as ErrorType
		};
	}
};
