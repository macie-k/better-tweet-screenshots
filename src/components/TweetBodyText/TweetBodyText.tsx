import React from 'react';
import styles from './TweetBodyText.module.scss';

import { cx } from '../../utils/cx';

const urlRegex = /(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w\-]*)?(\?[^\s]*)?/gi;

export interface BodyTextProps {
    compact?: boolean;
    content?: string;
}

export const TweetBodyText = ({ compact, content }: BodyTextProps) => {
    return (
        <div
            className={cx(styles.container, { [styles.compact]: compact })}
            dangerouslySetInnerHTML={{ __html: parseText(content) }}
        ></div>
    );
};

const parseText = (text?: string) => {
    if (!text) return '';

    const newlineSplit = text.split('\n');
    let finalText = '';

    newlineSplit.forEach((line, i) => {
        finalText += line;

        /* dont add <br> to the last line */
        if (i !== newlineSplit.length - 1) {
            finalText += ' <br> ';
        }
    });

    const spaceSplit = finalText.split(' ');
    finalText = '';

    spaceSplit.forEach((word) => {
        if (word.charAt(0) === '@' || word.charAt(0) === '#' || urlRegex.test(word)) {
            finalText += `<span class=${styles.accentText}>${word} </span>`;
        } else {
            if (word.includes('#')) {
                finalText += `<span class=${styles.accentText}>${word.substring(
                    word.indexOf('#') + 1
                )} </span>`;
                return;
            }
            if (word.includes('@')) {
                finalText += `<span class=${styles.accentText}>${word.substring(
                    word.indexOf('@') + 1
                )} </span>`;
                return;
            }

            finalText += word + (word !== '<br>' ? ' ' : ''); // dont add spaces after <br> tag
        }
    });

    finalText.trim();
    return finalText;
};
