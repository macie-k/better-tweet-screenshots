export interface LikesIconProps {
    type: 'outline' | 'filled' | 'disabled';
}

export const LikesIcon = ({ type }: LikesIconProps) => {
    switch (type) {
        case 'disabled':
        case 'outline':
            return (
                <svg
                    width="981"
                    height="878"
                    viewBox="0 0 981 878"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipPath="url(#clip0)">
                        <path
                            d="M452.7 861.3C337.2 790.8 221.7 694.5 142.2 601.8C71.4 519.6 26.1 434.1 7.20002 346.5C0.600016 316.5 -1.49998 257.1 2.70002 229.5C19.8 123.6 98.7 36.9 203.7 8.4C234.6 -2.38419e-06 298.5 -0.600003 327 7.2C351.3 13.8 390.3 31.8 413.1 47.1C434.7 61.2 464.1 88.5 478.8 108C489.9 122.7 489.9 122.7 497.1 113.1C511.8 92.7 545.7 61.8 571.2 44.7C659.7 -13.8 765.9 -14.4 855.3 43.5C944.4 101.1 991.5 203.7 978 310.8C960.9 448.8 878.1 581.4 726 714.9C645.6 785.4 510.3 879 489.3 879C484.8 879 468.6 870.9 452.7 861.3V861.3ZM532.8 794.7C702 683.7 831 552 886.8 433.5C915 373.2 927 325.5 927 273.9C927 236.7 920.4 208.8 903.9 174C892.2 149.7 886.2 141.9 862.8 118.5C840 95.4 831 88.8 807 77.1C772.2 60 747.9 54 712.5 54C680.4 54 657.9 59.1 627 73.8C580.5 95.7 539.4 135.6 519 179.1C507.9 202.2 503.4 206.7 490.2 207C477.9 207 467.4 198.6 462.3 184.2C452.1 155.4 420.6 117.3 388.2 94.2C349.8 66.9 311.7 54 268.2 54C186 54 111.9 100.5 75 175.5C57.3 211.5 52.8 232.2 53.1 276C53.4 329.1 61.5 362.7 88.8 423.6C118.2 489.3 157.8 544.5 223.5 611.7C273 662.1 312 697.2 360 733.5C391.2 757.2 485.7 822 489.3 822C490.2 822 509.7 809.7 532.8 794.7V794.7Z"
                            fill={type === 'outline' ? '#FF564A' : '#C9C9C9'}
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect width="981" height="878" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            );

        case 'filled':
            return (
                <svg
                    width="981"
                    height="878"
                    viewBox="0 0 981 878"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M452.7 861.3C337.2 790.8 221.7 694.5 142.2 601.8C71.4 519.6 26.1 434.1 7.20002 346.5C0.600016 316.5 -1.49998 257.1 2.70002 229.5C19.8 123.6 98.7 36.9 203.7 8.4C234.6 -2.38419e-06 298.5 -0.600003 327 7.2C351.3 13.8 390.3 31.8 413.1 47.1C434.7 61.2 464.1 88.5 478.8 108C489.9 122.7 489.9 122.7 497.1 113.1C511.8 92.7 545.7 61.8 571.2 44.7C659.7 -13.8 765.9 -14.4 855.3 43.5C944.4 101.1 991.5 203.7 978 310.8C960.9 448.8 878.1 581.4 726 714.9C645.6 785.4 510.3 879 489.3 879C484.8 879 468.6 870.9 452.7 861.3Z"
                        fill="#FF564A"
                    />
                </svg>
            );

        default:
            throw `Wrong likes type: "${type}"`;
    }
};
