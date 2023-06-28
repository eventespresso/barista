import { omit } from 'ramda';

import {
	getBasePrice,
	getPriceModifiers,
	getTaxes,
	hasPriceModifiers,
	hasPrices,
	isBasePrice,
	isDiscount,
	isNotBasePrice,
	isNotDiscount,
	isNotPercent,
	isNotTax,
	isPercent,
	isPriceField,
	isTax,
} from './index';
import { nodes as prices } from '@eventespresso/edtr-services/src/apollo/queries/prices/test/data';

describe('isBasePrice', () => {
	it('should return true if isBasePrice value is true for each price entity', () => {
		prices.forEach((price) => {
			if (price.isBasePrice === true) {
				expect(isBasePrice(price)).toBe(true);
			}
		});
	});

	it('should return false if isBasePrice value is false for each price entity', () => {
		prices.forEach((price) => {
			if (price.isBasePrice === false) {
				expect(isBasePrice(price)).toBe(false);
			}
		});
	});
});

describe('isNotBasePrice', () => {
	it('should return true if isBasePrice value is false for each price entity', () => {
		prices.forEach((price) => {
			if (price.isBasePrice === false) {
				expect(isNotBasePrice(price)).toBe(true);
			}
		});
	});

	it('should return false if isBasePrice value is true for each price entity', () => {
		prices.forEach((price) => {
			if (price.isBasePrice === true) {
				expect(isNotBasePrice(price)).toBe(false);
			}
		});
	});
});

describe('isDiscount', () => {
	it('should return true if isDiscount value is true for each price entity', () => {
		prices.forEach((price) => {
			if (price.isDiscount === true) {
				expect(isDiscount(price)).toBe(true);
			}
		});
	});

	it('should return false if isDiscount value is false for each price entity', () => {
		prices.forEach((price) => {
			if (price.isDiscount === false) {
				expect(isDiscount(price)).toBe(false);
			}
		});
	});
});

describe('isNotDiscount', () => {
	it('should return true if isDiscount value is false for each price entity', () => {
		prices.forEach((price) => {
			if (price.isDiscount === false) {
				expect(isNotDiscount(price)).toBe(true);
			}
		});
	});

	it('should return false if isDiscount value is true for each price entity', () => {
		prices.forEach((price) => {
			if (price.isDiscount === true) {
				expect(isNotDiscount(price)).toBe(false);
			}
		});
	});
});

describe('isPercent', () => {
	it('should return true if isPercent value is true for each price entity', () => {
		prices.forEach((price) => {
			if (price.isPercent === true) {
				expect(isPercent(price)).toBe(true);
			}
		});
	});

	it('should return false if isPercent value is false for each price entity', () => {
		prices.forEach((price) => {
			if (price.isPercent === false) {
				expect(isPercent(price)).toBe(false);
			}
		});
	});
});

describe('isNotPercent', () => {
	it('should return true if isPercent value is false for each price entity', () => {
		prices.forEach((price) => {
			if (price.isPercent === false) {
				expect(isNotPercent(price)).toBe(true);
			}
		});
	});

	it('should return false if isPercent value is true for each price entity', () => {
		prices.forEach((price) => {
			if (price.isPercent === true) {
				expect(isNotPercent(price)).toBe(false);
			}
		});
	});
});

describe('isTax', () => {
	it('should return true if isTax value is true for each price entity', () => {
		prices.forEach((price) => {
			if (price.isTax === true) {
				expect(isTax(price)).toBe(true);
			}
		});
	});

	it('should return false if isTax value is false for each price entity', () => {
		prices.forEach((price) => {
			if (price.isTax === false) {
				expect(isTax(price)).toBe(false);
			}
		});
	});
});

describe('isNotTax', () => {
	it('should return true if isTax value is false for each price entity', () => {
		prices.forEach((price) => {
			if (price.isTax === false) {
				expect(isNotTax(price)).toBe(true);
			}
		});
	});

	it('should return false if isTax value is true for each price entity', () => {
		prices.forEach((price) => {
			if (price.isTax === true) {
				expect(isNotTax(price)).toBe(false);
			}
		});
	});
});

describe('isPriceField', () => {
	it('should return true if field is included in price type', () => {
		prices.forEach((price) => {
			const priceFields = Object.keys(omit(['__typename'], price));
			priceFields.forEach((field) => {
				expect(isPriceField(null, field)).toBe(true);
			});
		});
	});

	it('should return false if field is NOT included in price type', () => {
		const inexistingFields = ['blablaField', 'yetAnotherFieldProp'];

		inexistingFields.forEach((field) => {
			expect(isPriceField(null, field)).toBe(false);
		});
	});
});

describe('getBasePrice', () => {
	it('should return a price with isBasePrice prop being set to true', () => {
		const basePrice = getBasePrice(prices);
		expect(basePrice.isBasePrice).toBe(true);
	});

	it('should return undefined if there is no base price', () => {
		const filteredPrices = prices.map((price) => ({ ...price, isBasePrice: false }));
		const result = getBasePrice(filteredPrices);
		expect(result).toBeUndefined();
	});
});

describe('getPriceModifiers', () => {
	it('should return prices which have isBasePrice prop set to false', () => {
		const priceModifiers = getPriceModifiers(prices);
		priceModifiers.forEach((priceModifier) => {
			expect(priceModifier.isBasePrice).toBe(false);
		});
	});

	it('should return empty array if there is no price with isBasePrice prop set to false', () => {
		const filteredPrices = prices.map((price) => ({ ...price, isBasePrice: true }));
		const priceModifiers = getPriceModifiers(filteredPrices);
		expect(priceModifiers).toEqual([]);
	});
});

describe('getTaxes', () => {
	it('should return prices which have isTax prop set to true', () => {
		const result = getTaxes(prices);
		result.forEach((price) => {
			expect(price.isTax).toBe(true);
		});
	});

	it('should return empty array if there is no price with isTax prop set to true', () => {
		const filteredPrices = prices.map((price) => ({ ...price, isTax: false }));
		const result = getTaxes(filteredPrices);
		expect(result).toEqual([]);
	});
});

describe('hasPrices', () => {
	it('should return true if prices array contains at least one price entity', () => {
		const result = hasPrices(prices);
		expect(result).toBe(true);
	});

	it('should return false if prices array does not contain any prices', () => {
		const result = hasPrices([]);
		expect(result).toBe(false);
	});
});

describe('hasPriceModifiers', () => {
	it('should return true if prices array contains at least one price modifier', () => {
		const result = hasPriceModifiers(prices);
		expect(result).toBe(true);
	});

	it('should return false if prices array does not contain any price modifiers', () => {
		const filteredPrices = prices.map((price) => ({ ...price, isBasePrice: true }));
		const result = hasPriceModifiers(filteredPrices);
		expect(result).toBe(false);
	});
});
