<script lang="ts">
	import type { CartItem } from '$lib/CartItem'
	import { EmptyCartItem } from '$lib/CartItem'
	import CartItemRow from '$lib/components/CartItemRow.svelte'
	import CartTotal from '$lib/components/CartTotal.svelte'
	import CartItemEnterForm from '$lib/components/CartItemEnterForm.svelte'
	import { cart } from '$lib/cartStore'
	import { onMount } from 'svelte'
	import { doGetAll, doPostItem, doDeleteItem } from '$lib/apiHelpers'

	let currOID = 0

	onMount(async () => {
		const [oid, data] = await doGetAll()
		currOID = oid
		cart.set(data)
	})

	const onDelete = (ix: number) => {
		const oid = $cart[ix].oid
		cart.set($cart.filter((_, i) => ix != i))
		doDeleteItem(oid)
	}

	const onSubmit = (e: CustomEvent<CartItem>) => {
		const newItem = e.detail
		const newList = [...$cart, newItem] as CartItem[]
		cart.set(newList)
		doPostItem(newItem).then((result) => {
			currOID++
		})
	}
</script>

<CartItemEnterForm {...EmptyCartItem} oid={currOID} on:submit={(e) => onSubmit(e)} />

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
