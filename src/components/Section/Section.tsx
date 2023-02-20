import React from 'react';
import styles from './styles.module.css';

interface SectionProps {
    heading?: string;
    children: React.ReactNode | string;
}

export default function Section({ heading, children }: SectionProps) {
    return (
        <section className={styles.section}>
            <div className="container">
                {heading && <h2>{heading}</h2>}
                {children}
            </div>
        </section>
    );
}
