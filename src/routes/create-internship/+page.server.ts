import { CreateInternshipSchema } from '$lib/schemas/CreateInternshipSchema.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
	return {
		createInternshipForm: await superValidate(zod(CreateInternshipSchema))
	};
}
