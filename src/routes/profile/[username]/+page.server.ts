import { getPosts } from '$lib/data/post';
import { getUserByUsername } from '$lib/data/user';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, url, params }) => {
	const { user, err } = await getUserByUsername(locals.pocketBase, params.username);
	if (err) throw error(err.status, err.message);

	const page = Number(url.searchParams.get('page') || '1');
	const { posts, totalPages, err: postErr } = await getPosts(locals.pocketBase, page, '', user.id);
	if (postErr) throw error(postErr.status, postErr.message);

	return {
		posts,
		page,
		totalPages,
		user
	};
}) satisfies PageServerLoad;
