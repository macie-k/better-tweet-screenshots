import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TweetFull } from './TweetFull';
import { TweetContainer } from '../TweetContainer/TweetContainer';

export default {
    title: 'Tweet/TweetFull',
    component: TweetFull,
    decorators: [
        (Story) => (
            <TweetContainer>
                <Story />
            </TweetContainer>
        ),
    ],
} as ComponentMeta<typeof TweetFull>;

const Template: ComponentStory<typeof TweetFull> = (args) => <TweetFull {...args} />;

export const Main = Template.bind({});
Main.args = {
    tweet: {
        tweet: {
            id: '1061672709099307008',
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
