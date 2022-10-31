export interface CartItem {
	oid: number
	name: string
	quantity: number
	price: number
}

export const EmptyCartItem: CartItem = { oid: 0, name: '', quantity: 0, price: 0 }
