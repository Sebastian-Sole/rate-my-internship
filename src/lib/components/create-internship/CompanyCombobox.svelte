<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import { buttonVariants } from '$lib/components/ui/button';
	import CaretSort from 'svelte-radix/CaretSort.svelte';
	import { tick } from 'svelte';
	import type { Company } from '@prisma/client';

	export let currentCompanyId: number;
	export let companies: Company[];

	let open = false;

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			const trigger = document.getElementById(triggerId);
			trigger?.focus();
		});
	}
</script>

<Popover.Root bind:open let:ids>
	<Form.Control let:attrs>
		<Form.Label>Company</Form.Label>
		<Popover.Trigger
			class={cn(
				buttonVariants({ variant: 'outline' }),
				'w-[200px] justify-between',
				!currentCompanyId && 'text-muted-foreground'
			)}
			role="combobox"
			{...attrs}
		>
			{companies.find((c) => c.id === currentCompanyId)?.name ?? 'Select a company...'}
			<CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Popover.Trigger>
		<input hidden value={currentCompanyId} name={attrs.name} />
	</Form.Control>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input autofocus placeholder="Search company..." class="h-9" />
			<Command.Empty>No company found.</Command.Empty>
			<Command.Group>
				{#each companies as company}
					<Command.Item
						value={company.name}
						onSelect={() => {
							currentCompanyId = company.id;
							closeAndFocusTrigger(ids.trigger);
						}}
					>
						{company.name}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
