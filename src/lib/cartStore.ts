import { writable } from 'svelte/store'
import type { CartItem } from '$lib/CartItem'

export const cart = writable<CartItem[]>([] as CartItem[])
