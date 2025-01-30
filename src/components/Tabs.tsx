import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';

import { theme } from '@apify-packages/ui-library';

import { Heading } from './Heading';

const TabsWrapper = styled.div`
    display: flex;
    gap: 8px;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid ${theme.color.neutral.separatorSubtle};
    margin-bottom: 24px;

    .TabItem {
        color: ${theme.color.neutral.textSubtle};
        padding: ${theme.space.space8};
        cursor: pointer;
    }

    .TabItem-active {
        color: ${theme.color.primary.text};
        border-bottom: 2px solid ${theme.color.primary.action};
    }
`;

interface TabsProps {
    items: {
        title: React.ReactNode;
        content: React.ReactNode;
    }[];
}

export default function Tabs({ items }: TabsProps) {
    const [activeTab, setActiveTab] = React.useState(0);

    return (<>
        <TabsWrapper>
            {items.map(({ title }, index) => (
                <Heading
                    key={title?.toLocaleString()}
                    type="titleS"
                    className={clsx('TabItem', activeTab === index && 'TabItem-active')}
                    onClick={() => setActiveTab(index)}
                >{title}</Heading>
            ))}
        </TabsWrapper>
        {items[activeTab].content}
    </>
    );
}
