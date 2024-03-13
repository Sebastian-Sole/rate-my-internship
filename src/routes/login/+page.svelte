<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import LoginForm from '$lib/components/login-form.svelte';
	import { redirect } from '@sveltejs/kit';

	const { form } = data;

	if (data.form.valid) {
		redirect(300, '/');
	}
</script>

<LoginForm formSchema={form} />
