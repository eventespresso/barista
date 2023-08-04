import process from 'process';
import { MakeConfig } from './MakeConfig';
import { MakeEnv } from './MakeEnv';

const args = process.argv;

const makeConfig = new MakeConfig();

if (args.includes('make-config')) {
	makeConfig.parseCliArgs();
}

if (args.includes('make-env')) {
	new MakeEnv(makeConfig).parseCliArgs();
}
