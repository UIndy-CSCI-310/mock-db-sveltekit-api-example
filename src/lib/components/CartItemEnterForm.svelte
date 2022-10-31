<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { CartItem } from '$lib/CartItem'
	const dispatch = createEventDispatcher<{ submit: CartItem }>()
	let oid: string
	let name: string
	let quantity: number
	let price: number
	let priceTxt: string = '0'
	let nameField: HTMLInputElement
	$: price = parseFloat(priceTxt)
</script>

<form
	on:submit|preventDefault={() => {
		dispatch('submit', { oid, name, quantity, price })
		oid = ''
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
	<input type="text" name="quantity" bind:value={quantity} /><br />
	<label for="name">Price:</label>
	<input type="text" name="price" bind:value={priceTxt} /> <br />
	<input type="text" name="oid" readonly bind:value={oid} /><input type="submit" />
	<br />
	---------
	<br />
</form>
