<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { expensesTracking } from '../lib/expensesT';
	const dispatch = createEventDispatcher<{ submit: expensesTracking }>();
	let date: string;
	let category: string;
	let budget: number;
	let priceTxt: string = '0';
	let nameField: HTMLInputElement;
	$: amount = parseFloat(priceTxt);
</script>

<form
	on:submit|preventDefault={() => {
		dispatch('submit', { date, category, budget, amount });
		date = '';
		category = '';
		budget = 0;
		priceTxt = '';
		nameField.focus();
	}}
>
	<label for="name">Date:</label>
	<input type="text" bind:this={nameField} name="name" bind:value={date} /><br />
	<label for="name">Category:</label>
	<input type="text" bind:this={nameField} name="name" bind:value={category} /><br />
	<label for="name">Budget:</label>
	<input type="number" name="name" bind:value={budget} /><br />
	<label for="name">Amount:</label>
	<input type="text" name="amount" bind:value={priceTxt} /> <input type="submit" />
	<br />
	---------
	<br />
</form>
