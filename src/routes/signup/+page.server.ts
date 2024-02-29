import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { SignupSchema } from '$lib/schemas/SignupSchema';
import type { Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient.js';

export async function load({ params }) {
	return {
		form: await superValidate(zod(SignupSchema))
	};
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(SignupSchema));
		if (!form.valid) {
			console.log(form.errors);
			return fail(400, {
				form
			});
		}
		const { email, password } = form.data;

		const { data, error } = await supabase.auth.signUp({
			email,
			password
		});

		if (error) {
			console.log(error);
			return fail(400, {
				form: {
					errors: {
						email: error.message
					}
				},
				success: 'false'
			});
		}
		redirect(300, '/');
	}
};
