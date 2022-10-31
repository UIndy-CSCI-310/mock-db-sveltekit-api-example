<script lang="ts">
	import type { CartItem } from '$lib/CartItem'
	import CartItemRow from '$lib/components/CartItemRow.svelte'
	import CartTotal from '$lib/components/CartTotal.svelte'
	import CartEnterForm from '$lib/components/CartItemEnterForm.svelte'
	import { cart } from '$lib/cartStore'
	import { onMount } from 'svelte'
	import { doGetAll, doPostItem } from '$lib/apiHelpers'
	import { prevent_default } from 'svelte/internal'

	let currOID = 0

	onMount(async () => {
		const [currOID, data] = await doGetAll()
		cart.set(data)
	})

	const onDelete = (ix: number) => {
		cart.set($cart.filter((_, i) => ix != i))
	}

	const onSubmit = (e: CustomEvent<CartItem>) => {
		const newItem = e.detail
		const newList = [...$cart, newItem] as CartItem[]
		cart.set(newList)
		doPostItem(newItem).then((result) => {
			console.log('In svelte with', JSON.stringify(newItem))
		})
	}
</script>

<CartEnterForm oid={currOID} on:submit={(e) => onSubmit(e)} />

<div class="expensesTrackingDisplay">
	{#each $cart as item, i}
		<CartItemRow {...item} on:delete={() => onDelete(i)} />
	{/each}
</div>

<CartTotal />

<style>
	.expensesTrackingDisplay {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
</style>
