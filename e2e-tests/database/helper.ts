import { z } from 'zod';
import { Schema } from '@eventespresso/e2e';

// HTTP method
export type Method = keyof typeof Schema;

// Actual schema after we obtain HTTP method
export type Key = keyof typeof Schema[Method];

export type Input<M extends Method, K extends Key> = z.input<typeof Schema[M][K]>;

export type Output<M extends Method, K extends Key> = z.output<typeof Schema[M][K]>;
