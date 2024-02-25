import i18n from 'sveltekit-i18n';

/** @type {import('sveltekit-i18n').Config} */
const config = {
	loaders: [
		{
			locale: 'en',
			key: 'home',
			routes: ['/'], // you can use regexes as well!
			loader: async () => (await import('./en/home.json')).default
		},
		{
			locale: 'en',
			key: 'common',
			loader: async () => (await import('./en/common.json')).default
		},
		{
			locale: 'en',
			key: 'language',
			loader: async () => (await import('./en/language.json')).default
		},
		{
			locale: 'no',
			key: 'home',
			loader: async () => (await import('./no/home.json')).default
		},
		{
			locale: 'no',
			key: 'common',
			loader: async () => (await import('./no/common.json')).default
		},
		{
			locale: 'no',
			key: 'language',
			loader: async () => (await import('./no/language.json')).default
		}
	]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
