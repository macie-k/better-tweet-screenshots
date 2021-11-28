import React, { useEffect, useState } from 'react';
import styles from './InputPage.module.scss';

import { fetchTweetData, getTweetID, parseTweetInformation } from 'utils/tweetUtils';
import { InputTweet } from 'components/InputTweet/InputTweet';
import { Setting } from 'components/Setting/Setting';

import { CoffeeIcon } from 'components/Icons/CoffeeIcon';
import { SearchIcon } from 'components/Icons/SearchIcon';
import { cx } from 'utils';

const DEFAULT_TWEET = 'https://twitter.com/929ell/status/1343331784621256709';

export interface InputPageProps {
    setTweet: (val: any) => void;
    urlID?: string;
}

export const redirect = (url: string) => {
    window.open(url, '_blank');
};

export const InputPage = ({ setTweet, urlID }: InputPageProps) => {
    const [showInput, setShowInput] = useState(true);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [inputVal, setInputVal] = useState('');
    const [usedIDs, setUsedIDs] = useState<Record<string, any>>({});

    useEffect(() => {
        if (urlID) {
            setInputVal(urlID);
            handleSubmit(urlID);
        }
    }, [urlID]);

    const handleSubmit = async (id?: string) => {
        setLoading(true);
        let status = true;
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

        setTimeout(() => {
            setShowInput(!status);
            setError(!status);
            setLoading(false);
        }, 500);
    };

    return (
        <div className={cx(styles.container, { [styles.hide]: !showInput })}>
            <div className={styles.innerContainer}>
                <InputTweet
                    loading={loading}
                    error={error}
                    defaultTweet={DEFAULT_TWEET}
                    inputVal={inputVal}
                    setInputVal={setInputVal}
                />
                <div className={styles.bubbles}>
                    <Setting
                        icon={<CoffeeIcon />}
                        onClick={() => redirect('https://bit.ly/bts-bmc')}
                    />
                    <Setting
                        icon={<SearchIcon />}
                        onClick={() => {
                            handleSubmit();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
