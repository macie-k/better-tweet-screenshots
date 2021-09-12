import React, { useState } from 'react';

import { ThemeProvider } from './hooks/useTheme';
import { SettingsProvider } from './hooks/useSettings';
import { TweetView } from './views/TweetView';
import { InputPage } from './components/InputPage/InputPage';

const DEFAULT_TWEET = 'https://twitter.com/929ell/status/1343331784621256709';
const TWITTER_TOKEN =
    'AAAAAAAAAAAAAAAAAAAAALCNNwEAAAAAO0fvQSwiER9X%2FAFxKChvRxgDGYI%3DoWtrE96FRLO8i9nwNxeypKwG9YgCrYWniLg2cVQLTfIqShqTkB';

export const App = () => {
    const [inputVal, setInputVal] = useState('');
    const [tweet, setTweet] = useState();
    const [active, setActive] = useState(false);

    // user = tweet.user
    // post = tweet.post

    const user = {
        created_at: '2020-09-26T16:03:08.000Z',
        verified: false,
        profile_image_url:
            'https://s.keepmeme.com/files/en_posts/20200906/pepe-the-frog-holding-a-cigarette-meme-5c591359d76727d5e0553b2905883325.jpg',
        id: '1309886201944473600',
        username: 'turkmmtz',
        name: 'Turk',
    };

    const post = {
        timestamp: '2021-06-11T18:15:35.000Z',
        likes: 69696,
        media: [
            'https://pbs.twimg.com/media/E3nvD80UUAEqSaY.jpg',
            'https://pbs.twimg.com/media/E3nvD80VEAE9P1S.jpg',
            'https://pbs.twimg.com/media/E3nvD80VgAAhQRW.jpg',
            'https://pbs.twimg.com/media/E3nvD80UUAM60Fb.jpg',
        ],
    };

    const handleSubmit = async () => {
        const ID = getTweetID(inputVal || DEFAULT_TWEET);
        console.log(`URL: ${ID}`);
        console.log(await fetchTweetData(ID));
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
                <TweetView user={user} post={post} />
            </ThemeProvider>
        </SettingsProvider>
    );
};

async function fetchTweetData(id: string) {
    const endpointURL = 'https://api.twitter.com/2/tweets/'; // api endpoint
    const prefix = 'https://cors.bridged.cc/'; // CORS proxy server
    const params = {
        'tweet.fields': 'created_at,author_id,public_metrics,referenced_tweets', // tweet parameters
        expansions: 'author_id,attachments.media_keys', // additional fields
        'user.fields': 'created_at,profile_image_url,username,verified,name', // user parameters
        'media.fields': 'url,preview_image_url,height,width', // media parameters
    };

    /* build params string to URL-like format ...?param=val&param2=val2 */
    let combinedParams = '';
    for (let p in params) {
        combinedParams += combinedParams === '' ? '?' : '&';
        combinedParams += `${p}=${(params as any)[p]}`;
    }

    /* make request and return response */
    const requestURL = `${prefix}${endpointURL}${id}${combinedParams}`;
    const res = await fetch(requestURL, {
        headers: {
            Authorization: `Bearer ${TWITTER_TOKEN}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.error(err));

    return res;
}

function getTweetID(inputVal: string) {
    const split = inputVal.split('/'); // check if full URL was provided, if yes extract id and set variable

    let id = inputVal; // if input is empty set id to undefined otherwise to its value
    if (split.length > 1) {
        id = split[split.length - 1];
        id = id.split('?')[0];
    }

    return id;
}
