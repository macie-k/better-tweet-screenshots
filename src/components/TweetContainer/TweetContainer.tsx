import React from 'react';

import styles from './TweetContainer.module.scss';

import { cx } from 'utils';
import { useTheme } from 'hooks/useTheme';

export interface TweetContainerProps {
    style?: {};
    isReferenced?: boolean;
    children: React.ReactNode;
}

export const TweetContainer = ({ style, isReferenced, children }: TweetContainerProps) => {
    const { theme } = useTheme();

    return (
        <div
            data-render-tweetcontainer
            style={style}
            className={cx(styles.container, theme, { reference: isReferenced })}
        >
            {children}
        </div>
    );
};
