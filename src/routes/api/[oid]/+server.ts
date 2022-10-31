import type { RequestEvent, RequestHandler } from './$types'
import { error } from '@sveltejs/kit'
import { client } from '$lib/client'

import type { CartItem } from '$lib/CartItem'

export const GET: RequestHandler = async (reqEvent: RequestEvent) => {
	console.log('In GET with specific OID:', reqEvent.url) // left in as an example
	const key = reqEvent.url.pathname.split('/').slice(-1)[0]
	const val = client.get(key)
	if (val) {
		return new Response(JSON.stringify(client.get(key)))
	} else {
		throw error(404, 'Yikes! No value for that key')
	}
}

export const PUT: RequestHandler = async (reqEvent: RequestEvent) => {
	const key = reqEvent.url.pathname.split('/').slice(-1)[0]
	let val: CartItem | null = null
	try {
		val = await reqEvent.request.json()
		// maybe do some sanity checking here?
		console.log('in PUT', val)
		client.set(key, val as CartItem)
	} catch (err) {
		if (err instanceof Error) {
			throw error(404, err.message)
		}
	}

	return new Response(JSON.stringify([key, val]))
}

export const DELETE: RequestHandler = async (reqEvent: RequestEvent) => {
	const key = reqEvent.url.pathname.split('/').slice(-1)[0]
	client.del(key)

	return new Response(JSON.stringify({ message: `Deleted Key ${key}` }))
}
