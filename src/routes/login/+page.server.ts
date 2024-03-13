import { AuthSchema } from '$lib/schemas/SignupSchema';
import { supabase } from '$lib/supabaseClient';
import { redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
	return {
		form: await superValidate(zod(AuthSchema))
	};
}

export const actions: Actions = {
	default: async (event) => {
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

		console.log(form.data);

		const x = await supabase.auth
			.signInWithPassword({
				email: email,
				password: password
			})
			.then((res) => {
				throw redirect(301, '/');
			})
			.catch((error) => {
				console.log(error);
				return {
					status: 400,
					body: {
						form: {
							errors: {
								email: error.message
							}
						},
						success: 'false'
					}
				};
			});
		// Redirect if successfull login with logged in session
		console.log(x.body.form.errors);
		throw redirect(301, '/');
	}
};
