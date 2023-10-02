import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from 'clsx';
import styles from './styles.module.css';

function transformImgClassName(className) {
    return clsx(className, styles.img);
}

export default function MDXImg(props) {
    return (
        <img
            loading="lazy"
            {...props}
            className={transformImgClassName(props.className)}
        />
    );
}
