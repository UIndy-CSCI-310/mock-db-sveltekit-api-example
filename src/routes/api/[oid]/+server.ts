import type { RequestEvent, RequestHandler } from './$types'
import { error } from '@sveltejs/kit';

import {client} from "$lib/client"

export const GET: RequestHandler = async (reqEvent: RequestEvent) => {
  console.log("In GET with specific OID:",reqEvent.url) // left in as an example
  const key = reqEvent.url.pathname.split('/').slice(-1)[0]
  const val = client.get(key)
  if (val) {
    return new Response(client.get(key))
  } else {
    throw error(404, "Yikes! No value for that key")
  }
}

export const PUT: RequestHandler = async (reqEvent: RequestEvent) => {
  // fill in here

  return new Response("")
}

export const DELETE: RequestHandler = async (reqEvent: RequestEvent) => {
  // fill in here

  return new Response("")
}

