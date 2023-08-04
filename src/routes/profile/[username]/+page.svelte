<script lang="ts">
	import Pagination from '$lib/components/Posts/Pagination.svelte';
	import Posts from '$lib/components/Posts/Posts.svelte';
	import { getDate } from '$lib/utils/helpers';
	import type { PageData } from './$types';

	export let data: PageData;
	const user = data.user;
</script>

<svelte:head>
	<title>{user.username}</title>
</svelte:head>

<h1>{user.username}</h1>
<h4>Joined at {getDate(user.created)}</h4>

<Posts posts={data.posts} />
<Pagination currentPage={data.page} totalPages={data.totalPages} />
