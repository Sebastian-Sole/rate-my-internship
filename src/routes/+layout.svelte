<script lang="ts">
	import '../app.pcss';
	import Navbar from '$lib/components/navbar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Navbar authData={data} />
<slot />
