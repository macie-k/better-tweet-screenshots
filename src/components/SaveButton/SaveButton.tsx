import React from 'react';
import { saveAs } from 'file-saver';

//@ts-ignore
import dom2Img from '../../utils/dom-to-image-scaled'; // modified scale to 2
import styles from './SaveButton.module.scss';

import { SaveIcon } from '../Icons/SaveIcon';
import { Setting } from 'components/Setting/Setting';
import { User, Post } from 'views/TweetView/TweetView';

interface SaveButtonProps {
    post: any;
    tweet: {
        user: User;
        tweet: Post;
    };
}

export const SaveButton = ({ post, tweet }: SaveButtonProps) => {
    return (
        // <div className={styles.container}>
        <Setting
            filled
            icon={<SaveIcon />}
            onClick={async () => await createScreenshot(post, tweet.user.name, tweet.tweet.id)}
        />
        // </div>
    );
};

async function createScreenshot(sourceNode: any, username: string, id: string) {
    await dom2Img
        .toBlob(sourceNode, {
            allTargetStyle: {
                tweetcontainer: {
                    boxShadow: 'none',
                },
            },
        })
        .then(function (blob: any) {
            const name = `${username}_${id}`;
            saveAs(blob, name); // probably "author_name + date" in the future
        })
        .catch(function (error: any) {
            console.error('Something went wrong!: ', error);
        });
}
