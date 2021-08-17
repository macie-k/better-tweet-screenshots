import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { InputPage } from './InputPage';

export default {
    title: 'Global/InputPage',
    component: InputPage,
} as ComponentMeta<typeof InputPage>;

const Template: ComponentStory<typeof InputPage> = (args) => <InputPage {...args} />;

export const Main = Template.bind({});
Main.args = {
    defaultTweet: 'https://twitter.com/929ell/status/1343331784621256709',
};
