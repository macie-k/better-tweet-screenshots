import { ThemeProvider } from '../src/hooks/useTheme';
import { SettingsProvider } from '../src/hooks/useSettings';
import '!style-loader!css-loader!sass-loader!../src/styles/index.scss';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const decorators = [
    (Story, context) => (
        <SettingsProvider>
            <ThemeProvider themeOverride={context.globals.theme}>
                <Story />
            </ThemeProvider>
        </SettingsProvider>
    ),
];

export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Theme',
        defaultValue: 'light',
        toolbar: {
            icon: 'circlehollow',
            items: ['light', 'dim', 'dark'],
            showName: true,
        },
    },
};
