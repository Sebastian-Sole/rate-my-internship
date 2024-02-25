<script lang="ts">
	import { Button } from './ui/button';
	import * as Card from './ui/card';

	export let companyName: string;
	export let description: string;
</script>

<Card.Root class="mx-10 my-5 w-[380px]">
	<Card.Header>
		<Card.Title>{companyName}</Card.Title>
		<Card.Description>{description}</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4"></Card.Content>
	<Card.Footer>
		<Button class="w-full">See internships</Button>
	</Card.Footer>
</Card.Root>
