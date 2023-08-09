const fakeNow = new Date('%s').valueOf();
Date = class extends Date {
	constructor(...args) {
		if (args.length === 0) {
			super(fakeNow);
		} else {
			super(...args);
		}
	}
};
const __DateNowOffset = fakeNow - Date.now();
const __DateNow = Date.now;
Date.now = () => __DateNow() + __DateNowOffset;
