import { InputHTMLAttributes } from 'react';

import type { NumberInputProps } from '@eventespresso/adapters';
import type { SelectProps } from '@eventespresso/ui-components';
import type { AnyObject } from '@eventespresso/utils';

import type { PriceModifierProps, TpcPriceModifier } from '../types';

// 'css' prop conflicts with Chakra UI component props
export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'css' | 'max' | 'min' | 'step'>;
export type FieldValue = string | number | boolean;

type SupportedInputs = 'input' | 'select' | 'textarea';

// remove props that conflict/duplicate InputProps
type ExtraNumbertProps = Omit<NumberInputProps, 'defaultValue' | 'onChange' | 'onChangeValue' | 'value'>;
// remove props that conflict/duplicate InputProps
type ExtraSelectProps = Omit<
	SelectProps,
	| 'color'
	| 'defaultValue'
	| 'height'
	| 'onAbort'
	| 'onAbortCapture'
	| 'onAnimationEnd'
	| 'onAnimationEndCapture'
	| 'onAnimationIteration'
	| 'onAnimationIterationCapture'
	| 'onAnimationStart'
	| 'onAnimationStartCapture'
	| 'onAuxClick'
	| 'onAuxClickCapture'
	| 'onBeforeInput'
	| 'onBeforeInputCapture'
	| 'onChange'
	| 'onChangeValue'
	| 'onBlur'
	| 'onBlurCapture'
	| 'onCanPlay'
	| 'onCanPlayCapture'
	| 'onCanPlayThrough'
	| 'onCanPlayThroughCapture'
	| 'onChangeCapture'
	| 'onClick'
	| 'onClickCapture'
	| 'onCompositionEnd'
	| 'onCompositionEndCapture'
	| 'onCompositionStart'
	| 'onCompositionStartCapture'
	| 'onCompositionUpdate'
	| 'onCompositionUpdateCapture'
	| 'onContextMenu'
	| 'onContextMenuCapture'
	| 'onCopy'
	| 'onCopyCapture'
	| 'onCut'
	| 'onCutCapture'
	| 'onDoubleClick'
	| 'onDoubleClickCapture'
	| 'onDrag'
	| 'onDragCapture'
	| 'onDragEnd'
	| 'onDragEndCapture'
	| 'onDragEnter'
	| 'onDragEnterCapture'
	| 'onDragExit'
	| 'onDragExitCapture'
	| 'onDragLeave'
	| 'onDragLeaveCapture'
	| 'onDragOver'
	| 'onDragOverCapture'
	| 'onDragStart'
	| 'onDragStartCapture'
	| 'onDrop'
	| 'onDropCapture'
	| 'onDurationChange'
	| 'onDurationChangeCapture'
	| 'onEmptied'
	| 'onEmptiedCapture'
	| 'onEncrypted'
	| 'onEncryptedCapture'
	| 'onEnded'
	| 'onEndedCapture'
	| 'onError'
	| 'onErrorCapture'
	| 'onFocus'
	| 'onFocusCapture'
	| 'onGotPointerCapture'
	| 'onGotPointerCaptureCapture'
	| 'onInput'
	| 'onInputCapture'
	| 'onInvalid'
	| 'onInvalidCapture'
	| 'onKeyDown'
	| 'onKeyDownCapture'
	| 'onKeyPress'
	| 'onKeyPressCapture'
	| 'onKeyUp'
	| 'onKeyUpCapture'
	| 'onLoad'
	| 'onLoadCapture'
	| 'onLoadStart'
	| 'onLoadStartCapture'
	| 'onLoadedData'
	| 'onLoadedDataCapture'
	| 'onLoadedMetadata'
	| 'onLoadedMetadataCapture'
	| 'onLostPointerCapture'
	| 'onLostPointerCaptureCapture'
	| 'onMouseDown'
	| 'onMouseDownCapture'
	| 'onMouseEnter'
	| 'onMouseLeave'
	| 'onMouseMove'
	| 'onMouseMoveCapture'
	| 'onMouseOut'
	| 'onMouseOutCapture'
	| 'onMouseOver'
	| 'onMouseOverCapture'
	| 'onMouseUp'
	| 'onMouseUpCapture'
	| 'onPaste'
	| 'onPasteCapture'
	| 'onPause'
	| 'onPauseCapture'
	| 'onPlay'
	| 'onPlayCapture'
	| 'onPlaying'
	| 'onPlayingCapture'
	| 'onPointerCancel'
	| 'onPointerCancelCapture'
	| 'onPointerDown'
	| 'onPointerDownCapture'
	| 'onPointerEnter'
	| 'onPointerEnterCapture'
	| 'onPointerLeave'
	| 'onPointerLeaveCapture'
	| 'onPointerMove'
	| 'onPointerMoveCapture'
	| 'onPointerOut'
	| 'onPointerOutCapture'
	| 'onPointerOver'
	| 'onPointerOverCapture'
	| 'onPointerUp'
	| 'onPointerUpCapture'
	| 'onProgress'
	| 'onProgressCapture'
	| 'onRateChange'
	| 'onRateChangeCapture'
	| 'onReset'
	| 'onResetCapture'
	| 'onScroll'
	| 'onScrollCapture'
	| 'onSeeked'
	| 'onSeekedCapture'
	| 'onSeeking'
	| 'onSeekingCapture'
	| 'onSelect'
	| 'onSelectCapture'
	| 'onStalled'
	| 'onStalledCapture'
	| 'onSubmit'
	| 'onSubmitCapture'
	| 'onSuspend'
	| 'onSuspendCapture'
	| 'onTimeUpdate'
	| 'onTimeUpdateCapture'
	| 'onTouchCancel'
	| 'onTouchCancelCapture'
	| 'onTouchEnd'
	| 'onTouchEndCapture'
	| 'onTouchMove'
	| 'onTouchMoveCapture'
	| 'onTouchStart'
	| 'onTouchStartCapture'
	| 'onTransitionEnd'
	| 'onTransitionEndCapture'
	| 'onVolumeChange'
	| 'onVolumeChangeCapture'
	| 'onWaiting'
	| 'onWaitingCapture'
	| 'onWheel'
	| 'onWheelCapture'
	| 'size'
	| 'value'
	| 'width'
>;

export interface BaseFieldProps<V = FieldValue> extends InputProps, ExtraNumbertProps, ExtraSelectProps {
	'aria-label': string;
	children?: ((props: AnyObject) => React.ReactNode) | React.ReactNode;
	component?: React.ComponentType | SupportedInputs;
	disabled?: boolean;
	format?: (value: V, name: string) => any;
	formatOnBlur?: boolean;
	getValue: () => V;
	name: string;
	parse?: (value: any, name: string) => V;
	setValue: (value: V) => void;
	type: string;
}

export interface UseBaseField extends Omit<BaseFieldProps<FieldValue>, 'aria-label' | 'type'> {}

export interface UsePrice {
	getValue: () => FieldValue;
	setValue: (value: FieldValue) => void;
}

export interface UsePriceAmount extends Pick<PriceFieldProps, 'field' | 'price'> {}

export interface PriceFieldProps
	extends PriceModifierProps,
		Omit<BaseFieldProps<number | string>, 'getValue' | 'setValue' | 'name'> {
	field: keyof TpcPriceModifier;
}

export interface TicketPriceFieldProps
	extends Omit<BaseFieldProps<number>, 'getValue' | 'setValue' | 'name' | 'type'> {}
