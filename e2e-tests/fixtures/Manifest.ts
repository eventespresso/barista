import { z } from 'zod';
import { constants } from '@eventespresso/e2e';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import R from 'ramda';

class Manifest {
	private data: Schema;
	public readonly path: string;

	constructor(project: string) {
		const name = this.sanitizeName(project);
		const path = this.makeManifestPath(name);
		this.data = existsSync(path) ? this.load(path) : this.makeDefaultData(project);
		this.path = path;
	}

	private makeDefaultData(project: string): Schema {
		return {
			project: this.sanitizeName(project),
			path: this.makeContainerPath(project),
		};
	}

	public get project(): string {
		return this.data.project;
	}

	public set url(url: string) {
		this.data = this.schema.parse({ ...this.data, url });
	}

	/**
	 * Make given string compatible with Linux/Unix filesystems
	 * by replacing spaces with dashes and removing special characters
	 */
	private sanitizeName(raw: string): string {
		const lowerCase = (input: string): string => {
			return input.toLowerCase();
		};
		const spacesToDashes = (input: string): string => {
			return input.replaceAll(' ', '-');
		};
		const stripIllegalChars = (input: string): string => {
			return input.replaceAll(/[^\w\-\d]/g, '');
		};
		const fnc: R.PipeWithFns<string, string> = [lowerCase, spacesToDashes, stripIllegalChars];
		const pipe = R.pipeWith((f, res) => f(res));
		return pipe(fnc)(raw);
	}

	private makeManifestPath(project: string): string {
		const base = constants.locations.manifests;
		const file = `${project}.json`;
		return resolve(base, file);
	}

	private makeContainerPath(project: string): string {
		const base = constants.locations.containers;
		return resolve(base, project);
	}

	public save(): void {
		writeFileSync(this.path, this.makeJson(this.data));
	}

	private makeJson(obj: object): string {
		return JSON.stringify(obj, undefined, 2);
	}

	private load(path: string): Schema {
		const raw = readFileSync(path).toString();
		const json = JSON.parse(raw);
		return this.schema.parse(json);
	}

	private get schema() {
		return z.object({
			project: z
				.string()
				.transform((p) => this.sanitizeName(p))
				.describe('DDEV project name'),
			path: z.string().describe('local path to DDEV project'),
			// url can be obtained only at runtime hence optional
			url: z
				.string()
				.url()
				.optional()
				.transform((u) => {
					if (!u) return u;
					// make sure there is NO trailing slash
					return u[u.length - 1] !== '/' ? u : u.slice(-1);
				})
				.describe('Value of DDEV_PRIMARY_URL'),
		});
	}
}

type Schema = z.infer<Manifest['schema']>;

export { Manifest };
