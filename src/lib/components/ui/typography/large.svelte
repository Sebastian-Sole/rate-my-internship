<script lang="ts">
	import type { TypographyProps } from '$lib/utils/component-types';

	export let className: TypographyProps['className'] = '';
</script>

<div class="text-lg font-semibold {className}">
	<slot />
</div>
