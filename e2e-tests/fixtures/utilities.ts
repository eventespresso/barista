import { WorkerInfo } from '@playwright/test';

function makeUsername(workerInfo: WorkerInfo): string;
function makeUsername(project: string, workerId: number, parallelIndex: number): string;
function makeUsername(param1: WorkerInfo | string, param2?: number, param3?: number): string {
	const isWorker = typeof param1 === 'object';
	const username = isWorker ? param1.project.name : param1;
	const workerId = isWorker ? param1.workerIndex : param2;
	const parallelId = isWorker ? param1.parallelIndex : param3;
	return `${username}-${workerId}-${parallelId}`;
}

function makeEmail(workerInfo: WorkerInfo): string;
function makeEmail(username: string): string;
function makeEmail(param: WorkerInfo | string): string {
	const postfix = '@e2e-tests.test';
	if (typeof param === 'string') {
		return `${param}${postfix}`;
	}
	if (typeof param === 'object') {
		return `${makeUsername(param)}${postfix}`;
	}
}

// pin password to static string for Basic Auth
function makePassword(): string {
	return 'password';
}

const utilities = {
	makeUsername,
	makeEmail,
	makePassword,
};

export { utilities };
