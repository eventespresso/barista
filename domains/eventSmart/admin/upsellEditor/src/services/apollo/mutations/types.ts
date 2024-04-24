import type { Entity } from '@eventespresso/data';
import type { EntityId } from '@eventespresso/constants';
import type { UpsellAd } from '../types';

export interface UpsellAdBaseInput extends Omit<UpsellAd, keyof Entity> {}

export interface UpdateUpsellAdInput extends UpsellAdBaseInput {
	id?: EntityId;
}

export interface UpsellAdCommonInput extends UpdateUpsellAdInput {}

export type UpsellAdMutationResult = {
	espressoUpsellAd: UpsellAd;
};

export type UpdateUpsellAdResult = {
	updateEspressoUpsellAd: UpsellAdMutationResult;
};
