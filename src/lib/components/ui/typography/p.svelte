<script>
	export let className = '';
</script>

<p class="leading-7 [&:not(:first-child)]:mt-6 {className}">
	<slot />
</p>
