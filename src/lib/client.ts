import { SimpleDB } from './simpledb'
import type { CartItem } from './CartItem'

const mockFName = 'mockdata.json' // just for testing!

class MockClient<T> {
	// mock client for testing...
	private db
	private loaded = false
	constructor() {
		this.db = new SimpleDB<T>()
	}

	get(key: string): T | null {
		if (!this.loaded) {
			this.load()
			this.loaded = true
		}
		return this.db.getItem(key)
	}

	set(key: string, value: T) {
		const newKey = this.db.setItem(key, value) // potentially sets a new key if key is empty
		this.store()
		return newKey
	}

	del(key: string) {
		this.db.removeItem(key)
	}

	keys(): string[] {
		if (!this.loaded) {
			this.load()
			this.loaded = true
		}
		return this.db.keys()
	}

	load() {
		this.db.load(mockFName)
	}

	store() {
		this.db.store(mockFName)
	}
}

const myDB = new MockClient<CartItem>() // you can change this to hold whatever

export const client = myDB
