import React from 'react';

import styles from './Container.module.scss';

export interface ContainerType {
    children: React.ReactNode;
}

export const Container = ({ children }: ContainerType) => {
    return <div className={styles.container}>{children}</div>;
};
