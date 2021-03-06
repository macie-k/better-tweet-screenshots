import React, { ReactNode } from 'react';

import { TweetContainer } from 'components/TweetContainer/TweetContainer';
import { TweetHeader } from 'components/TweetHeader/TweetHeader';
import { TweetFooter } from 'components/TweetFooter/TweetFooter';
import { TweetBodyText } from 'components/TweetBodyText/TweetBodyText';
import { TweetMedia } from 'components/TweetMedia/TweetMedia';

import { useRoundedCorners } from 'hooks/useSettings';
import { User, Post } from 'views/TweetView/TweetView';

export interface TweetFullProps {
    tweet: {
        user: User;
        tweet: Post;
    };
    children?: ReactNode;
}

export const TweetFull = ({ tweet, children }: TweetFullProps) => {
    const [roundedCorners] = useRoundedCorners();

    if (!tweet) return null;

    const user = tweet.user;
    const post = tweet.tweet;
    return (
        <TweetContainer style={{ borderRadius: roundedCorners ? '10px' : 0 }}>
            <TweetHeader
                verified={user.verified}
                avatarUrl={user.profile_image_url}
                username={user.username}
                displayName={user.name}
                timestamp={user.created_at}
            />
            <TweetBodyText content={post.text} />
            <TweetMedia media={post.media} />
            {children}
            <TweetFooter timestamp={post.date} likes={post.likes} />
        </TweetContainer>
    );
};
