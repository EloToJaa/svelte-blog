<script lang="ts">
	import type UserType from '$lib/types/User';
	import { checkPermissions } from '$lib/utils/helpers';
	import { faUser } from '@fortawesome/free-solid-svg-icons';
	import { Button, Dropdown, DropdownDivider, DropdownItem } from 'flowbite-svelte';
	import Fa from 'svelte-fa';
	export let user: UserType | null;
</script>

{#if user}
	<Button pill id="avatar_with_name" class="!p-3">
		<Fa icon={faUser} class="mr-2" />
		<span class="text-lg font-semibold">{user.username}</span>
	</Button>
	<Dropdown inline triggeredBy="#avatar_with_name" frameClass="">
		<DropdownItem href="/user">User dashboard</DropdownItem>
		<DropdownItem href={`/profile/${user.username}`}>Profile</DropdownItem>
		<DropdownDivider divClass="my-1 h-px bg-gray-100 dark:bg-gray-600 w-full" />
		{#if checkPermissions(['post'], user)}
			<DropdownItem href="/article/add">New article</DropdownItem>
			<DropdownDivider />
		{/if}
		<form method="post" action="/auth/logout">
			<DropdownItem type="submit">Sign out</DropdownItem>
		</form>
	</Dropdown>
{:else}
	<Button
		class="mr-2 text-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
		pill
		href="/login"
	>
		Sign In
	</Button>
{/if}
