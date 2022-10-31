import { writable } from 'svelte/store';
import type { expensesTracking } from './expensesT';

const myExpenses: expensesTracking[] = [];

export const expenses = writable<expensesTracking[]>(myExpenses);
