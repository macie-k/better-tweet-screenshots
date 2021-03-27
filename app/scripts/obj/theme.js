export class Theme {
    constructor(background, accent, textPrimary, textSecondary) {
        this.background = background
        this.accent = accent
        this.text = {
            primary: textPrimary,
            secondary: textSecondary
        }
    }
}

export const Accents = {
    BLUE: '#1DA1F2',
    YELLOW: '#FFAD1F',
    RED: '#E0245E',
    PURPLE: '#794BC4',
    ORANGE: '#F45D22',
    GREEN: '#17BF63',
}

export const Themes = {
    WHITE: new Theme('#FFFFFF', Accents.BLUE, '#0F1419', '#7A7A7A'),
    DIM: new Theme('#14202A', Accents.BLUE, '#FFFFFF', '#8899A6'),
    MIDNIGHT: new Theme('#000000', Accents.BLUE, '#D9D9D9', '#6E767D'),
}
