<script lang="ts">
	import type { TypographyProps } from '$lib/utils/component-types';

	export let className: TypographyProps['className'] = '';
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl {className}">
	<slot />
</h1>
