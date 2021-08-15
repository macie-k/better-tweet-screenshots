import React from 'react';

import styles from './Container.module.scss';

import { useTheme } from 'hooks/useTheme';
import { cx } from 'utils';

export interface ContainerProps {
    children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
    const { theme } = useTheme();
    return <div className={cx(styles.container, theme)}>{children}</div>;
};
