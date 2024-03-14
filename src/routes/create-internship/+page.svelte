<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils.js';
	import CalendarIcon from 'svelte-radix/Calendar.svelte';

	import {
		CreateInternshipSchema,
		type CreateInternship
	} from '$lib/schemas/CreateInternshipSchema';
	import SuperDebug, { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import {
		type DateValue,
		DateFormatter,
		getLocalTimeZone,
		parseDate,
		CalendarDate,
		today
	} from '@internationalized/date';
	export let data: PageData;
	import { Calendar } from '$lib/components/ui/calendar/index.js';

	const { createInternshipForm } = data;

	const form = superForm(createInternshipForm, {
		validators: zodClient(CreateInternshipSchema)
	});

	const { form: formData, enhance } = form;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let value: DateValue | undefined;

	$: value = $formData.duration ? parseDate($formData.duration) : undefined;

	let placeholder: DateValue = today(getLocalTimeZone());
</script>

<SuperDebug data={formData} />

<form method="POST" use:enhance class="flex w-full justify-center">
	<div class="flex w-[80%] flex-col items-center">
		<Form.Field {form} name="companyId" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Company</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.companyId}
					placeholder="TODO: Change this to dropdown search"
				/>
			</Form.Control>
			<Form.Description>This is your public display name.</Form.Description>
			<Form.FieldErrors />
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
		<Form.Field {form} name="duration" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Duration of Internship</Form.Label>
				<Popover.Root openFocus>
					<Popover.Trigger asChild let:builder>
						<Button
							variant="outline"
							class={cn(
								'w-[300px] justify-start text-left font-normal',
								!value && 'text-muted-foreground'
							)}
							builders={[builder]}
						>
							<CalendarIcon class="mr-2 h-4 w-4" />
							{#if value && value.start}
								{#if value.end}
									{df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(
										value.end.toDate(getLocalTimeZone())
									)}
								{:else}
									{df.format(value.start.toDate(getLocalTimeZone()))}
								{/if}
							{:else if startValue}
								{df.format(startValue.toDate(getLocalTimeZone()))}
							{:else}
								Pick a date
							{/if}
						</Button>
					</Popover.Trigger>
					<Popover.Content class="w-auto p-0" align="start">
						<RangeCalendar
							bind:value
							bind:startValue
							placeholder={value?.start}
							initialFocus
							numberOfMonths={2}
						/>
					</Popover.Content>
				</Popover.Root>
			</Form.Control>
			<Form.Description>This is your public display name.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="end_date" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>End Date</Form.Label>
				<Input {...attrs} bind:value={$formData.end_date} />
			</Form.Control>
			<Form.Description>This is your public display name.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="teamSize" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Team Size</Form.Label>
				<Input {...attrs} bind:value={$formData.teamSize} placeholder={'5'} />
			</Form.Control>
			<Form.Description>This is your public display name.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="hourlyWage" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Hourly Wage</Form.Label>
				<Input {...attrs} bind:value={$formData.hourlyWage} placeholder={'275kr'} />
			</Form.Control>
			<Form.Description>This is your public display name.</Form.Description>
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
