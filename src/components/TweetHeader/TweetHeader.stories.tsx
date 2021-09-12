import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TweetHeader } from './TweetHeader';
import { TweetContainer } from '../TweetContainer/TweetContainer';

export default {
    title: 'Tweet/TweetHeader',
    component: TweetHeader,
    decorators: [
        (Story, context) => (
            <TweetContainer>
                <Story />
            </TweetContainer>
        ),
    ],
} as ComponentMeta<typeof TweetHeader>;

const Template: ComponentStory<typeof TweetHeader> = (args) => <TweetHeader {...args} />;

export const Main = Template.bind({});
Main.args = {
    compact: false,
    verified: true,
    avatarUrl: 'https://pbs.twimg.com/profile_images/893156473655578624/gXfD1I6u_400x400.jpg',
    username: 'maciek_psd',
    displayName: 'maciek',
    timestamp: '2020-09-26T16:03:08.000Z',
};
