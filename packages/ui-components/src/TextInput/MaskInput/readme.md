# MaskInput Usage Examples

Here are some examples of how to use the `MaskInput` component:

-   Phone Number:
    `<MaskInput label="Phone Number" name="phonenumber" mask="(999) 999-9999" />`

-   Credit Card Number:
    `<MaskInput label="Credit Card Number" name="creditCardNumber" mask="9999 9999 9999 9999" />`
-   Credit Card Date:
    `<MaskInput label="Credit Card Date" name="creditcardDate" mask="99/99" />`

## In more detail (e.g., Credit Card Number)

Here's an example of using the `MaskInput` component for a credit card number input field in a React component:

```tsx
import React, { useState, useCallback } from 'react';
import { MaskInput } from './MaskInput';

const MyComponent = () => {
	const [creditCardValue, setCreditCardValue] = useState < string > '';
	const handleCreditCardChange = useCallback<TextInputProps['onChange']>(
		(event) => setCreditCardValue(event.target.value),
		[]
	);

	return (
		<MaskInput
			label='Credit Card Number'
			id='credit-card-number'
			name='creditCardNumber'
			value={creditCardNumber}
			onChange={handleCreditCardNumberChange}
			mask='9999 9999 9999 9999'
		/>
	);
};
```
