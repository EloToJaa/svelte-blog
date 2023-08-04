import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

export const formatContent = (content: string) => {
	// const formattedContent = content.replace(/(\r\n|\n|\r)/gm, '<br>');
	const parsedContent = marked.parse(content);
	const sanitizedContent = sanitizeHtml(parsedContent);
	return sanitizedContent;
};

export const sanitizeContent = (content: string) => {
	// const formattedContent = content.replace(/(\r\n|\n|\r)/gm, '<br>');
	const sanitizedContent = sanitizeHtml(content);
	return sanitizedContent;
};

export const removeNewLines = (content: string | undefined) => {
	if (!content) return '';
	return content.replace(/(\r\n|\n|\r)/gm, ' ');
};

export const removeHTMLTags = (content: string) => {
	const strippedContent = sanitizeHtml(content, {
		allowedTags: [],
		allowedAttributes: {}
	});
	return removeNewLines(strippedContent);
};
