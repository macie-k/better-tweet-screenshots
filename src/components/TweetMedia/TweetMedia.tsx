import React from 'react';
import styles from './TweetMedia.module.scss';

import { cx } from '../../utils';

export interface TweetMediaProps {
    media: Array<any>;
}

export const TweetMedia = ({ media }: TweetMediaProps) => {
    switch (media.length) {
        case 0:
            return null;
        case 1:
            return (
                <div className={cx(styles.media, styles.media1)}>
                    <img draggable="false" className={styles.cropped} src={media[0].url} />
                </div>
            );
        case 2:
            return (
                <div className={cx(styles.media, styles.media2)}>
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
                <div className={cx(styles.media, styles.media3)}>
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
                <div className={cx(styles.media, styles.media4)}>
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
            throw 'Incorrect media amount';
    }
};
