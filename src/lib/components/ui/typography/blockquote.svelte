<script lang="ts">
	import type { TypographyProps } from '$lib/utils/component-types';

	export let className: TypographyProps['className'] = '';
</script>

<blockquote class="mt-6 border-l-2 pl-6 italic {className}">
	<slot />
</blockquote>
