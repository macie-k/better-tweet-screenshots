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
    verified: false,
    avatarUrl: 'https://pbs.twimg.com/profile_images/1382522642310295554/lnjPz_zj_normal.jpg',
    username: 'turkmmtz',
    displayName: 'Turk',
    timestamp: '2020-09-26T16:03:08.000Z',
};
