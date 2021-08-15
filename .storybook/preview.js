import { ThemeProvider } from '../src/hooks/useTheme';
import { Container } from '../src/components/Container/Container';
import { SettingsProvider } from '../src/hooks/useSettings';

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
                <Container>
                    <Story />
                </Container>
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
