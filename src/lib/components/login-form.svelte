<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { type AuthForm, AuthSchema } from '$lib/schemas/SignupSchema';

	export let formSchema: SuperValidated<Infer<AuthForm>>;

	const form = superForm(formSchema, {
		validators: zodClient(AuthSchema)
	});

	const { form: formData, enhance } = form;
</script>

<SuperDebug data={formData} />

<form method="POST" use:enhance>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} placeholder="example@example.com" />
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input {...attrs} bind:value={$formData.password} type={'password'} />
		</Form.Control>
		<Form.Description>Must be at least 8 characters long.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
