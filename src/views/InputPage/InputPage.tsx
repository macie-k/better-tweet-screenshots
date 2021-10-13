import React, { useEffect, useState } from 'react';
import styles from './InputPage.module.scss';
import { cx } from '../../utils/cx';
import { ArrowIcon } from 'components/Icons/ArrowIcon';
import { fetchTweetData, getTweetID, parseTweetInformation } from 'utils/tweetUtils';

const DEFAULT_TWEET = 'https://twitter.com/929ell/status/1343331784621256709';

export interface InputPageProps {
    setTweet: (val: any) => void;
    urlID?: string;
}

export const InputPage = ({ setTweet, urlID }: InputPageProps) => {
    const [showInput, setShowInput] = useState(true);
    const [error, setError] = useState(false);
    const [dots, setDots] = useState(false);

    const [inputVal, setInputVal] = useState('');
    const [usedIDs, setUsedIDs] = useState<Record<string, any>>({});

    useEffect(() => {
        if (urlID) {
            setInputVal(urlID);
            handleSubmit(urlID);
        }
    }, [urlID]);

    const handleSubmit = async (id?: string) => {
        let status = true;
        setDots(true);

        const ID = id || getTweetID(inputVal || DEFAULT_TWEET);

        /* Don't request same ID twice */
        const TWEET_DATA = usedIDs[ID] ?? (await fetchTweetData(ID));
        if (TWEET_DATA === null) {
            status = false;
        } else {
            setUsedIDs((usedIDs: any) => ({ ...usedIDs, [ID]: TWEET_DATA }));
            const DATA = parseTweetInformation(TWEET_DATA);
            setTweet(DATA);
        }

        setDots(false);
        setShowInput(!status);
        setError(!status);
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
                    onClick={() => {
                        handleSubmit();
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
