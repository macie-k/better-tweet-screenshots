import React, { useEffect, useState } from 'react';

import { ThemeProvider } from './hooks/useTheme';
import { SettingsProvider } from './hooks/useSettings';
import { TweetView } from './views/TweetView/TweetView';
import { InputPage } from './views/InputPage/InputPage';

export const App = () => {
    const [tweet, setTweet] = useState<any>();

    useEffect(() => {
        console.log(
            '%c Made by: %c https://kazmierczyk.me/',
            'background: linear-gradient(to left bottom, #d16ba5, #cf6fb1, #cb73be, #c678cb, #be7ed7, #b388e2, #a692ec, #999bf4, #8ba9f8, #83b5f9, #82c0f6, #89c9f2); color: #fff;',
            ''
        );
    }, []);

    return (
        <SettingsProvider>
            <ThemeProvider>
                <InputPage setTweet={setTweet} />
                <TweetView tweet={tweet} />
            </ThemeProvider>
        </SettingsProvider>
    );
};
