<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import SignupForm from '$lib/components/signup-form.svelte';
</script>

<SignupForm data={data.form} />
