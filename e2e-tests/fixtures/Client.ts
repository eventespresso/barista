import { Url, Schemas } from '@eventespresso/e2e';
import R from 'ramda';
import type { SchemasType } from '@eventespresso/e2e';
import fetch, { Request, RequestInit } from 'node-fetch';

/**
 * HTTP Client for utilizing REST API for Event Espresso
 * It conforms to facade pattern where it abstract REST API complexity by providing a higher level API
 */
class Client {
	private readonly base: string;

	constructor(private readonly username: string, private readonly password: string, private readonly url: Url) {
		this.base = '/wp-json/ee/v4.8.36';
	}

	public async makeEvent(params: SchemasType['Event']['Parameters']): Promise<SchemasType['Event']['Return']> {
		const url = this.makeUrl('/events');
		const body = this.makeJson(params, 'Event');
		const authorization = this.makeBasicAuth();
		const headers = {
			'Content-Type': 'application/json',
			Authorization: authorization,
		} as const;
		const options: RequestInit = {
			method: 'POST',
			headers: headers,
			body: body,
		};
		const request = new Request(url, options);
		return await this.makeRequest(request, 'Event');
	}

	private makeBasicAuth(): string {
		const pair = `${this.username}:${this.password}`;
		const base64 = Buffer.from(pair).toString('base64');
		return `Basic ${base64}`;
	}

	private makeJson<S extends keyof SchemasType>(params: SchemasType[S]['Parameters'], schema: S): string {
		const data = Schemas[schema].parse(params);
		return JSON.stringify(data);
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

	private async makeRequest<S extends keyof SchemasType>(
		request: Request,
		schema: S
	): Promise<SchemasType[S]['Return']> {
		const response = await fetch(request);
		if (!response.ok) {
			const body = await response.textConverted();
			const details = this.bodyToPrettyJson(body);
			console.error(`url: ${response.url}`);
			console.error(`username: ${this.username}`);
			console.error(`password: ${this.password}`);
			console.error(`code: ${response.status}`);
			console.error(`message: ${response.statusText}`);
			console.error(`details: \n ${details}`);
			throw new Error('Network failure, see details above!');
		}
		const json = await response.json();
		return Schemas[schema].parse(json);
	}

	private bodyToPrettyJson(body: string): string {
		try {
			const json = JSON.parse(body);
			return JSON.stringify(json, undefined, 2);
		} catch (error) {
			// there are no guarantees that response (body) will be json
			return body;
		}
	}
}

export { Client };
