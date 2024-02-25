<script>
	import { Button } from './ui/button';
	import { Globe } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	let language = '$locale';

	import { t, locales, locale } from '$lib/translations';

	$: {
		// watch for changes to the language variable
		if (language !== $locale) {
			// if the language has changed, update the current locale
			$locale = language;
		}
	}
</script>

<div class="mt-5 flex w-full flex-row justify-end">
	<div>
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
	<Button class="mr-3">Login</Button>
	<Button class="mr-3 bg-secondary">Sign Up</Button>
</div>
