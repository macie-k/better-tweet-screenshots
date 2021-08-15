import React from 'react';
import styles from './TweetBodyText.module.scss';

export interface BodyTextProps {
    content?: string;
}

export const TweetBodyText = ({ content }: BodyTextProps) => {
    return <div className={styles.container}>{content}</div>;
};
