import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TweetFooter } from './TweetFooter';

export default {
    title: 'Tweet/TweetFooter',
    component: TweetFooter,
} as ComponentMeta<typeof TweetFooter>;

const Template: ComponentStory<typeof TweetFooter> = (args) => <TweetFooter {...args} />;

export const Main = Template.bind({});
Main.args = {
    timestamp: '2021-06-11T18:15:35.000Z',
    likes: 69000,
};
