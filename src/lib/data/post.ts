import type ErrorType from '$lib/types/Error';
import type PostType from '$lib/types/Post';
import type UserType from '$lib/types/User';
import { elementsPerPage } from '$lib/utils/const';
import { formatContent } from '$lib/utils/format';
import { serializeNonPOJOs } from '$lib/utils/helpers';
import type Client from 'pocketbase';

export const getSlug = (post: PostType) => {
	if (!post.title) return '';
	return post.title
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '');
};

export const getSearchTerms = (post: PostType) => {
	if (!post.title || !post.author || !post.description || !post.content) return '';
	return `${post.title} ${post.author} ${post.description} ${post.content}`;
};

export const getContent = (post: PostType) => {
	if (!post.content) return '';
	return formatContent(post.content);
};

export const getPostBySlug = async (pb: Client, slug: string, formatContent: boolean = true) => {
	try {
		const posts = pb.collection('postsView');
		const post = (await posts.getFirstListItem(`slug="${slug}"`, { expand: 'author' })) as PostType;
		const author = serializeNonPOJOs(post.expand?.author) as UserType;
		return {
			post: {
				author: author.username,
				authorId: author.id,
				postedAt: post.postedAt,
				slug: post.slug,
				title: post.title,
				description: post.description,
				content: formatContent ? getContent(post) : post.content,
				id: post.id
			} as PostType,
			err: null
		};
	} catch (err) {
		return {
			err: {
				status: 404,
				message: 'Post not found'
			} as ErrorType
		};
	}
};

export const getPosts = async (
	pb: Client,
	page: number,
	search: string = '',
	authorId: string = ''
) => {
	try {
		const posts = pb.collection('postsView');
		const searchFilter = search === '' ? '' : ` && searchTerms ~ '${search}'`;
		const authorFilter = authorId === '' ? '' : ` && author='${authorId}'`;
		const result = serializeNonPOJOs(
			await posts.getList(page, elementsPerPage, {
				sort: '-postedAt',
				filter: `postedAt<='${new Date().toISOString()}'${searchFilter}${authorFilter}`,
				expand: 'author'
			})
		);
		const postsList = result.items as PostType[];

		const newPosts: PostType[] = [];
		postsList.forEach((post) => {
			const author = serializeNonPOJOs(post.expand?.author) as UserType;
			newPosts.push({
				author: author.username,
				postedAt: post.postedAt,
				slug: post.slug,
				title: post.title,
				description: post.description
			} as PostType);
		});
		return {
			posts: newPosts,
			totalPages: result.totalPages as number,
			err: null
		};
	} catch (err) {
		return {
			err: {
				status: 404,
				message: 'Posts not found'
			} as ErrorType
		};
	}
};
