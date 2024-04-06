<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils.js';
	import CalendarIcon from 'svelte-radix/Calendar.svelte';

	import { CreateInternshipSchema } from '$lib/schemas/CreateInternshipSchema';
	import SuperDebug, { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import CaretSort from "svelte-radix/CaretSort.svelte";
	import * as Command from "$lib/components/ui/command/index.js";
	import Check from "svelte-radix/Check.svelte";



	import type { PageData } from './$types';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import {
		type DateValue,
		DateFormatter,
		getLocalTimeZone,
		parseDate,
		today,
		CalendarDate
	} from '@internationalized/date';
	import { Calendar } from '$lib/components/ui/calendar';
	import { PrismaClient } from '@prisma/client';
	import { tick } from 'svelte';
	import { Field } from 'formsnap';
	export let data: PageData;

	const { createInternshipForm, companies } = data;

	const form = superForm(createInternshipForm, {
		validators: zodClient(CreateInternshipSchema)
	});

	const { form: formData, enhance } = form;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let start_date_value: DateValue | undefined;
	let end_date_value: DateValue | undefined;
	$: start_date_value = $formData.start_date ? parseDate($formData.start_date) : undefined;
	$: end_date_value = $formData.end_date ? parseDate($formData.end_date) : undefined;
	$: team_size = $formData.teamSize ? Number($formData.teamSize) : undefined;

	let placeholder: DateValue = today(getLocalTimeZone());

	let open = false;

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			const trigger = document.getElementById(triggerId);
			trigger?.focus();
		})
	}

</script>

<SuperDebug data={formData} />

