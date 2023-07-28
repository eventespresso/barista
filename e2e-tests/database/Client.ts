import { Url, Schema } from '@eventespresso/e2e';
import R from 'ramda';
import fetch, { Request, Response, RequestInit, BodyInit } from 'node-fetch';
import { Method, Key, Input, Output } from './helper';

/**
 * HTTP Client for utilizing REST API for Event Espresso
 * It conforms to facade pattern where it abstract REST API complexity by providing a higher level API
 */
class Client {
	private readonly base: string;

	constructor(private readonly username: string, private readonly password: string, private readonly url: Url) {
		this.base = '/wp-json/ee/v4.8.36';
	}

	private makeRequest({
		path,
		method,
		body,
	}: {
		path: string;
		method: 'GET' | 'POST' | 'UPDATE' | 'DELETE';
		body?: BodyInit;
	}): Request {
		const url = this.makeUrl(path);
		const authorization = this.makeBasicAuth();
		const headers = {
			'Content-Type': 'application/json',
			Authorization: authorization,
		} as const;
		const options: RequestInit = {
			method: method,
			headers: headers,
		};
		if (body) {
			options.body = body;
		}
		return new Request(url, options);
	}

	public async makeEntity<S extends Key>(schema: S, params: Input<'POST', S>): Promise<Output<'GET', S>> {
		const method = 'POST';
		const path = this.getRoute(schema);
		const body = this.makeJson(schema, method, params);
		const request = this.makeRequest({
			path,
			method,
			body,
		});
		const response = await this.runRequest(request);
		const json = await this.parseJson(response);
		const data = Schema['GET'][schema].safeParse(json);
		if (data.success) {
			return data.data;
		}
		console.error('Original data:');
		console.error(json);
		throw new Error(data.error.toString());
	}

	public async linkEntity<F extends Key, T extends Key>(
		fromKey: F,
		fromSchema: Output<'GET', F>,
		toKey: T,
		toSchema: Output<'GET', T>
	): Promise<void> {
		const method = 'POST';
		const fromPath = this.getRoute(fromKey);
		const fromId = this.getId(fromKey, fromSchema);
		const toPath = this.getRoute(toKey);
		const toId = this.getId(toKey, toSchema);
		const path = `${fromPath}/${fromId}${toPath}/${toId}`;
		const request = this.makeRequest({
			path,
			method,
		});
		await this.runRequest(request);
	}

	private getId<S extends Key>(key: S, schema: Output<'GET', S>): number {
		if (key === 'Event') {
			return (schema as Output<'GET', 'Event'>)['EVT_ID'];
		}
		if (key === 'Datetime') {
			return (schema as Output<'GET', 'Datetime'>)['DTT_ID'];
		}
		if (key === 'Ticket') {
			return (schema as Output<'GET', 'Ticket'>)['TKT_ID'];
		}
		throw new Error(`Unexpected schema key: ${key}`);
	}

	private getRoute(key: Key): string {
		switch (key) {
			case 'Event':
				return '/events';
			case 'Datetime':
				return '/datetimes';
			case 'Ticket':
				return '/tickets';
			default:
				throw new Error(`Unknown schema key: ${key}`);
		}
	}

	private makeBasicAuth(): string {
		const pair = `${this.username}:${this.password}`;
		const base64 = Buffer.from(pair).toString('base64');
		return `Basic ${base64}`;
	}

	private makeJson<M extends Method, S extends Key>(schema: S, method: M, params: Input<M, S>): string {
		const data = Schema[method][schema].parse(params);
		return JSON.stringify(data);
	}

	private async parseJson(response: Response): Promise<string> {
		const text = await response.textConverted();
		return JSON.parse(text);
	}

	private makeUrl(path: string): string {
		const addFwdSlash = (path: string): string => {
			return path[0] === '/' ? path : '/' + path;
		};
		const addBase = (path: string): string => {
			return path.startsWith(this.base) ? path : this.base + path;
		};
		const addOrigin = (path: string): string => {
			const origin = this.url.getOrigin();
			return path.startsWith(origin) ? origin : origin + path;
		};
		const fnc: R.PipeWithFns<string, string> = [addFwdSlash, addBase, addOrigin];
		const pipe = R.pipeWith((f, res) => f(res));
		return pipe(fnc)(path);
	}

	private async runRequest(request: Request): Promise<Response> {
		const response = await fetch(request);
		if (!response.ok) {
			await this.log(request, response);
			throw new Error('Network failure, see stderr or details above!');
		}
		if (process.env.DEBUG_E2E_HTTP_CLIENT) {
			// if request fails, this branch of code will not be
			// reached so log will *NOT* show up twice
			await this.log(request, response);
		}
		return response;
	}

	private async log(request: Request, response: Response): Promise<void> {
		const reqClone = request.clone();
		const resClone = response.clone();

		const reqBody = await reqClone.textConverted();
		const reqDetails = this.bodyToPrettyJson(reqBody);
		const reqHeaders = Array.from(reqClone.headers.entries())
			.map(([k, v]) => `  ${k} : ${v}`)
			.join('\n');

		const resBody = await resClone.textConverted();
		const resDetails = this.bodyToPrettyJson(resBody);

		console.error('');

		console.error(`username: ${this.username}`);
		console.error(`password: ${this.password}`);

		console.error('');

		console.error(`request url: ${reqClone.url}`);
		console.error(`request headers: \n${reqHeaders}`);
		console.error(`request body: \n${reqDetails}`);

		console.error('');

		console.error(`response url: ${resClone.url}`);
		console.error(`response code: ${resClone.status}`);
		console.error(`response message: ${resClone.statusText}`);
		console.error(`response body: \n${resDetails}`);

		console.error('');
	}

	private bodyToPrettyJson(body: string): string {
		try {
			const json = JSON.parse(body);
			const jsonStr = JSON.stringify(json, undefined, 2);
			// add 2 spaces to the left for each line
			const arr = jsonStr.split('\n').map((v) => `  ${v}`);
			return arr.join('\n');
		} catch (error) {
			// there are no guarantees that response (body) will be json
			return body;
		}
	}
}

export { Client };
