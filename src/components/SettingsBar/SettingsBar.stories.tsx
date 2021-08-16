import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SettingsBar } from './SettingsBar';
import { Setting } from '../Setting/Setting';

import { Corners } from '../Icons/Corners';
import { Likes } from '../Icons/Likes';

export default {
    title: 'Global/SettingsBar',
    component: SettingsBar,
} as ComponentMeta<typeof SettingsBar>;

const Template: ComponentStory<typeof SettingsBar> = (args) => <SettingsBar {...args} />;

export const Main = Template.bind({});
Main.args = {
    children: [
        <Setting icon={<Corners type="rounded" />} />,
        <Setting icon={<Likes type="disabled" />} />,
        <Setting icon={<Corners type="rounded" />} />,
        <Setting icon={<Likes type="disabled" />} />,
    ],
};
