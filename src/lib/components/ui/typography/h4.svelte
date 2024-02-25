<script lang="ts">
	import type { TypographyProps } from '$lib/utils/component-types';

	export let className: TypographyProps['className'] = '';
</script>

<h4 class="scroll-m-20 text-xl font-semibold tracking-tight {className}">
	<slot />
</h4>
