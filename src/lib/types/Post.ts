import type UserType from './User';

interface PostType {
	title?: string;
	content?: string;
	author?: string;
	authorId?: string;
	description?: string;
	postedAt?: string;
	slug?: string;
	unformattedContent?: string;
	searchTerms?: string;
	id?: string;
	expand?: {
		author?: UserType;
	};
}

export default PostType;
