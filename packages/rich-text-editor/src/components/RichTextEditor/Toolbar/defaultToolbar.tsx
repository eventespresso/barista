import {
	AlignCenter,
	AlignJustify,
	AlignLeft,
	AlignRight,
	Code,
	ColorPicker,
	FormatBold,
	FormatItalic,
	FormatListBullets,
	FormatListNumbered,
	FormatUnderline,
	Image,
	Link,
	RemoveFormatting,
	Strikethrough,
	Subscript,
	Superscript,
	Unlink,
} from '@eventespresso/icons';
import { ToolBarConfig } from './types';

export const defaultToolbar: ToolBarConfig = {
	options: [
		'inline',
		'blockType',
		'fontFamily',
		'fontSize',
		'list',
		'textAlign',
		'colorPicker',
		'link',
		// 'emoji',
		'image',
		'remove',
		// 'history',
	],
	inline: {
		items: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
		bold: { icon: FormatBold },
		italic: { icon: FormatItalic },
		underline: { icon: FormatUnderline },
		strikethrough: {
			icon: Strikethrough,
		},
		monospace: { icon: Code },
		superscript: { icon: Superscript },
		subscript: { icon: Subscript },
	},
	blockType: {
		asDropdown: true,
		items: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
	},
	fontSize: {
		asDropdown: true,
		items: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
	},
	fontFamily: {
		asDropdown: true,
		items: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
	},
	list: {
		items: ['unordered', 'ordered'],
		unordered: { icon: FormatListBullets },
		ordered: { icon: FormatListNumbered },
	},
	textAlign: {
		items: ['left', 'center', 'right', 'justify'],
		left: { icon: AlignLeft },
		center: { icon: AlignCenter },
		right: { icon: AlignRight },
		justify: { icon: AlignJustify },
	},
	link: {
		items: ['link', 'unlink'],
		link: { icon: Link },
		unlink: { icon: Unlink },
	},
	image: {
		icon: () => <Image />,
	},
	colorPicker: {
		icon: ColorPicker,
	},
	remove: {
		icon: RemoveFormatting,
	},
};
