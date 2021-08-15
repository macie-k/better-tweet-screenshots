import React from 'react';
import styles from './TweetMedia.module.scss';

import { cx } from '../../utils';

export interface TweetMediaProps {
    srcs: Array<string>;
}

export const TweetMedia = ({ srcs }: TweetMediaProps) => {
    switch (srcs.length) {
        case 0:
            return null;
        case 1:
            return (
                <div className={cx(styles.media, styles.media1)}>
                    <img className={styles.cropped} src={srcs[0]} />
                </div>
            );
        case 2:
            return (
                <div className={cx(styles.media, styles.media2)}>
                    <div
                        style={{ backgroundImage: `url(${srcs[0]})` }}
                        className={cx(styles.mediaContent, styles.left)}
                    ></div>
                    <div
                        style={{ backgroundImage: `url(${srcs[1]})` }}
                        className={cx(styles.mediaContent, styles.right)}
                    ></div>
                </div>
            );
        case 3:
            return (
                <div className={cx(styles.media, styles.media3)}>
                    <div
                        style={{ backgroundImage: `url(${srcs[0]})` }}
                        className={cx(styles.mediaContent, styles.left)}
                    ></div>
                    <div className={styles.right}>
                        <div
                            style={{ backgroundImage: `url(${srcs[1]})` }}
                            className={cx(styles.mediaContent, styles.top)}
                        ></div>
                        <div
                            style={{ backgroundImage: `url(${srcs[2]})` }}
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
                            style={{ backgroundImage: `url(${srcs[0]})` }}
                            className={cx(styles.mediaContent, styles.top)}
                        ></div>
                        <div
                            style={{ backgroundImage: `url(${srcs[1]})` }}
                            className={cx(styles.mediaContent, styles.bottom)}
                        ></div>
                    </div>
                    <div className={styles.right}>
                        <div
                            style={{ backgroundImage: `url(${srcs[2]})` }}
                            className={cx(styles.mediaContent, styles.top)}
                        ></div>
                        <div
                            style={{ backgroundImage: `url(${srcs[3]})` }}
                            className={cx(styles.mediaContent, styles.bottom)}
                        ></div>
                    </div>
                </div>
            );
        default:
            throw 'Incorrect media amount';
    }
};
