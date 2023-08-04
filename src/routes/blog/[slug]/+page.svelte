<script lang="ts">
	import PagePanel from '$lib/components/Utils/PagePanel.svelte';
	import { checkPermissions, getDate } from '$lib/utils/helpers';
	import { Button } from 'flowbite-svelte';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/atom-one-dark.css';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const post = data.post;
	const user = data.user;
	const date = getDate(data.post.postedAt || '');

	onMount(() => {
		hljs.highlightAll();
	});
</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<PagePanel>
	<div class="flex justify-between">
		<h1 class="text-6xl">{post.title}</h1>
		{#if (user && user.id && user.id === post.authorId && checkPermissions(['post'], user)) || checkPermissions(['admin'], user)}
			<form action={`/article/delete/${post.slug}`} method="POST">
				<Button href={`/article/edit/${post.slug}`} class="mb-2">Edit</Button>
				<Button type="submit" class="mb-2" color="red">Delete</Button>
			</form>
		{/if}
	</div>

	<h5>{date} | {post.author}</h5>
	{@html post.content}
</PagePanel>
