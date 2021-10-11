import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ErrorPopup } from './ErrorPopup';

export default {
    title: 'General/ErrorPopup',
    component: ErrorPopup,
} as ComponentMeta<typeof ErrorPopup>;

const Template: ComponentStory<typeof ErrorPopup> = (args) => <ErrorPopup {...args} />;

export const Main = Template.bind({});
