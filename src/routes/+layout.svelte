<script lang="ts">
	import Footer from '$lib/components/Footer/Footer.svelte';
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';
	import Navbar from '../lib/components/Navbar/Navbar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Toaster gutter={-52} />
<div class="relative dark:text-gray-100 dark:bg-gray-800">
	<Navbar user={data.user} />
	<div class="overflow-auto pt-16 md:pt-24 h-screen flex flex-col justify-between">
		<div class="container mx-auto text-justify">
			<slot />
		</div>
		<Footer />
	</div>
</div>
