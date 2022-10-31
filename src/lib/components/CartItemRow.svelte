<script>
	import { createEventDispatcher } from 'svelte'
	import { fade } from 'svelte/transition'
	const dispatch = createEventDispatcher()

	export let oid = 0
	export let name = ''
	export let quantity = 0
	export let price = 0
</script>

<div transition:fade>{oid}:{name}</div>
<div transition:fade>{quantity}</div>
<div transition:fade>{price}</div>
<div transition:fade>
	<button on:click={() => dispatch('delete')}>x</button> <a href={`/edit/${oid}`}>Edit</a>
</div>
