import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Setting } from './Setting';

import { LikesIcon } from '../Icons/LikesIcon';
import { CornersIcon } from '../Icons/CornersIcon';

export default {
    title: 'Global/Setting',
    component: Setting,
} as ComponentMeta<typeof Setting>;

const Template: ComponentStory<typeof Setting> = (args) => <Setting {...args} />;

export const LikesSetting = Template.bind({});
LikesSetting.args = {
    icon: <LikesIcon type="disabled" />,
    onClick: () => {},
};

export const CornersSetting = Template.bind({});
CornersSetting.args = {
    icon: <CornersIcon type="rounded" />,
    onClick: () => {},
};
