import { getPostBySlug, getSlug } from '$lib/data/post';
import type Messages from '$lib/types/Messages';
import type PostType from '$lib/types/Post';
import type UserType from '$lib/types/User';
import { formatContent, sanitizeContent } from '$lib/utils/format';
import {
	convertMessagesFromPocketBase,
	parseDateFromInput,
	serializeNonPOJOs
} from '$lib/utils/helpers';
import PostValidation from '$lib/validation/post';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const { err, post } = await getPostBySlug(locals.pocketBase, params.slug, false);
	if (err) throw error(err.status, err.message);
	return {
		postedAt: post.postedAt,
		title: post.title,
		content: post.content,
		description: post.description
	} as PostType;
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ request, locals, params }) => {
		const formData = await request.formData();

		const user = serializeNonPOJOs(locals.pocketBase.authStore.model) as UserType;
		if (!user.id) throw redirect(303, '/login');

		const data = Object.fromEntries([...formData]) as PostType;
		console.log(data);

		data.postedAt = parseDateFromInput(data.postedAt as string);
		const postedAt = new Date(data.postedAt).getTime();

		const errorObject = {
			error: true,
			notification: 'An error occurred while creating the post. Please try again.',
			title: data.title as string,
			description: data.description as string,
			content: data.unformattedContent as string,
			postedAt
		};

		const result = PostValidation.safeParse(data);
		if (!result.success) {
			return {
				...errorObject,
				messages: result.error.flatten().fieldErrors as Messages
			};
		}

		data.author = user.id;
		data.content = formatContent(data.content as string);

		const { post, err } = await getPostBySlug(locals.pocketBase, params.slug);
		if (err) throw error(err.status, err.message);

		try {
			await locals.pocketBase.collection('posts').update(post.id ?? '', data);
		} catch (err: object | any) {
			console.log(err);
			return {
				...errorObject,
				messages: convertMessagesFromPocketBase(err) as Messages
			};
		}

		throw redirect(303, `/blog/${getSlug(data)}`);
	},
	preview: async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);

		data.postedAt = parseDateFromInput(data.postedAt as string);
		const postedAt = new Date(data.postedAt).getTime();

		const errorObject = {
			error: true,
			notification: 'An error occurred while creating the post. Please try again.',
			title: data.title as string,
			content: data.unformattedContent as string,
			postedAt
		};

		const result = PostValidation.safeParse(data);
		if (!result.success) {
			return {
				...errorObject,
				messages: result.error.flatten().fieldErrors as Messages
			};
		}

		data.unformattedContent = sanitizeContent(data.content as string);
		data.content = formatContent(data.content as string);

		return {
			preview: true,
			title: data.title as string,
			description: data.description as string,
			content: data.unformattedContent as string,
			formattedContent: data.content as string,
			postedAt
		};
	}
} satisfies Actions;
