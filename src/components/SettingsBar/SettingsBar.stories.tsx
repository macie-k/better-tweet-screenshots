import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SettingsBar } from './SettingsBar';
import { Setting } from '../Setting/Setting';

import { ThemeIcon } from '../Icons/ThemeIcon';
import { TimestampIcon } from '../Icons/TimestampIcon';
import { CornersIcon } from '../Icons/CornersIcon';
import { LikesIcon } from '../Icons/LikesIcon';

export default {
    title: 'Global/SettingsBar',
    component: SettingsBar,
} as ComponentMeta<typeof SettingsBar>;

const Template: ComponentStory<typeof SettingsBar> = (args) => <SettingsBar {...args} />;

export const Main = Template.bind({});
Main.args = {
    children: [
        <Setting icon={<ThemeIcon type="light" />} />,
        <Setting icon={<TimestampIcon />} />,
        <Setting icon={<CornersIcon type="rounded" />} />,
        <Setting icon={<LikesIcon type="disabled" />} />,
    ],
};
