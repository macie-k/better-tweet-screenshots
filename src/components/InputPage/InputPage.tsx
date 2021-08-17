import React, { useState } from 'react';
import styles from './InputPage.module.scss';

export interface InputPageProps {
    defaultTweet?: string;
}

export const InputPage = ({ defaultTweet }: InputPageProps) => {
    const [tweetUrl, setTweetUrl] = useState('');

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Better tweet screenshots</h1>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.bottomContainer}>
                <input
                    value={tweetUrl}
                    onChange={(e) => setTweetUrl(e.target.value)}
                    className={styles.input}
                    placeholder={defaultTweet}
                    type="text"
                />
                <button className={styles.loadButton}>
                    <span>LOAD</span>
                </button>
            </div>
        </div>
    );
};
