<script lang="ts">
	import { expenses } from '../lib/expenseStore';
</script>

<div>
	-------<br />
	Total: ${$expenses.reduce((pv, expense) => pv + expense.amount, 0).toFixed(2)}
</div>
