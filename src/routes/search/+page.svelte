<script lang="ts">
	import Pagination from '$lib/components/Posts/Pagination.svelte';
	import Posts from '$lib/components/Posts/Posts.svelte';
	import Search from '$lib/components/Utils/Search.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Search</title>
</svelte:head>

<Search />
<Posts posts={data.posts} />
<Pagination currentPage={data.page} totalPages={data.totalPages} />
