<script lang="ts">
	import '../app.pcss';
	import Navbar from '$lib/components/navbar.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { goto } from '$app/navigation';

	let language = '$locale';

	import { t, locales, locale } from '$lib/translations';
	import { Globe } from 'lucide-svelte';

	export let data: PageData;

	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	const handleLogout = () => {
		supabase.auth.signOut();
	};
</script>

<div class="mt-5 flex w-full flex-row justify-end">
	{#if session}
		<Button class="mr-3" on:click={() => handleLogout()}>{$t('common.navbar.logout')}</Button>
	{/if}
	{#if !session}
		<Button class="mr-3" on:click={() => goto('/login')}>{$t('common.navbar.login')}</Button>
		<Button class="mr-3 bg-secondary" on:click={() => goto('/signup')}
			>{$t('common.navbar.sign_up')}</Button
		>
	{/if}

	<div class="mr-5">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button variant="outline" builders={[builder]}><Globe /></Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56">
				<DropdownMenu.Label>{$t('common.language_select')}</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.RadioGroup bind:value={language}>
					{#each $locales as loc}
						<DropdownMenu.RadioItem value={loc}>{$t(`language.${loc}`)}</DropdownMenu.RadioItem>
					{/each}
				</DropdownMenu.RadioGroup>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</div>
<slot />
