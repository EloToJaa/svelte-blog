import { getPostBySlug } from '$lib/data/post';
import { getAuthUser } from '$lib/data/user';
import type UserType from '$lib/types/User';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const { err, post } = await getPostBySlug(locals.pocketBase, params.slug as string);
	if (err) throw error(err.status, err.message);
	const user = getAuthUser(locals.pocketBase);

	return {
		post,
		user: (locals.pocketBase.authStore.isValid ? user : null) as UserType | null
	};
}) satisfies PageServerLoad;
