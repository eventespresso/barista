import { execSync } from 'child_process';

async function globalSetup() {
	execSync('yarn docker:cli --env tests plugin activate event-espresso-core barista');
}

export default globalSetup;
