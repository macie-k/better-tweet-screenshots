import React, { ReactNode } from 'react';
import { cx } from 'utils';
import styles from './Setting.module.scss';

export interface SettingProps {
    filled?: boolean;
    icon: ReactNode;
    onClick?: () => void;
}

export const Setting = ({ filled, icon, onClick }: SettingProps) => {
    return (
        <div className={cx(styles.container, { [styles.filled]: filled })} onClick={onClick}>
            {icon}
        </div>
    );
};
