import { AuthSchema } from '$lib/schemas/SignupSchema';
import { redirect, type Actions, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

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
			return {
				status: 400,
				body: {
					form
				}
			};
		}
		const { email, password } = form.data;

		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		});

		if (error) {
			console.log(error);
			return fail(500, { message: 'An error occurred while logging in. Please try again later.' });
		}

		return redirect(303, '/');
	}
};
