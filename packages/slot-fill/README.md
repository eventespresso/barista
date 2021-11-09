# Slot Fill

EE Slot Fill package. This package works similar to Slot Fill from [`@wordpress/components`](https://github.com/WordPress/gutenberg/tree/v11.8.2/packages/components/src/slot-fill) package.

## Usage

At the root of your application, you must render a `SlotFillProvider` which coordinates Slot and Fill rendering.

Then, render a Slot component anywhere in your application, giving it a name.

Any Fill will automatically occupy this Slot space, even if rendered elsewhere in the application.

You can either use the Fill component directly, or a wrapper component type as in the below example to abstract the slot name from consumer awareness.

```jsx
import { SlotFillProvider, Slot, Fill } from '@eventespresso/slot-fill';

const MySlotFillProvider = () => {
	const MySlot = () => (
		<ul>
			<li>
				<Slot name='MySlot' />
			</li>
		</ul>
	);

	MySlot.Content = () => <Fill name='MySlot'>Item</Fill>;

	return (
		<SlotFillProvider>
			<MyPanelSlot />
			<MyPanelSlot.Content />
		</SlotFillProvider>
	);
};
```

There is also `createSlotFill` helper method which was created to simplify the process of matching the corresponding `Slot` and `Fill` components:

```jsx
const { Fill, Slot } = createSlotFill('Toolbar');

const ListItem = () => <Fill>My item</Fill>;

const List = () => (
	<div className='list'>
		<Slot />
	</div>
);
```

A working example can be seen in [NewDateOptions](../edtr-services/src/slots/NewDateOptions.ts).

```tsx
const { Slot: NewDateOptions, Fill: NewDateOption } = createSlotFill('NewDateOptions');
```

Then [AddNewDateUpsell.tsx](../../domains/eventSmart/admin/edtrSlots/src/upsells/AddNewDateUpsell.tsx) from ES domain registers the upsell using `NewDateOption` Fill.

And [NewDateButton.tsx](../../domains/core/admin/eventEditor/src/ui/datetimes/datesList/newDateOptions/NewDateButton.tsx) renders the fills conditionally using `NewDateOptions`

## Props

The `SlotFillProvider` component does not accept any props.

Both `Slot` and `Fill` accept a `name` string prop, where a `Slot` with a given `name` will render the `children` of any associated `Fill`s.

`Slot` also accepts optional `children` function prop, which takes `fills` as a param. It allows to perform additional processing and wrap `fills` conditionally.

_Example_:

```jsx
const Toolbar = ({ isMobile }) => (
	<div className='toolbar'>
		<Slot name='Toolbar'>
			{(fills) => {
				return fills.length > 3 ? <div className='toolbar__mobile-long'>{fills}</div> : fills;
			}}
		</Slot>
	</div>
);
```
