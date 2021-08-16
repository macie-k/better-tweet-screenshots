import React from 'react';

import styles from './TweetContainer.module.scss';

import { useTheme } from 'hooks/useTheme';
import { cx } from 'utils';

export interface TweetContainerProps {
    children: React.ReactNode;
}

export const TweetContainer = ({ children }: TweetContainerProps) => {
    const { theme } = useTheme();

    return <div className={cx(styles.container, theme)}>{children}</div>;
};
