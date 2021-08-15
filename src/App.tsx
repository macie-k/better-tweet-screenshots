import React from 'react';

import { Container } from 'components/Container/Container';
import { TweetHeader } from 'components/TweetHeader/TweetHeader';
import { TweetFooter } from 'components/TweetFooter/TweetFooter';

import { ThemeProvider } from './hooks/useTheme';
import { SettingsProvider } from './hooks/useSettings';

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
                    <TweetHeader
                        verified={user.verified}
                        imgUrl={user.profile_image_url}
                        username={user.username}
                        displayName={user.name}
                        timestamp={user.created_at}
                    />
                    <TweetFooter timestamp={'2021-06-11T18:15:35.000Z'} likes={69000} />
                </Container>
            </ThemeProvider>
        </SettingsProvider>
    );
};
