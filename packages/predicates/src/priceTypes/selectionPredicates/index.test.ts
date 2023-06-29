import { isFlatFeeSurcharge, getDefaultPriceModifierType } from './index';
import { PriceBasetype } from '@eventespresso/edtr-services';
import { nodes as priceTypes } from '@eventespresso/edtr-services/src/apollo/queries/priceTypes/test/data';

describe('isFlatFeeSurcharge', () => {
	it('should return true if price type is flat fee surcharge', () => {
		priceTypes.forEach((priceType) => {
			const { isBasePrice, isDiscount, isPercent } = priceType;
			const flatFeeSurcharge = isBasePrice === false && isDiscount === false && isPercent === false;

			expect(isFlatFeeSurcharge(priceType)).toBe(flatFeeSurcharge);
		});
	});

	it('should return false if it is basePrice', () => {
		priceTypes.forEach((priceType) => {
			const { isBasePrice, isDiscount, isPercent } = priceType;
			const basePrice = isBasePrice === true && isDiscount === false && isPercent === false;

			if (basePrice === true) {
				expect(isFlatFeeSurcharge(priceType)).toBe(false);
			}
		});
	});

	it('should return false if it is dollarDiscount', () => {
		priceTypes.forEach((priceType) => {
			const { isBasePrice, isDiscount, isPercent } = priceType;
			const dollarDiscount = isBasePrice === false && isDiscount === true && isPercent === false;

			if (dollarDiscount === true) {
				expect(isFlatFeeSurcharge(priceType)).toBe(false);
			}
		});
	});

	it('should return false if it is percentageSurcharge', () => {
		priceTypes.forEach((priceType) => {
			const { isBasePrice, isDiscount, isPercent } = priceType;
			const percentageSurcharge = isBasePrice === false && isDiscount === false && isPercent === true;

			if (percentageSurcharge === true) {
				expect(isFlatFeeSurcharge(priceType)).toBe(false);
			}
		});
	});

	it('should return false if it is precentageDiscount', () => {
		priceTypes.forEach((priceType) => {
			const { isBasePrice, isDiscount, isPercent } = priceType;
			const precentageDiscount = isBasePrice === false && isDiscount === true && isPercent === true;

			if (precentageDiscount === true) {
				expect(isFlatFeeSurcharge(priceType)).toBe(false);
			}
		});
	});
});

describe('getDefaultPriceModifierType', () => {
	it('should get default price type - SURCHARGE', () => {
		const defaultPriceType = getDefaultPriceModifierType(priceTypes);
		expect(defaultPriceType.baseType).toBe(PriceBasetype.SURCHARGE);
	});

	it('should return null if we pass an empty array', () => {
		const defaultPriceType = getDefaultPriceModifierType([]);
		expect(defaultPriceType).toBeNull();
	});
});
