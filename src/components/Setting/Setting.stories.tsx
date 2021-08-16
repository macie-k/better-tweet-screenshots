import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Setting } from './Setting';

import { Likes } from '../Icons/Likes';
import { Corners } from '../Icons/Corners';

export default {
    title: 'Global/Setting',
    component: Setting,
} as ComponentMeta<typeof Setting>;

const Template: ComponentStory<typeof Setting> = (args) => <Setting {...args} />;

export const LikesSetting = Template.bind({});
LikesSetting.args = {
    icon: <Likes type="disabled"></Likes>,
    onClick: () => {},
};

export const CornersSetting = Template.bind({});
CornersSetting.args = {
    icon: <Corners type="rounded" />,
    onClick: () => {},
};
