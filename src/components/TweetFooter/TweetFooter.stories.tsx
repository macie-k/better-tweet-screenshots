import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TweetFooter } from './TweetFooter';
import { TweetContainer } from '../TweetContainer/TweetContainer';

export default {
    title: 'Tweet/TweetFooter',
    component: TweetFooter,
    decorators: [
        (Story, context) => (
            <TweetContainer>
                <Story />
            </TweetContainer>
        ),
    ],
} as ComponentMeta<typeof TweetFooter>;

const Template: ComponentStory<typeof TweetFooter> = (args) => <TweetFooter {...args} />;

export const Main = Template.bind({});
Main.args = {
    timestamp: '2021-06-11T18:15:35.000Z',
    likes: 69000,
};
