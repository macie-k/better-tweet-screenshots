import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TweetQuote } from './TweetQuote';

export default {
    title: 'Tweet/TweetQuote',
    component: TweetQuote,
} as ComponentMeta<typeof TweetQuote>;

const Template: ComponentStory<typeof TweetQuote> = (args) => <TweetQuote {...args} />;

export const Main = Template.bind({});
Main.args = {
    tweet: {
        tweet: {
            media: [],
            likes: 1,
            date: '2021-09-16T12:32:41.000Z',
            text: '@MichaelBetPhoto EXCUSE ME???🤯🤯🤯🤯',
            reference: {
                id: '1438479719809302540',
                type: 'quote',
            },
        },
        user: {
            name: 'Antonio Montana',
            profile_image_url:
                'https://pbs.twimg.com/profile_images/1425291130279809027/Yw_Mdd-o_normal.jpg',
            username: 'tonyvonarte',
            id: '1061672709099307008',
            created_at: '2018-11-11T17:31:13.000Z',
            verified: false,
        },
    },
};
