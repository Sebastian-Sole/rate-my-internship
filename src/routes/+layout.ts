import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { loadTranslations } from '$lib/translations';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import { combineChunks, createBrowserClient, isBrowser, parse } from '@supabase/ssr';

export const load = async ({ url, fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	const { pathname } = url;

	const initLocale = 'en'; // get from cookie, user session, ...

	await loadTranslations(initLocale, pathname); // keep this just before the `return`

	return { supabase, session };
};
