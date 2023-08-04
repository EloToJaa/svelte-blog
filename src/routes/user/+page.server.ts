import { getPosts } from '$lib/data/post';
import { getAuthUser } from '$lib/data/user';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, url }) => {
	const user = getAuthUser(locals.pocketBase);
	const page = Number(url.searchParams.get('page') || '1');
	const { posts, totalPages, err } = await getPosts(locals.pocketBase, page, '', user?.id);
	if (err) throw error(err.status, err.message);

	return {
		user,
		posts,
		page,
		totalPages
	};
}) satisfies PageServerLoad;
