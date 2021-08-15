import { useCallback, useState, useMemo } from 'react';
import constate from 'constate';

type LikesStyle = 'outline' | 'filled' | 'disabled';
type TimestampStyle = 'datetime' | 'date' | 'disabled';

export const [SettingsProvider, useLikes, useRoundedCorners, useTimestamp] = constate(
    () => {
        const [likesStyle, setLikesStyle] = useState<LikesStyle>('outline');
        const toggleLikesStyle = useCallback(() => {
            setLikesStyle((likesStyle) => {
                switch (likesStyle) {
                    case 'outline':
                        return 'filled';
                    case 'filled':
                        return 'disabled';
                    case 'disabled':
                        return 'outline';
                }
            });
        }, [setLikesStyle]);

        const [areCornersRounded, setCornersRounded] = useState(true);
        const toggleRoundedCorners = useCallback(() => {
            setCornersRounded((areCornersRounded) => {
                return !areCornersRounded;
            });
        }, [setCornersRounded]);

        const [timestampStyle, setTimestampStyle] = useState<TimestampStyle>('datetime');
        const toggleTimestampStyle = useCallback(() => {
            setTimestampStyle((timestampStyle) => {
                switch (timestampStyle) {
                    case 'datetime':
                        return 'date';
                    case 'date':
                        return 'disabled';
                    case 'disabled':
                        return 'datetime';
                }
            });
        }, [setTimestampStyle]);

        return {
            likesStyle,
            toggleLikesStyle,

            areCornersRounded,
            toggleRoundedCorners,

            timestampStyle,
            toggleTimestampStyle,
        };
    },
    (state): [LikesStyle, () => void] => [state.likesStyle, state.toggleLikesStyle],
    (state): [boolean, () => void] => [state.areCornersRounded, state.toggleRoundedCorners],
    (state): [TimestampStyle, () => void] => [state.timestampStyle, state.toggleTimestampStyle]
);
