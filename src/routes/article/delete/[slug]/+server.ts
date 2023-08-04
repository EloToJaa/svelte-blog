import { getPostBySlug } from '$lib/data/post';
import { getAuthUser } from '$lib/data/user';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ locals, params }) => {
	const { post, err } = await getPostBySlug(locals.pocketBase, params.slug ?? '');
	if (err) throw redirect(303, '/');
	if (post.authorId !== getAuthUser(locals.pocketBase).id) throw redirect(303, '/');
	await locals.pocketBase.collection('posts').delete(post.id ?? '');
	throw redirect(303, '/');
}) satisfies RequestHandler;
