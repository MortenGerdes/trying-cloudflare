import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src';

describe('Hello World worker', () => {
	const ctx = createExecutionContext();
	const request = new Request('http://example.com');

	it('responds with Hello World! (unit style)', async () => {
		// Create an empty context to pass to `worker.fetch()`.
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(await response.text()).toMatchInlineSnapshot(`"Hello Money!"`);
	});

	it('responds with Hello World! (integration style)', async () => {
		const response = await SELF.fetch(request, env, ctx);
		expect(await response.text()).toMatchInlineSnapshot(`"Hello Money!"`);
	});
});
