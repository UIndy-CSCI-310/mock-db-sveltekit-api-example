import type { CartItem } from './CartItem'
export const doGetAll = async (): Promise<[number, CartItem[]]> => {
	const response = await fetch('/api/')
	const data: [string, CartItem][] = await response.json()
	const result: CartItem[] = []
	const oids: number[] = []
	data.forEach((pair) => {
		oids.push(parseInt(pair[0]))
		result.push(pair[1])
	})
	return [Math.max(...oids) + 1, result]
}

export const doPostItem = async (item: CartItem) => {
	const proxyItem: { [key: string]: CartItem } = {}
	proxyItem[item.oid || ''] = item // if there is no oid, use ''
	const response = await fetch('/api', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(proxyItem)
	})
	const data = await response.json()
	console.log('POST GOT:', data)
	return data
}
