import { useMemo } from 'react';

import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@eventespresso/adapters';
import { useDisclosure } from '@eventespresso/hooks';
import { Plus, MinusOutlined } from '@eventespresso/icons';

import { IconButton } from '../Button';

import { CollapsibleTabsProps } from './types';

// TODO move inline styles to stylesheet

export const CollapsibleTabs: React.FC<CollapsibleTabsProps> = ({ tabs, renderPanel, renderTab, ...props }) => {
	const { isOpen: isCollapsed, onToggle } = useDisclosure({ defaultIsOpen: true });

	const { tabList, tabPanels } = useMemo(() => {
		return tabs.reduce(
			(prevValue, tabProps) => {
				const tab = (
					<Tab key={tabProps.id} alignItems='flex-start' whiteSpace='nowrap'>
						{renderTab?.({ ...tabProps, isCollapsed }) || (
							<>
								{tabProps.icon}
								{!isCollapsed && tabProps.title}
							</>
						)}
					</Tab>
				);

				const panel = <TabPanel key={tabProps.id}>{renderPanel?.({ ...tabProps, isCollapsed })}</TabPanel>;

				return {
					tabList: [...prevValue.tabList, tab],
					tabPanels: [...prevValue.tabPanels, panel],
				};
			},
			{ tabList: [], tabPanels: [] }
		);
	}, [tabs, renderTab, isCollapsed, renderPanel]);

	const toggle = <IconButton transparentBg borderless icon={isCollapsed ? Plus : MinusOutlined} onClick={onToggle} />;

	return (
		<Tabs orientation='vertical' {...props}>
			<Box d='flex' flexDirection='column'>
				{toggle}
				<TabList alignItems='flex-start'>{tabList}</TabList>
				{toggle}
			</Box>
			<TabPanels>{tabPanels}</TabPanels>
		</Tabs>
	);
};
