<script lang="ts">
	import { Button } from './ui/button';
	import { Globe } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	let language = '$locale';

	import { t, locales, locale } from '$lib/translations';
	import type { Session } from '@supabase/supabase-js';
	import { goto } from '$app/navigation';

	export let session: Session | null;

	$: {
		if (language !== $locale) {
			$locale = language;
		}
	}
</script>

<div class="mt-5 flex w-full flex-row justify-end">
	{#if session}
		<Button class="mr-3" on:click={() => console.log('logout')}>{$t('common.navbar.logout')}</Button
		>
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
