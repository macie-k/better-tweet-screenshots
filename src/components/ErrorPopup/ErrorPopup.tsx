import React, { useEffect, useState } from 'react';
import { cx } from '../../utils/cx';

import styles from './ErrorPopup.module.scss';

import { ErrorFaceIcon } from '../Icons/ErrorFaceIcon';
import { ReloadIcon } from '../Icons/ReloadIcon';
import { getTweetID } from 'utils/tweetUtils';

export interface ErrorPopupProps {
    id: string;
}

export const ErrorPopup = ({ id }: ErrorPopupProps) => {
    const [reload, setReload] = useState(false);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        setOpacity(1);
    }, []);

    return (
        <div style={{ opacity: opacity }} className={styles.background}>
            <div className={styles.container}>
                <ErrorFaceIcon />
                <p>
                    Looks like <span className={styles.bold}>tracking prevention</span> is enabled
                    and no media could be fetched from twitter.
                    {/* prettier-ignore */}
                    <p className={styles.bottomParagraph}>
                        <a href="https://bit.ly/3h8TvbK" target="_blank" rel="noreferrer" className={styles.bold}>Disable</a> it and try again.
                    </p>
                </p>
                <div
                    onClick={() => {
                        setReload(true);
                        setTimeout(() => {
                            setReload(false);
                            window.history.pushState({}, '', `?id=${getTweetID(id)}`);
                            window.location.reload();
                        }, 1200);
                    }}
                    className={styles.reloadContainer}
                >
                    <div className={cx(styles.reloadIconContainer, { [styles.rotate]: reload })}>
                        <ReloadIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};
