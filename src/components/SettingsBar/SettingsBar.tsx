import React, { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';

import styles from './SettingsBar.module.scss';
import { cx } from '../../utils';

import { Setting } from '../Setting/Setting';
import { SettingsIcon } from '../Icons/SettingsIcon';

export interface SettingsBarProps {
    children: ReactNode;
}

const variants = {
    closed: {
        transition: {
            when: 'afterChildren',
            staggerChildren: 0.1,
        },
        height: '50px',
        transform: 'scale(1)',
        boxShadow: '0 5px 17px rgba(59, 58, 58, 0.15), 0 3px 6px rgba(0, 0, 0, 0.05)',
    },
    open: {
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.1,
        },
        height: '100%',
        boxShadow: '0 5px 17px rgba(59, 58, 58, 0.15), 0 3px 6px rgba(0, 0, 0, 0.05)',
        transform: 'scale(1)',
    },
};

const childVariants = {
    closed: { pointerEvents: 'none', opacity: 0 },
    open: { pointerEvents: 'unset', opacity: 1 },
};

const settingsVariants = {
    closed: { boxShadow: '0 5px 17px rgba(59, 58, 58, 0), 0 3px 6px rgba(0, 0, 0, 0)' },
    open: { boxShadow: '0 5px 17px rgba(59, 58, 58, 0.15), 0 3px 6px rgba(0, 0, 0, 0.05)' },
};

export const SettingsBar = ({ children }: SettingsBarProps) => {
    const [isExpanded, setExpanded] = useState(false);

    return (
        <motion.div
            className={styles.container}
            animate={isExpanded ? 'open' : 'closed'}
            whileHover={{
                transform: isExpanded ? 'scale(1)' : 'scale(1.05)',
                transition: {
                    duration: 0.3,
                    delay: 0.05,
                },
                boxShadow: isExpanded
                    ? '0 5px 17px rgba(59, 58, 58, 0.15), 0 3px 6px rgba(0, 0, 0, 0.05)'
                    : '0 5px 17px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.1)',
            }}
            variants={variants}
        >
            <motion.div
                style={{ width: 50, height: 50, borderRadius: '25px' }}
                variants={settingsVariants}
            >
                <Setting icon={<SettingsIcon />} onClick={() => setExpanded((e) => !e)} />
            </motion.div>
            {React.Children.map(children, (child, i) => (
                <motion.div variants={childVariants}>{child}</motion.div>
            ))}
        </motion.div>
    );
};
