import React from 'react';

import styles from './TweetView.module.scss';

import { Container } from '../components/Container/Container';
import { TweetContainer } from '../components/TweetContainer/TweetContainer';
import { TweetHeader } from '../components/TweetHeader/TweetHeader';
import { TweetFooter } from '../components/TweetFooter/TweetFooter';
import { TweetBodyText } from '../components/TweetBodyText/TweetBodyText';
import { TweetMedia } from '../components/TweetMedia/TweetMedia';
import { SettingsBar } from 'components/SettingsBar/SettingsBar';
import { Setting } from 'components/Setting/Setting';

import { ThemeIcon } from '../components/Icons/ThemeIcon';
import { TimestampIcon } from '../components/Icons/TimestampIcon';
import { CornersIcon } from '../components/Icons/CornersIcon';
import { LikesIcon } from '../components/Icons/LikesIcon';

import { useLikes, useRoundedCorners, useTimestamp } from '../hooks/useSettings';
import { useTheme } from 'hooks/useTheme';

const THEMES = ['light', 'dim', 'dark'];

type User = {
    created_at: string;
    verified: boolean;
    profile_image_url: string;
    id: string;
    username: string;
    name: string;
};

type Post = {
    media: Array<any>;
    date: string;
    likes: number;
    text: string;
};

export interface TweetViewProps {
    user: User;
    post: Post;
}

export const TweetView = ({ user, post }: TweetViewProps) => {
    const { theme, setTheme } = useTheme();
    const [likesStyle, toggleLikesStyle] = useLikes();
    const [roundedCorners, toggleRoundedCorners] = useRoundedCorners();
    const [timestampStyle, toggleTimestampStyle] = useTimestamp();

    const getNextTheme = () => {
        const current = THEMES.indexOf(theme.replace('theme-', ''));
        const next = THEMES[(current === THEMES.length - 1 ? 0 : current + 1) as number];
        return next;
    };

    return (
        <Container>
            {user && post ? (
                <TweetContainer theme={theme} style={{ borderRadius: roundedCorners ? '10px' : 0 }}>
                    <TweetHeader
                        verified={user.verified}
                        avatarUrl={user.profile_image_url}
                        username={user.username}
                        displayName={user.name}
                        timestamp={user.created_at}
                    />
                    <TweetBodyText content={post.text} />
                    <TweetMedia media={post.media} />
                    <TweetFooter timestamp={post.date} likes={post.likes} />
                    <div className={styles.settingsBar}>
                        <SettingsBar
                            children={[
                                <Setting
                                    onClick={() => setTheme(getNextTheme())}
                                    icon={<ThemeIcon type={theme} />}
                                />,
                                <Setting
                                    onClick={() => toggleTimestampStyle()}
                                    icon={<TimestampIcon />}
                                />,
                                <Setting
                                    onClick={() => toggleRoundedCorners()}
                                    icon={
                                        <CornersIcon
                                            type={roundedCorners ? 'rounded' : 'squared'}
                                        />
                                    }
                                />,
                                <Setting
                                    onClick={() => toggleLikesStyle()}
                                    icon={<LikesIcon type={likesStyle} />}
                                />,
                            ]}
                        />
                    </div>
                </TweetContainer>
            ) : (
                <></>
            )}
        </Container>
    );
};
