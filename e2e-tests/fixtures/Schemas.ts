import { z } from 'zod';

const Event = z
	.object({
		name: z.string().optional().default(''),
	})
	.transform((arg) => {
		return {
			EVT_name: arg.name,
		};
	});

const Schemas = {
	Event,
};

type SchemasType = {
	Event: {
		Parameters: z.input<typeof Event>;
		Return: z.output<typeof Event>;
	};
};

export { Schemas };

export type { SchemasType };
