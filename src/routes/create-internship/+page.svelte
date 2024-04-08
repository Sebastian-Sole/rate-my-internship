<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils.js';
	import CalendarIcon from 'svelte-radix/Calendar.svelte';
	import { Textarea } from '$lib/components/ui/textarea';

	import { CreateInternshipSchema } from '$lib/schemas/CreateInternshipSchema';
	import SuperDebug, { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import type { PageData } from './$types';
	import { buttonVariants } from '$lib/components/ui/button';
	import {
		type DateValue,
		DateFormatter,
		getLocalTimeZone,
		parseDate,
		today,
		CalendarDate
	} from '@internationalized/date';
	import { Calendar } from '$lib/components/ui/calendar';
	import CompanyCombobox from '$lib/components/create-internship/CompanyCombobox.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Checkbox } from '$lib/components/ui/checkbox';
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

	let placeholder: DateValue = today(getLocalTimeZone());

	const handleDateChange = (v: DateValue | undefined, isStartDate: boolean) => {
		if (v) {
			if (isStartDate) {
				if (end_date_value && v > end_date_value) {
					$formData.end_date = v.toString();
				}
				$formData.start_date = v.toString();
			} else {
				if (start_date_value && v < start_date_value) {
					$formData.start_date = v.toString();
				}
				$formData.end_date = v.toString();
			}
		} else {
			if (isStartDate) {
				$formData.start_date = '';
			} else {
				$formData.end_date = '';
			}
		}
	};
</script>

<SuperDebug data={formData} />

<form method="POST" use:enhance class="flex w-full justify-center">
	<div class="flex w-[80%] flex-col items-center">
		<Form.Field {form} name="companyId" class="flex w-full flex-col">
			<CompanyCombobox bind:currentCompanyId={$formData.companyId} {companies} />
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
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="projectDescription" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Description</Form.Label>
				<Input {...attrs} bind:value={$formData.projectDescription} />
			</Form.Control>
			<Form.Description
				>A description of the job, or the provided description from the employer</Form.Description
			>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="start_date" class="flex w-full flex-col">
			<Form.Control let:attrs>
				<Form.Label>Start Date</Form.Label>
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
							calendarLabel="Start Date"
							initialFocus
							onValueChange={(v) => handleDateChange(v, true)}
						/>
					</Popover.Content>
				</Popover.Root>
				<Form.FieldErrors />
				<input hidden value={$formData.start_date} name={attrs.name} />
			</Form.Control>
		</Form.Field>

		<Form.Field {form} name="end_date" class="flex w-full flex-col">
			<Form.Control let:attrs>
				<Form.Label>End Date</Form.Label>
				<Popover.Root>
					<Popover.Trigger
						{...attrs}
						class={cn(
							buttonVariants({ variant: 'outline' }),
							'w-[280px] justify-start pl-4 text-left font-normal',
							!end_date_value && 'text-muted-foreground'
						)}
					>
						{end_date_value ? df.format(end_date_value.toDate(getLocalTimeZone())) : 'Pick a date'}
						<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
					</Popover.Trigger>
					<Popover.Content class="w-auto p-0" side="top">
						<Calendar
							value={end_date_value}
							bind:placeholder
							minValue={new CalendarDate(1900, 1, 1)}
							maxValue={today(getLocalTimeZone())}
							calendarLabel="End Date"
							initialFocus
							onValueChange={(v) => handleDateChange(v, false)}
						/>
					</Popover.Content>
				</Popover.Root>
				<Form.FieldErrors />
				<input hidden value={$formData.end_date} name={attrs.name} />
			</Form.Control>
		</Form.Field>

		<Form.Field {form} name="teamSize" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Team Size</Form.Label>
				<Input {...attrs} bind:value={$formData.teamSize} placeholder={'5'} />
			</Form.Control>
			<Form.Description>Number of other interns including yourself</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="hourlyWage" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Hourly Wage</Form.Label>
				<Input {...attrs} bind:value={$formData.hourlyWage} placeholder={'275'} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="learnings" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>What Skills Did You Learn?</Form.Label>

				<Textarea
					{...attrs}
					bind:value={$formData.learnings}
					placeholder="We worked with NextJS, so my Frontend and React skills improved..."
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="technologies" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Technologies Used</Form.Label>
				<Input {...attrs} bind:value={$formData.technologies} />
			</Form.Control>
			<Form.Description>E.g. NextJS, Angular, Java, REST API, Pandas...</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="mentoringValue" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>What Role Did The Mentors Have In Your Project?</Form.Label>
				<Textarea
					{...attrs}
					bind:value={$formData.mentoringValue}
					placeholder="My mentor was always available to help me with my code, and we had weekly check-ins..."
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="socialAspects" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Social Aspects</Form.Label>
				<Textarea
					{...attrs}
					bind:value={$formData.socialAspects}
					placeholder="We had weekly team lunches, and we went out for drinks every Friday..."
				/>
			</Form.Control>
			<Form.Description>What social activities were there?</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="expectationsVsReality" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Expectations vs Reality</Form.Label>
				<Textarea
					{...attrs}
					bind:value={$formData.expectationsVsReality}
					placeholder="I expected to learn a lot about React, but we ended up using NextJS..."
				/>
			</Form.Control>
			<Form.Description>How did the experience meet or fail your expectations?</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="rating" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Rating</Form.Label>
				<Input {...attrs} bind:value={$formData.rating} placeholder="8.5" />
			</Form.Control>
			<Form.Description>Overall rating out of 10</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="isAnonymous" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Publish Anonymously?</Form.Label>
				<Checkbox bind:checked={$formData.isAnonymous} />
			</Form.Control>
			<Tooltip.Root>
				<!-- Todo: More info hover -->
				<Tooltip.Trigger>More info</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Change later</p>
				</Tooltip.Content>
			</Tooltip.Root>
			<Form.Description></Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="comment" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Additional Comment</Form.Label>
				<Textarea {...attrs} bind:value={$formData.comment} />
			</Form.Control>
			<Form.Description>Anything else you want to add</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Button>Submit</Form.Button>
	</div>
</form>
