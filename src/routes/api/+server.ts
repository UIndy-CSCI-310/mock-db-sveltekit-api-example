import type { RequestEvent, RequestHandler } from './$types';
import type { expensesTracking } from './expensesT';
import { client } from '$lib/client';

export const GET: RequestHandler = async () => {
	const result: [string, expensesTracking][] = [];
	client.keys().forEach((o) => {
		const val = client.get(o);
		if (val) {
			result.push([o, val]);
		}
	});
	return new Response(JSON.stringify(result));
};

export const POST: RequestHandler = async (reqEvent: RequestEvent) => {
	// POST is used to create new objects for the API

	let data: { [key: string]: expensesTracking } = {};
	try {
		data = await reqEvent.request.json();
		Object.keys(data).forEach((k) => client.set(k, data[k]));
	} catch (err) {
		if (err instanceof Error) {
			data = { error: err.message };
		}
	}

	return new Response('We got:' + JSON.stringify(data));
};
