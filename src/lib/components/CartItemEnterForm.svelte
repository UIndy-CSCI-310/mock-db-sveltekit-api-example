<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { CartItem } from '$lib/CartItem'
	const dispatch = createEventDispatcher<{ submit: CartItem }>()
	export let oid: number
	export let name: string = ''
	export let quantity: number = 0
	export let price: number = 0
	export let buttonText: string = 'Add Row'
	let priceTxt: string = price.toString()
	let nameField: HTMLInputElement
	$: price = parseFloat(priceTxt)
</script>

<form
	on:submit|preventDefault={() => {
		dispatch('submit', { oid, name, quantity, price })
		oid = oid + 1
		name = ''
		quantity = 0
		price = 0
		priceTxt = ''
		nameField.focus()
	}}
>
	<label for="name">Name:</label>
	<input type="text" bind:this={nameField} name="name" bind:value={name} /><br />
	<label for="name">Quantity:</label>
	<input type="number" name="quantity" bind:value={quantity} /><br />
	<label for="name">Price:</label>
	<input type="text" name="price" bind:value={priceTxt} /> <br />
	<label for="oid">OID</label>
	<input type="text" name="oid" readonly bind:value={oid} /><input
		value={buttonText}
		type="submit"
	/>
	<br />
	---------
	<br />
</form>
