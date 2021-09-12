import React, { useState } from 'react';
import styles from './InputPage.module.scss';
import { cx } from '../../utils/cx';
import { ArrowIcon } from 'components/Icons/ArrowIcon';

export interface InputPageProps {
    defaultTweet?: string;
    handleSubmit: () => Promise<boolean>;

    tweetUrl: string;
    setTweetUrl: (val: string) => void;
}

export const InputPage = ({
    defaultTweet,
    tweetUrl,
    setTweetUrl,
    handleSubmit,
}: InputPageProps) => {
    const [showInput, setShowInput] = useState(true);
    const [error, setError] = useState(false);
    const [dots, setDots] = useState(false);

    return (
        <div
            className={cx(
                styles.container,
                { [styles.hidden]: !showInput },
                { [styles.error]: error }
            )}
        >
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
                <button
                    onClick={async () => {
                        setDots(true);
                        const submit = !(await handleSubmit()); // returns true if succeeded
                        setDots(false);

                        setShowInput(submit);
                        setError(submit);
                    }}
                    className={cx(styles.loadButton, { [styles.dots]: dots })}
                >
                    <span>{error ? 'TRY AGAIN' : 'LOAD'}</span>
                </button>
            </div>
            <div
                onClick={() => setShowInput(true)}
                className={cx(styles.topArrow, { [styles.visible]: !showInput })}
            >
                <ArrowIcon />
            </div>
        </div>
    );
};
