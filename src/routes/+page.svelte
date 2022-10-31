<script lang="ts">
	import type { expensesTracking } from '../lib/expensesT';
	import ExpensesTRow from '../components/expensesTRow.svelte';
	import ExpensesTotal from '../../src/components/expensesTotal.svelte';
	import { expenses } from '../lib/expenseStore';
	import CartEnterForm from '../components/expensesEnterForm.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		const response = await fetch('/api/');
		const data = await response.json();
		expenses.set(data);
	});

	const onDelete = (ix: number) => {
		expenses.set($expenses.filter((_, i) => ix != i));
	};

	const onSubmit = (e: CustomEvent<expensesTracking>) => {
		const newItem = e.detail;
		const newList = [...$expenses, newItem] as expensesTracking[];
		expenses.set(newList);
	};
</script>

<CartEnterForm on:submit={(e) => onSubmit(e)} />

<div class="expensesTrackingDisplay">
	{#each $expenses as expense, i}
		<ExpensesTRow {...expense} on:delete={() => onDelete(i)} />
	{/each}
</div>

<ExpensesTotal />

<style>
	.expensesTrackingDisplay {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	}
</style>
