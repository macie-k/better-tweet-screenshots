import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { InputTweet } from './InputTweet';

export default {
    title: 'Tweet/InputTweet',
    component: InputTweet,
} as ComponentMeta<typeof InputTweet>;

const Template: ComponentStory<typeof InputTweet> = (args) => <InputTweet {...args} />;

export const Main = Template.bind({});
Main.args = {
    error: false,
    defaultTweet: 'https://twitter.com/929ell/status/1343331784621256709',
    inputVal: '',
    setInputVal: (e: string) => {},
};
