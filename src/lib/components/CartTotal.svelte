<script lang="ts">
	import { cart } from '$lib/cartStore'
</script>

<div>
	<hr />
	Total: ${$cart.reduce((pv, item) => pv + item.quantity * item.price, 0).toFixed(2)}
</div>
