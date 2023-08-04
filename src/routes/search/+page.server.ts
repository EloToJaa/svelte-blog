import { getPosts } from '$lib/data/post';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, url }) => {
	const page = Number(url.searchParams.get('page') || '1');
	const searchValue = url.searchParams.get('q') || '';
	const { posts, totalPages, err } = await getPosts(locals.pocketBase, page, searchValue);
	if (err) throw error(err.status, err.message);

	return {
		posts,
		page,
		totalPages
	};
}) satisfies PageServerLoad;
