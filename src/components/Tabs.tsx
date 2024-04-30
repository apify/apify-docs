import {
    theme,
} from '@apify-packages/ui-components';
import clsx
    from 'clsx';
import React from 'react';
import styled from 'styled-components';

import {
    Heading
} from "./Heading";

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
        title: string;
        content: React.ReactNode;
    }[];
}

export default function Tabs({ items }: TabsProps) {
    const [activeTab, setActiveTab] = React.useState(0);

    return (<>
        <TabsWrapper>
            {items.map(({ title }, index) => (
                <Heading
                    className={clsx('TabItem', activeTab === index && 'TabItem-active')}
                    size="titleL"
                    onClick={() => setActiveTab(index)}
                >{title}</Heading>
            ))}
        </TabsWrapper>
        {items[activeTab].content}
    </>
    );
}
