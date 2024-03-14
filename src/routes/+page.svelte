<script lang="ts">
	import CompanyCard from '$lib/components/companyCard.svelte';
	import { Input } from '$lib/components/ui/input';
	import H1 from '$lib/components/ui/typography/h1.svelte';
	import Small from '$lib/components/ui/typography/small.svelte';
	import { t } from '$lib/translations';
	import type { PageData } from './$types';

	let inputValue: string = '';

	const handleChange = (e: any) => {
		inputValue = e.target.value;
	};

	export let data: PageData;

	const { session } = data;
</script>

<div class="mt-[50px] flex flex-col items-center justify-center pb-96">
	<div class="flex w-full flex-col items-center">
		{#if session}
			<div>{session.user.email} is logged in</div>
		{/if}
		{#if !session}
			<div>{$t('home.title')}</div>
		{/if}
		<H1>Rate My Internship 🎉</H1>
		<Small className="mt-3">{$t('home.description')}</Small>
		<Input placeholder="Bekk..." class="mt-6 w-[80%]" on:change={(e) => handleChange(e)}></Input>
	</div>
	<div class="grid-cols-3 gap-4 xl:grid">
		<CompanyCard companyName="Bekk" description="3 Reviews" />
		<CompanyCard companyName="Capra" description="3 Reviews" />
		<CompanyCard companyName="Knowit" description="3 Reviews" />
		<CompanyCard companyName="Sportradar" description="3 Reviews" />
		<CompanyCard companyName="Netlight" description="3 Reviews" />
	</div>
</div>
