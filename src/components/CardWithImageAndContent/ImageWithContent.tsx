import React from 'react';

import styles from './styles.module.css';

interface CardWithImageAndContentProps {
    image?: React.ReactNode;
    content: React.ReactNode;
    height?: string;
}

export default function CardWithImageAndContent({ image, content, height }: CardWithImageAndContentProps) {
    return (
        <div className={styles.cardWithImageAndContent} style={{ height }}>
            {image && <div className={styles.cardWithImageAndContentImage}>
                {image}
            </div> }
            <div className={styles.cardWithImageAndContentContent}>
                {content}
            </div>
        </div>
    );
}
