<script lang="ts">
	import type { TypographyProps } from '$lib/utils/component-types';

	export let className: TypographyProps['className'] = '';
</script>

<code
	class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold {className}"
>
	<slot />
</code>
