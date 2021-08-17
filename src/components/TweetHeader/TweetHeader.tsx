import React, { useMemo } from 'react';
import { parseISO, format, differenceInCalendarYears } from 'date-fns';

import styles from './TweetHeader.module.scss';
import { VerifiedIcon } from 'components/Icons/VerifiedIcon';
import { cx } from 'utils';

import { useLikes } from 'hooks/useSettings';

export interface TweetHeaderProps {
    compact?: boolean;
    avatarUrl: string;
    displayName: string;
    username: string;
    timestamp: string;
    verified: boolean;
}

export const TweetHeader = (props: TweetHeaderProps) => {
    // const [, toggleLikesStyle] = useLikes();

    const date = useMemo(() => {
        const dateTime = parseISO(props.timestamp);
        const dateFormat =
            differenceInCalendarYears(new Date(), dateTime) === 0 ? 'dd MMM' : 'dd MMM yy';
        const date = format(dateTime, dateFormat);

        return date;
    }, [props.timestamp]);

    return (
        <div className={cx(styles.container, { [styles.compact]: props.compact })}>
            <div className={styles.avatar}>
                <img src={props.avatarUrl.replace('_normal', '')} draggable="false" />
            </div>
            <div className={styles.names}>
                <div className={styles.nameContainer}>
                    <div className={styles.displayName}>{props.displayName}</div>
                    {props.verified && <VerifiedIcon />}
                </div>
                <div className={styles.username}>@{props.username}</div>
                {props.compact && <div className={styles.time}>{date}</div>}
            </div>
            {/* <button onClick={() => toggleLikesStyle()}>LAJKI STAJL</button> */}
        </div>
    );
};
