<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	const dispatch = createEventDispatcher();

	export let date = '';
	export let category = '';
	export let budget = 0;
	export let amount = 0;
</script>

<div transition:fade>{date}</div>
<div transition:fade>{category}</div>
<div transition:fade>{budget}</div>
<div transition:fade>{amount}</div>
<div transition:fade><button on:click={() => dispatch('delete')}>x</button></div>
