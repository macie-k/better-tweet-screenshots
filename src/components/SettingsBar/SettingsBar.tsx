import React, { Children, ReactNode, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';

import styles from './SettingsBar.module.scss';
import { cx } from '../../utils';

import { Setting } from '../Setting/Setting';
import { SettingsIcon } from '../Icons/SettingsIcon';

export interface SettingsBarProps {
    children: ReactNode;
}

const childVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
};

const settingsVariants = {
    closed: { boxShadow: '0 5px 17px rgba(59, 58, 58, 0), 0 3px 6px rgba(0, 0, 0, 0)' },
    open: { boxShadow: '0 5px 17px rgba(59, 58, 58, 0.1), 0 3px 6px rgba(0, 0, 0, 0.05)' },
};

export const SettingsBar = ({ children }: SettingsBarProps) => {
    const [isExpanded, setExpanded] = useState(false);

    const childrenAmount = Children.toArray(children).length;
    const size = (childrenAmount + 1) * 50 + childrenAmount * 10 + 'px';

    const desktop = useMediaQuery({ query: '(min-width: 775px)' });
    const variants = {
        closed: {
            transition: {
                delay: 0.1,
                when: 'afterChildren',
                staggerChildren: 0.05,
            },
            height: '50px',
            width: '50px',
            transform: 'scale(1)',
            boxShadow: '0 5px 17px rgba(59, 58, 58, 0.15), 0 3px 6px rgba(0, 0, 0, 0.05)',
        },
        open: {
            transition: {
                delay: 0.1,
                when: 'beforeChildren',
                staggerChildren: 0.05,
            },
            height: desktop ? size : '50px',
            width: desktop ? '50px' : size,
            boxShadow: '0 5px 17px rgba(59, 58, 58, 0.15), 0 3px 6px rgba(0, 0, 0, 0.05)',
            transform: 'scale(1)',
        },
    };

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
                <motion.div
                    key={i}
                    className={cx(styles.setting, { [styles.hidden]: !isExpanded })}
                    variants={childVariants}
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
};
