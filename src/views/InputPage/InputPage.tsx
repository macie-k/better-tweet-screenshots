import React, { useState } from 'react';
import styles from './InputPage.module.scss';
import { cx } from '../../utils/cx';
import { ArrowIcon } from 'components/Icons/ArrowIcon';
import { fetchTweetData, getTweetID, parseTweetInformation } from 'utils/tweetUtils';

const DEFAULT_TWEET = 'https://twitter.com/929ell/status/1343331784621256709';

export interface InputPageProps {
    setTweet: (val: any) => void;
}

export const InputPage = ({ setTweet }: InputPageProps) => {
    const [showInput, setShowInput] = useState(true);
    const [error, setError] = useState(false);
    const [dots, setDots] = useState(false);

    const [inputVal, setInputVal] = useState('');
    const [usedIDs, setUsedIDs] = useState<Record<string, any>>({});

    const handleSubmit = async () => {
        const ID = getTweetID(inputVal || DEFAULT_TWEET);

        /* Don't request same ID twice */

        const TWEET_DATA = usedIDs[ID] ?? (await fetchTweetData(ID));
        if (TWEET_DATA === null) return false;

        setUsedIDs((usedIDs: any) => ({ ...usedIDs, [ID]: TWEET_DATA }));
        const DATA = parseTweetInformation(TWEET_DATA);
        setTweet(DATA);
        return true;
    };

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
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    className={styles.input}
                    placeholder={DEFAULT_TWEET}
                    type="text"
                />
                <button
                    onClick={async () => {
                        setDots(true);
                        const submit = await handleSubmit(); // returns true if succeeded
                        setDots(false);

                        setShowInput(!submit);
                        setError(!submit);
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