<form method="POST" use:enhance class="flex w-full justify-center">
	<div class="flex w-[80%] flex-col items-center">
		<Form.Field {form} name="companyId" class="flex flex-col w-full">
				<Popover.Root bind:open let:ids>
					<Form.Control let:attrs>
						<Form.Label>Company</Form.Label>
					  <Popover.Trigger
						class={cn(
						  buttonVariants({ variant: "outline" }),
						  "w-[200px] justify-between",
						  !$formData.companyId && "text-muted-foreground"
						)}
						role="combobox"
						{...attrs}
					  >
						{companies.find((c) => c.id === $formData.companyId)?.name ??
						  "Select a company..."}
						<CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
					  </Popover.Trigger>
					  <input hidden value={$formData.companyId} name={attrs.name} />
					</Form.Control>
					<Popover.Content class="w-[200px] p-0">
					  <Command.Root>
						<Command.Input
						  autofocus
						  placeholder="Search company..."
						  class="h-9"
						/>
						<Command.Empty>No company found.</Command.Empty>
						<Command.Group>
						  {#each companies as company}
							<Command.Item
							  value={company.name}
							  onSelect={() => {
								$formData.companyId = company.id;
								closeAndFocusTrigger(ids.trigger);
							  }}
							>
							  {company.name}
							  <Check
								class={cn(
								  "ml-auto h-4 w-4",
								  company.id !== $formData.companyId && "text-transparent"
								)}
							  />
							</Command.Item>
						  {/each}
						</Command.Group>
					  </Command.Root>
					</Popover.Content>
				  </Popover.Root>


		</Form.Field>

		<Form.Field {form} name="name" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Internship Title</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.name}
					placeholder="Fullstack Web Developer Internship"
				/>
			</Form.Control>
			<Form.Description>This is your public display name.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="projectDescription" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Description</Form.Label>
				<Input {...attrs} bind:value={$formData.projectDescription} />
			</Form.Control>
			<Form.Description>Must be at least 8 characters long.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="start_date" class="flex flex-col">
			<Form.Control let:attrs>
				<Form.Label>Date of birth</Form.Label>
				<Popover.Root>
					<Popover.Trigger
						{...attrs}
						class={cn(
							buttonVariants({ variant: 'outline' }),
							'w-[280px] justify-start pl-4 text-left font-normal',
							!start_date_value && 'text-muted-foreground'
						)}
					>
						{start_date_value
							? df.format(start_date_value.toDate(getLocalTimeZone()))
							: 'Pick a date'}
						<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
					</Popover.Trigger>
					<Popover.Content class="w-auto p-0" side="top">
						<Calendar
							value={start_date_value}
							bind:placeholder
							minValue={new CalendarDate(1900, 1, 1)}
							maxValue={today(getLocalTimeZone())}
							calendarLabel="Date of birth"
							initialFocus
							onValueChange={(v) => {
								if (v) {
									if (end_date_value && v > end_date_value) {
										$formData.end_date = v.toString();
									}
									$formData.start_date = v.toString();
								} else {
									$formData.start_date = '';
								}
							}}
						/>
					</Popover.Content>
				</Popover.Root>
				<Form.Description>Your date of birth is used to calculator your age</Form.Description>
				<Form.FieldErrors />
				<input hidden value={$formData.start_date} name={attrs.name} />
			</Form.Control>
		</Form.Field>

		<Form.Field {form} name="end_date" class="flex flex-col">
			<Form.Control let:attrs>
				<Form.Label>Date of birth</Form.Label>
				<Popover.Root>
					<Popover.Trigger
						{...attrs}
						class={cn(
							buttonVariants({ variant: 'outline' }),
							'w-[280px] justify-start pl-4 text-left font-normal',
							!end_date_value && 'text-muted-foreground'
						)}
					>
						{end_date_value
							? df.format(end_date_value.toDate(getLocalTimeZone()))
							: 'Pick a date'}
						<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
					</Popover.Trigger>
					<Popover.Content class="w-auto p-0" side="top">
						<Calendar
							value={end_date_value}
							bind:placeholder
							minValue={new CalendarDate(1900, 1, 1)}
							maxValue={today(getLocalTimeZone())}
							calendarLabel="Date of birth"
							initialFocus
							onValueChange={(v) => {
								if (v) {
									if (start_date_value && v < start_date_value) {
										$formData.start_date = v.toString();
									} 
									$formData.end_date = v.toString();
								} else {
									$formData.end_date = '';
								}
							}}
						/>
					</Popover.Content>
				</Popover.Root>
				<Form.Description>Your date of birth is used to calculator your age</Form.Description>
				<Form.FieldErrors />
				<input hidden value={$formData.end_date} name={attrs.name} />
			</Form.Control>
		</Form.Field>

		<Form.Field {form} name="teamSize" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Team Size</Form.Label>
				<Input {...attrs} bind:value={$formData.teamSize} placeholder={"5"} />
			</Form.Control>
			<Form.Description>This is your public display name.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="hourlyWage" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Hourly Wage</Form.Label>
				<Input {...attrs} bind:value={$formData.hourlyWage} placeholder={'275'} />
			</Form.Control>
			<Form.Description></Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="learnings" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>What Skills Did You Learn?</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.learnings}
					placeholder="We worked with NextJS, so my Frontend and React skills improved..."
				/>
			</Form.Control>
			<Form.Description>This is your public display name.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="technologies" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Technologies Used</Form.Label>
				<Input {...attrs} bind:value={$formData.technologies} />
			</Form.Control>
			<Form.Description>This is your public display name.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="mentoringValue" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>What Role Did The Mentors Have In Your Project?</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.mentoringValue}
					placeholder="My mentors were very hands-on and helped me with... / My mentors were more hands-off and let me figure things out on my own..."
				/>
			</Form.Control>
			<Form.Description>This is your public display name.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="socialAspects" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.socialAspects}
					placeholder="There were social events twice a week, with the team and across teams... / There were no social events..."
				/>
			</Form.Control>
			<Form.Description>This is your public display name.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="expectationsVsReality" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Expectations vs Reality</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.expectationsVsReality}
					placeholder="My expectations were x... In reality, it was y. Both positive and negative aspects..."
				/>
			</Form.Control>
			<Form.Description>This is your public display name.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="rating" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Rating</Form.Label>
				<Input {...attrs} bind:value={$formData.rating} placeholder="8.5" />
			</Form.Control>
			<Form.Description>This is your public display name.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="isAnonymous" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Anonymous?</Form.Label>
				<Input {...attrs} bind:value={$formData.isAnonymous} />
			</Form.Control>
			<Form.Description>This is your public display name.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="comment" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Additional Comment</Form.Label>
				<Input {...attrs} bind:value={$formData.name} placeholder="Nothing..." />
			</Form.Control>
			<Form.Description>This is your public display name.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Button>Submit</Form.Button>
	</div>
</form>
