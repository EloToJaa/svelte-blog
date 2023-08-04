<script lang="ts">
	import { Input, Label, Textarea } from 'flowbite-svelte';
	import DateTimePicker from './DateTimePicker.svelte';

	export let value: string = '';
	export let type:
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'textarea'
		| 'email'
		| 'file'
		| 'hidden'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		| 'reset'
		| 'submit'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week'
		| 'search' = 'text';
	export let name: string;
	export let placeholder: string = '';
	export let messages: string[] | undefined;
	export let rows: number = 4;
	export let label: string = '';

	let show: boolean = false;

	const message = messages?.[0];
	let title: string = name.replace(/([A-Z])/g, ' $1').trim();
	title = title.charAt(0).toUpperCase() + title.slice(1);
</script>

<Label class="space-y-2">
	<span>{label === '' ? title : label}</span>

	{#if type === 'textarea'}
		<Textarea {name} {placeholder} {value} {rows} />
	{:else if type === 'datetime-local'}
		<DateTimePicker {name} {placeholder} {value} />
	{:else if type === 'password'}
		<Input
			type={show ? 'text' : 'password'}
			{name}
			{placeholder}
			color={messages ? 'red' : 'base'}
			{value}
		>
			<button
				slot="right"
				on:click|preventDefault={() => (show = !show)}
				class="pointer-events-auto"
				type="button"
			>
				{#if show}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
						/><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/></svg
					>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
						/></svg
					>
				{/if}
			</button>
		</Input>
	{:else}
		<Input {type} {name} {placeholder} color={messages ? 'red' : 'base'} {value} />
	{/if}

	{#if messages}
		<div class="text-red-500 text-sm">{message}</div>
	{/if}
</Label>
