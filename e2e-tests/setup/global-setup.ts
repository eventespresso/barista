import { scaffold } from './scaffold';

async function globalSetup() {
	await scaffold.makeWordPress();
}

export default globalSetup;
