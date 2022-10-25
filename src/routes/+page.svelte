<h1>HW 7: SvelteKit</h1>

<script lang="ts">
	import {onMount} from "svelte"

	let dataList:[string, string][] = []

	onMount(() => {
		fetch("/api")
		.then(result => result.json())
		.then(data => {
			dataList = data
		})
	})
</script>

<section>
	<div class="prose">
		<p>
			This week we'll implement a simple <a href="https://www.geeksforgeeks.org/rest-api-introduction/">REST API</a> with a mock database using SvelteKit.
	</div>

	<ul>
		{#each dataList as item,i}
		<li>{item[0]}:{item[1]}</li>
		{/each}
	</ul>
</section>

<style>
	.prose {
		margin: 1rem;
	}

	ul {
		list-style: none;
	}
</style>
