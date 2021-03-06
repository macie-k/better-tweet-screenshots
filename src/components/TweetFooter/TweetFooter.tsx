import React, { useMemo } from 'react';
import { parseISO, format } from 'date-fns';

import styles from './TweetFooter.module.scss';

import { LikesIcon } from '../Icons/LikesIcon';
import { useLikes, useTimestamp } from 'hooks/useSettings';

export interface TweetFooterProps {
    timestamp: string;
    likes: number;
}

export const TweetFooter = ({ timestamp, likes }: TweetFooterProps) => {
    const [likesStyle] = useLikes();
    const [timestampStyle] = useTimestamp();

    const [time, date] = useMemo(() => {
        const dateTime = parseISO(timestamp);
        const time = format(dateTime, 'HH:mm');
        const date = format(dateTime, 'dd MMM YYY');

        return [time, date];
    }, [timestamp]);

    const likesCount = likes >= 1000 ? `${(likes / 1000.0).toFixed(1)}k` : likes;

    return (
        <div className={styles.container}>
            {timestampStyle === 'datetime' && <div className={styles.time}>{time}</div>}
            {timestampStyle !== 'disabled' && <div className={styles.date}>{date}</div>}

            <div
                className={styles.likesContainer}
                style={{ display: likesStyle === 'disabled' ? 'none' : '' }} // hide element completely when likes are disabled to prevent empty margin
            >
                {likesStyle !== 'disabled' && (
                    <>
                        <LikesIcon type={likesStyle} />
                        <span className={styles.likesCount}>{likesCount}</span>
                    </>
                )}
            </div>
        </div>
    );
};
