<script lang="ts">
	import type { TypographyProps } from '$lib/utils/component-types';

	export let className: TypographyProps['className'] = '';
</script>

<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight {className}">
	<slot />
</h3>
