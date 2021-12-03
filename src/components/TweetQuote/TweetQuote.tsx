import React, { useState, useEffect } from 'react';

import styles from './TweetQuote.module.scss';

import { fetchTweetData, parseTweetInformation } from '../../utils/tweetUtils';

import { TweetHeader } from 'components/TweetHeader/TweetHeader';
import { TweetBodyText } from 'components/TweetBodyText/TweetBodyText';
import { TweetMedia } from 'components/TweetMedia/TweetMedia';

import { User, Post } from 'views/TweetView/TweetView';

type QuoteFormat = {
    user: User;
    tweet: Post;
};

export interface TweetQuoteProps {
    tweet: {
        user: User;
        tweet: Post;
    };
}

export const TweetQuote = ({ tweet }: TweetQuoteProps) => {
    const [refData, setRefData] = useState<QuoteFormat>();

    useEffect(() => {
        (async () => {
            const DATA = await fetchTweetData(tweet.tweet.reference.id);
            const PARSED = parseTweetInformation(DATA);
            setRefData(PARSED);
        })();
    }, [tweet.tweet.reference.id]);

    if (!refData) return null;
    const user = refData.user;
    const post = refData.tweet;
    return (
        <div className={styles.container}>
            <TweetHeader
                compact={true}
                verified={user.verified}
                avatarUrl={user.profile_image_url}
                username={user.username}
                displayName={user.name}
                timestamp={user.created_at}
            />
            <TweetBodyText compact={true} content={post.text} />
            <TweetMedia isReferenced={true} media={post.media} />
        </div>
    );
};
