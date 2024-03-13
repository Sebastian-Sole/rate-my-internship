<script lang="ts">
	import '../app.pcss';
	import Navbar from '$lib/components/navbar.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';

	export let data: PageData;

	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<Navbar {session} {supabase} />

<slot />
