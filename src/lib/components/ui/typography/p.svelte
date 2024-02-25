<script lang="ts">
	import type { TypographyProps } from '$lib/utils/component-types';

	export let className: TypographyProps['className'] = '';
</script>

<p class="leading-7 [&:not(:first-child)]:mt-6 {className}">
	<slot />
</p>
