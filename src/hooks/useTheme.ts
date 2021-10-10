import { useCallback, useState, useMemo } from 'react';
import constate from 'constate';

export const [ThemeProvider, useTheme] = constate(
    ({ themeOverride }: { themeOverride?: string }) => {
        const [_theme, _setTheme] = useState<string>('light');

        const setTheme = useCallback(
            (theme: string) => {
                _setTheme(theme);
            },
            [_setTheme]
        );

        const theme = useMemo(() => {
            if (themeOverride !== undefined) {
                return `theme-${themeOverride}`;
            } else {
                return `theme-${_theme}`;
            }
        }, [_theme, themeOverride]);

        return { theme, setTheme };
    }
);
