import React, { useEffect, useState, useRef, ReactNode } from 'react';
import styles from './Container.module.scss';
import gradients from '../../resources/gradients.json';

import { User, Post } from 'views/TweetView/TweetView';

export interface ContainerProps {
    tweet: {
        user: User;
        tweet: Post;
    };
    children?: ReactNode;
}

export const Container = ({ tweet, children }: ContainerProps) => {
    const container = useRef<HTMLDivElement>(null);
    const [gradient, setGradient] = useState({
        name: 'default',
        colors: [
            '#d16ba5',
            '#cf6fb1',
            '#cb73be',
            '#c678cb',
            '#be7ed7',
            '#b388e2',
            '#a692ec',
            '#999bf4',
            '#8ba9f8',
            '#83b5f9',
            '#82c0f6',
            '#89c9f2',
        ],
    });

    useEffect(() => {
        const index = Math.floor(Math.random() * (gradients.length + 1));
        setGradient(gradients[index]);
    }, [tweet]);

    useEffect(() => {
        if (gradient.name !== 'default' && tweet !== undefined) {
            console.log(
                ` Gradient: '${gradient.name}' --- https://uigradients.com/  %c        `,
                `background: linear-gradient(to left bottom, ${gradient.colors.join(',')})`
            );
        }
    }, [gradient]);

    const newBg = `linear-gradient(to left bottom, ${gradient.colors.join(',')})`;
    return (
        <div ref={container} style={{ backgroundImage: newBg }} className={styles.container}>
            {children}
        </div>
    );
};
