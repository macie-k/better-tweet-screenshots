import React, { useCallback, useEffect, useState } from 'react';

import styles from './TweetView.module.scss';

import { ReactNode, useRef } from 'react';

import { TweetFull } from 'components/TweetFull/TweetFull';
import { Container } from 'components/Container/Container';
import { TweetContainer } from 'components/TweetContainer/TweetContainer';
import { TweetHeader } from 'components/TweetHeader/TweetHeader';
import { TweetFooter } from 'components/TweetFooter/TweetFooter';
import { TweetBodyText } from 'components/TweetBodyText/TweetBodyText';
import { TweetMedia } from 'components/TweetMedia/TweetMedia';
import { SettingsBar } from 'components/SettingsBar/SettingsBar';
import { Setting } from 'components/Setting/Setting';

import { ThemeIcon } from 'components/Icons/ThemeIcon';
import { TimestampIcon } from 'components/Icons/TimestampIcon';
import { CornersIcon } from 'components/Icons/CornersIcon';
import { LikesIcon } from 'components/Icons/LikesIcon';

import { useLikes, useRoundedCorners, useTimestamp } from 'hooks/useSettings';
import { useTheme } from 'hooks/useTheme';
import { TweetQuote } from 'components/TweetQuote/TweetQuote';
import { SaveButton } from 'components/SaveButton/SaveButton';

const THEMES = ['light', 'dim', 'dark'];

export type User = {
    created_at: string;
    verified: boolean;
    profile_image_url: string;
    id: string;
    username: string;
    name: string;
};

export type Reference = {
    id: string;
    type: string;
};

export type Post = {
    id: string;
    media: Array<any>;
    date: string;
    likes: number;
    text: string;
    reference: Reference;
};

export interface TweetViewProps {
    tweet: {
        user: User;
        tweet: Post;
    };
    children?: ReactNode;
}

const getNextTheme = (theme: string) => {
    const current = THEMES.indexOf(theme.replace('theme-', ''));
    const next = THEMES[current === THEMES.length - 1 ? 0 : current + 1];
    return next;
};

export const TweetView = ({ tweet }: TweetViewProps) => {
    const { theme, setTheme } = useTheme();
    const [likesStyle, toggleLikesStyle] = useLikes();
    const [roundedCorners, toggleRoundedCorners] = useRoundedCorners();
    const [timestampStyle, toggleTimestampStyle] = useTimestamp();

    const [post, setPost] = useState<any>();
    const containerRef = useCallback((node) => {
        setPost(node);
    }, []);

    const hasReference = tweet && tweet.tweet.reference; // todo: probably add different looks for 'quotes' and 'responses'
    return (
        <Container>
            <div ref={containerRef} className={styles.innerContainer}>
                <TweetFull tweet={tweet}>
                    {hasReference ? <TweetQuote tweet={tweet} /> : <></>}
                </TweetFull>
                <div className={styles.settingsBar}>
                    <SaveButton tweet={tweet} post={post} />
                    <SettingsBar>
                        <Setting
                            onClick={() => setTheme(getNextTheme(theme))}
                            icon={<ThemeIcon type={theme} />}
                        />
                        <Setting onClick={toggleTimestampStyle} icon={<TimestampIcon />} />
                        <Setting
                            onClick={toggleRoundedCorners}
                            icon={<CornersIcon type={roundedCorners ? 'rounded' : 'squared'} />}
                        />
                        <Setting
                            onClick={toggleLikesStyle}
                            icon={<LikesIcon type={likesStyle} />}
                        />
                    </SettingsBar>
                </div>
            </div>
        </Container>
    );
};

function saveImage() {}
