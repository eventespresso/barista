import type {
	TabAdapterProps,
	TabsAdapterProps,
	TabListAdapterProps,
	TabPanelAdapterProps,
	TabPanelsAdapterProps,
} from '@eventespresso/adapters';

export interface TabProps extends TabAdapterProps {}

export interface TabsProps extends TabsAdapterProps {
	wrapperClassName?: string;
}

export interface TabListProps extends TabListAdapterProps {}

export interface TabPanelProps extends TabPanelAdapterProps {}

export interface TabPanelsProps extends TabPanelsAdapterProps {}

export type CollapsibleTabProps = {
	icon: React.ReactNode;
	id: string;
	title: React.ReactNode;
};

type CollapsibleTabRenderProps = CollapsibleTabProps & {
	isCollapsed?: boolean;
};

export type CollapsibleTabsProps = Partial<TabsProps> & {
	tabs: Array<CollapsibleTabProps>;
	renderTab?: (props: CollapsibleTabRenderProps) => React.ReactNode;
	renderPanel?: (props: CollapsibleTabRenderProps) => React.ReactNode;
};
