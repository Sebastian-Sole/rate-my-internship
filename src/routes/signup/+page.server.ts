import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { AuthSchema } from '$lib/schemas/SignupSchema';
import type { Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ params }) {
	return {
		form: await superValidate(zod(AuthSchema))
	};
}

export const actions: Actions = {
	default: async (event) => {
		const {
			locals: { supabase }
		} = event;
		const form = await superValidate(event, zod(AuthSchema));
		if (!form.valid) {
			console.log(form.errors);
			return fail(400, {
				form
			});
		}
		const { email, password } = form.data;

		const { error } = await supabase.auth.signUp({
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

		const { error: loginError } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (loginError) {
			console.log(loginError);
			return fail(400, {
				form: {
					errors: {
						email: loginError.message
					}
				},
				success: 'false'
			});
		}

		redirect(300, '/');
	}
};
