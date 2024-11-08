import { test, expect } from 'bun:test'
import log from '../logs/log'

test('client.ts', async () => {
	const result = await log.usersOnChat.get()
	expect(Array.isArray(result)).toBe(true)
	// biome-ignore lint/complexity/noForEach: <explanation>
	result.forEach((item) => {
		expect(typeof item).toBe('string')
	})
})
