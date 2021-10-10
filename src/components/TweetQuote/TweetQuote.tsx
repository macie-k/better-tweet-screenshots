import React, { useState, useEffect } from 'react';

import styles from './TweetQuote.module.scss';

import { TweetViewProps } from '../../views/TweetView/TweetView';
import { fetchTweetData, parseTweetInformation } from '../../utils/tweetUtils';
import { TweetFull } from 'components/TweetFull/TweetFull';

import { TweetContainer } from 'components/TweetContainer/TweetContainer';
import { TweetHeader } from 'components/TweetHeader/TweetHeader';
import { TweetFooter } from 'components/TweetFooter/TweetFooter';
import { TweetBodyText } from 'components/TweetBodyText/TweetBodyText';
import { TweetMedia } from 'components/TweetMedia/TweetMedia';

import { User, Post } from 'views/TweetView/TweetView';

type TweetQuote = {
    user: User;
    tweet: Post;
};

export const TweetQuote = ({ tweet }: TweetViewProps) => {
    const [refData, setRefData] = useState<TweetQuote>();

    useEffect(() => {
        (async () => {
            const DATA = await fetchTweetData(tweet.tweet.reference.id);
            const PARSED = parseTweetInformation(DATA);
            setRefData(PARSED);
        })();
    }, []);

    if (!refData) return null;
    const user = refData.user;
    const post = refData.tweet;
    return (
        <div className={styles.container}>
            {/* <TweetFull isReferenced={true} tweet={parseTweetInformation(refData)} /> */}
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
