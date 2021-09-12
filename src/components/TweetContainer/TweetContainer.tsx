import React from 'react';

import styles from './TweetContainer.module.scss';

import { cx } from 'utils';

export interface TweetContainerProps {
    style: {};
    theme: string;
    children: React.ReactNode;
}

export const TweetContainer = ({ style, theme, children }: TweetContainerProps) => {
    return (
        <div style={style} className={cx(styles.container, theme)}>
            {children}
        </div>
    );
};
