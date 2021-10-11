import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TweetBodyText } from './TweetBodyText';
import { TweetContainer } from '../TweetContainer/TweetContainer';

export default {
    title: 'Tweet/TweetBodyText',
    component: TweetBodyText,
    decorators: [
        (Story) => (
            <TweetContainer>
                <Story />
            </TweetContainer>
        ),
    ],
} as ComponentMeta<typeof TweetBodyText>;

const Template: ComponentStory<typeof TweetBodyText> = (args) => <TweetBodyText {...args} />;

export const Main = Template.bind({});
Main.args = {
    content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a augue sed ipsum posuere scelerisque et ac tortor. Vestibulum non neque lobortis, sollicitudin lacus non, cursus nisi. Nam sed velit ac tortor hendrerit varius ac sit amet augue. Fusce mollis vulputate tempor. Nullam rutrum suscipit ante at luctus. Nunc sed sollicitudin nibh. Pellentesque et efficitur nulla. Ut nec blandit est, ac hendrerit libero.',
};
