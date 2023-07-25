import { Url, Schema } from '@eventespresso/e2e';
import R from 'ramda';
import fetch, { Request, Response, RequestInit } from 'node-fetch';
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

	private createRequest<M extends Method, S extends Key>(
		schema: S,
		method: M,
		subpath: string,
		params: Input<'POST', S>
	): Request {
		const url = this.makeUrl(subpath);
		const body = this.makeJson(schema, method, params);
		const authorization = this.makeBasicAuth();
		const headers = {
			'Content-Type': 'application/json',
			Authorization: authorization,
		} as const;
		const options: RequestInit = {
			method: method,
			headers: headers,
			body: body,
		};
		return new Request(url, options);
	}

	public async makeEntity<S extends Key>(schema: S, params: Input<'POST', S>): Promise<Output<'GET', S>> {
		const path = this.getRoute(schema);
		const request = this.createRequest(schema, 'POST', path, params);
		const response = await this.runRequest(request);
		const json = await this.parseJson(response);
		return Schema['GET'][schema].parse(json);
	}

	private getRoute(key: Key): string {
		switch (key) {
			case 'Event':
				return '/events';
			case 'Datetime':
				return '/datetimes';
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
			const { hostname, protocol, port } = this.url.getAll();
			const origin = `${protocol}://${hostname}:${port}`;
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
