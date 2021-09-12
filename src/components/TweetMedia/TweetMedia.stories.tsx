import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TweetMedia } from './TweetMedia';
import { TweetContainer } from '../TweetContainer/TweetContainer';

export default {
    title: 'Tweet/TweetMedia',
    component: TweetMedia,
    decorators: [
        (Story) => (
            <TweetContainer>
                <Story />
            </TweetContainer>
        ),
    ],
} as ComponentMeta<typeof TweetMedia>;

const Template: ComponentStory<typeof TweetMedia> = (args) => <TweetMedia {...args} />;

export const Main = Template.bind({});
Main.args = {
    media: [
        { url: 'https://pbs.twimg.com/media/E3nvD80UUAEqSaY.jpg' },
        { url: 'https://pbs.twimg.com/media/E3nvD80VEAE9P1S.jpg' },
        { url: 'https://pbs.twimg.com/media/E3nvD80VgAAhQRW.jpg' },
        { url: 'https://pbs.twimg.com/media/E3nvD80UUAM60Fb.jpg' },
    ],
};
