import React, { useState } from 'react';

import { ThemeProvider } from './hooks/useTheme';
import { SettingsProvider } from './hooks/useSettings';
import { TweetView } from './views/TweetView';
import { InputPage } from './components/InputPage/InputPage';

import { fetchTweetData, getTweetID, parseTweetInformation } from './utils/tweetUtils';

const DEFAULT_TWEET = 'https://twitter.com/929ell/status/1343331784621256709';
export const App = () => {
    const [usedIDs, setUsedIDs] = useState({} as any);
    const [inputVal, setInputVal] = useState('');
    const [tweet, setTweet] = useState({} as any);

    const handleSubmit = async () => {
        const ID = getTweetID(inputVal || DEFAULT_TWEET);
        console.log(`ID: ${ID}`);

        /* Don't request same ID twice */
        /* todo: add it to local storage */

        const TWEET_DATA = usedIDs[ID] === undefined ? await fetchTweetData(ID) : usedIDs[ID];
        setUsedIDs((usedIDs: any) => ({ ...usedIDs, [ID]: TWEET_DATA }));
        console.log(usedIDs);

        if (TWEET_DATA !== null) {
            const DATA = parseTweetInformation(TWEET_DATA);
            setTweet(DATA);

            return true;
        } else {
            return false;
        }
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
                <TweetView post={tweet.tweet} user={tweet.user} />
            </ThemeProvider>
        </SettingsProvider>
    );
};
