import React from 'react';
import styles from './TweetMedia.module.scss';

import { cx } from '../../utils';

export interface TweetMediaProps {
    media: Array<any>;
    isReferenced?: boolean;
}

export const TweetMedia = ({ media, isReferenced }: TweetMediaProps) => {
    switch (media.length) {
        case 0:
            return null;
        case 1:
            return (
                <div
                    className={cx(
                        { [styles.reference]: isReferenced },
                        styles.media,
                        styles.media1,
                        styles.cropped
                    )}
                >
                    <img
                        alt="Tweet media"
                        draggable="false"
                        src={media[0].url || media[0].preview_image_url}
                    />
                </div>
            );
        case 2:
            return (
                <div
                    className={cx(
                        { [styles.reference]: isReferenced },
                        styles.media,
                        styles.media2
                    )}
                >
                    <div
                        style={{ backgroundImage: `url(${media[0].url})` }}
                        className={cx(styles.mediaContent, styles.left)}
                    ></div>
                    <div
                        style={{ backgroundImage: `url(${media[1].url})` }}
                        className={cx(styles.mediaContent, styles.right)}
                    ></div>
                </div>
            );
        case 3:
            return (
                <div
                    className={cx(
                        { [styles.reference]: isReferenced },
                        styles.media,
                        styles.media3
                    )}
                >
                    <div
                        style={{ backgroundImage: `url(${media[0].url})` }}
                        className={cx(styles.mediaContent, styles.left)}
                    ></div>
                    <div className={styles.right}>
                        <div
                            style={{ backgroundImage: `url(${media[1].url})` }}
                            className={cx(styles.mediaContent, styles.top)}
                        ></div>
                        <div
                            style={{ backgroundImage: `url(${media[2].url})` }}
                            className={cx(styles.mediaContent, styles.bottom)}
                        ></div>
                    </div>
                </div>
            );
        case 4:
            return (
                <div
                    className={cx(
                        { [styles.reference]: isReferenced },
                        styles.media,
                        styles.media4
                    )}
                >
                    <div className={styles.left}>
                        <div
                            style={{ backgroundImage: `url(${media[0].url})` }}
                            className={cx(styles.mediaContent, styles.top)}
                        ></div>
                        <div
                            style={{ backgroundImage: `url(${media[1].url})` }}
                            className={cx(styles.mediaContent, styles.bottom)}
                        ></div>
                    </div>
                    <div className={styles.right}>
                        <div
                            style={{ backgroundImage: `url(${media[2].url})` }}
                            className={cx(styles.mediaContent, styles.top)}
                        ></div>
                        <div
                            style={{ backgroundImage: `url(${media[3].url})` }}
                            className={cx(styles.mediaContent, styles.bottom)}
                        ></div>
                    </div>
                </div>
            );
        default:
            throw new Error('Incorrect media amount');
    }
};
