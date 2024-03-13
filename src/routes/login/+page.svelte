<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import LoginForm from '$lib/components/login-form.svelte';
	import { redirect } from '@sveltejs/kit';

	if (data.form.valid) {
		console.log('hello');
		redirect(300, '/');
	}
</script>

<LoginForm data={data.form} />
