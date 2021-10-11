import React, { ReactNode } from 'react';
import styles from './Setting.module.scss';

export interface SettingProps {
    icon: ReactNode;
    onClick?: () => void;
}

export const Setting = ({ icon, onClick }: SettingProps) => {
    return (
        <div className={styles.container} onClick={onClick}>
            {icon}
        </div>
    );
};
