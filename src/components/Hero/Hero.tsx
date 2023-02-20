import React from "react";
import clsx from 'clsx';
import styles from "./styles.module.css";

interface HeroProps  {
    heading: string;
    description: React.ReactNode | string;
}

export default function Hero({ heading, description }: HeroProps) {
    return (
        <header className={clsx(styles.heroBanner)}>
            <div className="row padding-horiz--md">
                <div className="col">
                    <div className={clsx(styles.relative, 'row')}>
                        <div className="col">
                            <h1 className={styles.tagline}>{heading}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className={clsx(styles.heroDescription, 'col col--10')}>
                            {description}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}