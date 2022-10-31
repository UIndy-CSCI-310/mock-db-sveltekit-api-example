/** @type {import('./$types').PageLoad} */
export function load({ params }): { oid: string } {
	return {
		oid: params.oid
	}
}
