import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { InputPage } from './InputPage';

export default {
    title: 'General/InputPage',
    component: InputPage,
} as ComponentMeta<typeof InputPage>;

const Template: ComponentStory<typeof InputPage> = (args) => <InputPage {...args} />;

export const Main = Template.bind({});
