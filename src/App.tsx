import React, { useEffect, useState } from 'react';

import { ThemeProvider } from './hooks/useTheme';
import { SettingsProvider } from './hooks/useSettings';
import { TweetView } from './views/TweetView/TweetView';
import { InputPage } from './views/InputPage/InputPage';

import { fetchTweetData, getTweetID, parseTweetInformation } from './utils/tweetUtils';

const DEFAULT_TWEET = 'https://twitter.com/929ell/status/1343331784621256709';
export const App = () => {
    const [usedIDs, setUsedIDs] = useState<Record<string, any>>({});
    const [inputVal, setInputVal] = useState('');
    const [tweet, setTweet] = useState<any>();

    useEffect(() => {
        console.log(
            '%c Made by: %c https://kazmierczyk.me/',
            'background: linear-gradient(to left bottom, #d16ba5, #cf6fb1, #cb73be, #c678cb, #be7ed7, #b388e2, #a692ec, #999bf4, #8ba9f8, #83b5f9, #82c0f6, #89c9f2); color: #fff;',
            ''
        );
    }, []);

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
        <SettingsProvider>
            <ThemeProvider>
                <InputPage
                    defaultTweet={DEFAULT_TWEET}
                    tweetUrl={inputVal}
                    setTweetUrl={setInputVal}
                    handleSubmit={handleSubmit}
                />
                <TweetView tweet={tweet} />
            </ThemeProvider>
        </SettingsProvider>
    );
};
