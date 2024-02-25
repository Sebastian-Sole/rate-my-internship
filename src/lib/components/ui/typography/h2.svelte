<script lang="ts">
	import type { TypographyProps } from '$lib/utils/component-types';

	export let className: TypographyProps['className'] = '';
</script>

<h2
	class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 {className}"
>
	<slot />
</h2>
