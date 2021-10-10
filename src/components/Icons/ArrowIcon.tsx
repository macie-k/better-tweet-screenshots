export interface ArrowIconProps {
    direction?: 'T' | 'R' | 'B' | 'L'; // Top - Right - Bottom - Left
}

export const ArrowIcon = ({ direction }: ArrowIconProps) => {
    var rotation = 0;

    switch (direction) {
        case 'T':
            rotation = 180;
            break;
        case 'R':
            rotation = -90;
            break;
        case 'L':
            rotation = 90;
            break;
    }
    return (
        <svg
            style={{ width: '100%', transform: `rotate(${rotation}deg)` }}
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 32 32"
            height="17"
            version="1.1"
            width="22"
        >
            <rect
                id="backgroundrect"
                width="100%"
                height="100%"
                x="0"
                y="0"
                fill="none"
                stroke="none"
            />
            <g>
                <title>Layer 1</title>
                <path
                    d="M20.03302266198438,2.9838816910122663 L11.011851806568666,12.007230258161336 l-9.021170855415715,-9.024437423015746 c-0.430098067337266,-0.430098067337266 -1.1258769661436152,-0.430098067337266 -1.555975033480886,0 c-0.4290092114705854,0.430098067337266 -0.4290092114705854,1.1269658220102914 0,1.5570638893475528 l9.798613944222817,9.801880511822846 l0,0 l0,0 c0.4290092114705854,0.430098067337266 1.1258769661436152,0.430098067337266 1.5548861776141996,0 l9.798613944222817,-9.801880511822846 c0.4290092114705854,-0.430098067337266 0.4290092114705854,-1.1280546778769682 0,-1.5581527452142292 C21.158899628127994,2.553783623675004 20.462031873454965,2.553783623675004 20.03302266198438,2.9838816910122663 z"
                    fill="#FFFFFF"
                    id="Expand_More"
                />
                <g id="svg_1" />
                <g id="svg_2" />
                <g id="svg_3" />
                <g id="svg_4" />
                <g id="svg_5" />
                <g id="svg_6" />
            </g>
        </svg>
    );
};
