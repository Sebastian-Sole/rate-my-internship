<script lang="ts">
	import type { TypographyProps } from '$lib/utils/component-types';

	export let className: TypographyProps['className'] = '';
</script>

<small class="text-sm font-medium leading-none {className}">
	<slot />
</small>
