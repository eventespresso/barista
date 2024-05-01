declare global {
	interface Window {
		/**
		 * Global window object exposed by WordPress
		 * @link https://codex.wordpress.org/Javascript_Reference/wp
		 */
		wp: WordPress.Type;
	}
}

module WordPress {
	export type Type = {
		media?: Media;
	};
}

/**
 * @link https://github.com/WordPress/wordpress-develop/blob/trunk/src/js/_enqueues/wp/media/models.js
 */
export type Media = (...any: any[]) => {
	open: () => void;
	on: (unknown1: string, unknown2: unknown) => void;
	off: (unknown1: string, unknown2: unknown) => void;
	state: () => {
		get: (unknown: string) => {
			first: () => {
				toJSON: () => Record<any, any>;
			};
		};
	};
};

export {};
