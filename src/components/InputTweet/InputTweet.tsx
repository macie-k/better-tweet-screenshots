import React from 'react';

import styles from './InputTweet.module.scss';
import { cx } from '../../utils/cx';
import { redirect } from 'views/InputPage/InputPage';

import { SearchIcon } from '../Icons/SearchIcon';
import { CommentsIcon } from '../Icons/CommentsIcon';
import { HeartIcon } from '../Icons/HeartIcon';

export interface InputTweetProps {
    error: boolean;
    defaultTweet: string;
    inputVal: string;
    setInputVal: (arg: string) => void;
}

export const InputTweet = ({ defaultTweet, inputVal, setInputVal, error }: InputTweetProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.avatar}></div>
                <div className={styles.namesContainer}>
                    <div className={cx(styles.name, styles.topName)}></div>
                    <div className={cx(styles.name, styles.bottomName)}></div>
                </div>
            </div>
            <div className={styles.text}>Paste tweet link 👇</div>
            <div className={cx(styles.inputContainer, { [styles.error]: error })}>
                <SearchIcon />
                <input
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    className={styles.inputBox}
                    placeholder={defaultTweet}
                    type="text"
                />
            </div>
            <div className={styles.footer}>
                <CommentsIcon onClick={() => redirect('https://bit.ly/bts-comment')} />
                <HeartIcon onClick={() => redirect('https://bit.ly/bts-heart')} />
            </div>
        </div>
    );
};
