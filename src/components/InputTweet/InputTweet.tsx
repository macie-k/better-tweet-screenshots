import React, { useEffect, useRef, useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import styles from './InputTweet.module.scss';
import { cx } from '../../utils/cx';
import { redirect } from 'views/InputPage/InputPage';
import bounce from '../../transitions/bounce.module.scss';

import { SearchIcon } from '../Icons/SearchIcon';
import { CommentsIcon } from '../Icons/CommentsIcon';
import { HeartIcon } from '../Icons/HeartIcon';

export interface InputTweetProps {
    defaultTweet: string;
    error: boolean;
    loading: boolean;

    inputVal: string;
    setInputVal: (arg: string) => void;
}

export const InputTweet = ({
    defaultTweet,
    error,
    loading,
    inputVal,
    setInputVal,
}: InputTweetProps) => {
    const [text, setText] = useState('Paste tweet link 👇');
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setText(loading ? 'Loading... ⌛' : error ? "Something's wrong 😓" : 'Paste tweet link 👇');
    }, [loading, error]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.avatar}></div>
                <div className={styles.namesContainer}>
                    <div className={cx(styles.name, styles.topName)}></div>
                    <div className={cx(styles.name, styles.bottomName)}></div>
                </div>
            </div>
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={text}
                    appear={true}
                    classNames={bounce}
                    nodeRef={textRef}
                    timeout={500}
                >
                    <div ref={textRef} className={styles.text}>
                        {text}
                    </div>
                </CSSTransition>
            </SwitchTransition>
            <div
                className={cx(styles.inputContainer, {
                    [styles.error]: error,
                    [styles.disabled]: loading,
                })}
            >
                <SearchIcon />
                <input
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    className={cx(styles.inputBox, { [styles.loading]: loading })}
                    placeholder={defaultTweet}
                    type="text"
                    disabled={loading}
                />
            </div>
            <div className={styles.footer}>
                <CommentsIcon onClick={() => redirect('https://bit.ly/bts-comment')} />
                <HeartIcon onClick={() => redirect('https://bit.ly/bts-heart')} />
            </div>
        </div>
    );
};
