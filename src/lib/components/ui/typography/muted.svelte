<script lang="ts">
	import type { TypographyProps } from '$lib/utils/component-types';

	export let className: TypographyProps['className'] = '';
</script>

<p class="text-sm text-muted-foreground {className}">
	<slot />
</p>
