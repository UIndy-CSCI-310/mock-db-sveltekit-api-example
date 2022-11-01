<script lang="ts">
	import CartItemEnterForm from '$lib/components/CartItemEnterForm.svelte'
	import { cart } from '$lib/cartStore'
	import type { CartItem } from '$lib/CartItem'
	import { doPutItem } from '$lib/apiHelpers'
	import { goto } from '$app/navigation'

	/** @type {import('./$types').PageData} */
	export let data
	const oid = data.oid
	let foundItem: CartItem | null = null

	const foundList = $cart.filter((item) => item.oid === parseInt(oid)) // grab the item from the store...
	if (foundList.length === 1) {
		foundItem = foundList[0]
	} else {
		foundItem = null
	}

	const onSubmit = (e: CustomEvent<CartItem>) => {
		const newItem = e.detail
		const foundIndex = $cart.findIndex((item) => item.oid === newItem.oid) // grab the item from the store...
		if (foundIndex !== -1) {
			const currCart = $cart
			currCart[foundIndex] = newItem
			cart.set(currCart)
			doPutItem(newItem).then((result) => {
				goto('/') // back to home page
			})
		}
	}
</script>

<h1>OID: {oid}</h1>

{#if foundItem}
	<CartItemEnterForm {...foundItem} buttonText="Edit" on:submit={(e) => onSubmit(e)} />
{:else}
	<h2>Sorry, I don't see that here...</h2>
{/if}
