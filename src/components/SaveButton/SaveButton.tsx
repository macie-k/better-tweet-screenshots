import React from 'react';
import styles from './SaveButton.module.scss';

import { SaveIcon } from '../Icons/SaveIcon';
import { Setting } from 'components/Setting/Setting';

export const SaveButton = () => {
    const savePost = () => {
        console.log('cum');
    };
    return (
        <div className={styles.container}>
            <Setting icon={<SaveIcon />} onClick={savePost} />
        </div>
    );
};
