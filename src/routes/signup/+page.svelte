<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import SignupForm from '$lib/components/signup-form.svelte';
	import { redirect } from '@sveltejs/kit';

	if (data.form.valid) {
		console.log('hello');
		redirect(300, '/');
	}
</script>

<SignupForm data={data.form} />
