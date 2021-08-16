import React from 'react';

import { Container } from 'components/Container/Container';
import { TweetContainer } from 'components/TweetContainer/TweetContainer';
import { TweetHeader } from 'components/TweetHeader/TweetHeader';
import { TweetFooter } from 'components/TweetFooter/TweetFooter';

import { ThemeProvider } from './hooks/useTheme';
import { SettingsProvider } from './hooks/useSettings';
import { TweetBodyText } from 'components/TweetBodyText/TweetBodyText';
import { TweetMedia } from 'components/TweetMedia/TweetMedia';

export const App = () => {
    const user = {
        created_at: '2020-09-26T16:03:08.000Z',
        verified: false,
        profile_image_url:
            'https://pbs.twimg.com/profile_images/1382522642310295554/lnjPz_zj_normal.jpg',
        id: '1309886201944473600',
        username: 'turkmmtz',
        name: 'Turk',
    };

    return (
        <SettingsProvider>
            <ThemeProvider>
                <Container>
                    <TweetContainer>
                        <TweetHeader
                            verified={user.verified}
                            avatarUrl={user.profile_image_url}
                            username={user.username}
                            displayName={user.name}
                            timestamp={user.created_at}
                        />
                        <TweetBodyText content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat" />
                        <TweetMedia
                            srcs={[
                                'https://pbs.twimg.com/media/E3nvD80UUAEqSaY.jpg',
                                'https://pbs.twimg.com/media/E3nvD80VEAE9P1S.jpg',
                                'https://pbs.twimg.com/media/E3nvD80VgAAhQRW.jpg',
                                'https://pbs.twimg.com/media/E3nvD80UUAM60Fb.jpg',
                            ]}
                        />
                        <TweetFooter timestamp={'2021-06-11T18:15:35.000Z'} likes={69000} />
                    </TweetContainer>
                </Container>
            </ThemeProvider>
        </SettingsProvider>
    );
};
