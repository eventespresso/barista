// LATER: some repeating with existing type
// packages/ui-components/src/MoneyInputWrapper/types.ts

export interface CurrencyDisplayProps {
	className?: string;
	sign?: string;
	signB4?: boolean;
	value: number | string; // formatted value
	vertical?: boolean;
}
