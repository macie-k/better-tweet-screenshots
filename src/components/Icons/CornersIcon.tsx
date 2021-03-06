import React from 'react';

export interface CornersIconProps {
    type: 'rounded' | 'squared';
}

export const CornersIcon = ({ type }: CornersIconProps) => {
    switch (type) {
        case 'rounded':
            return (
                <svg
                    width="300"
                    height="300"
                    viewBox="0 0 300 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect y="35" width="15" height="30" fill="#959595" />
                    <rect y="35" width="15" height="30" fill="#959595" />
                    <rect y="85" width="15" height="30" fill="#959595" />
                    <rect y="85" width="15" height="30" fill="#959595" />
                    <rect y="135" width="15" height="30" fill="#959595" />
                    <rect y="135" width="15" height="30" fill="#959595" />
                    <rect y="185" width="15" height="30" fill="#959595" />
                    <rect y="185" width="15" height="30" fill="#959595" />
                    <rect y="235" width="15" height="30" fill="#959595" />
                    <rect y="235" width="15" height="30" fill="#959595" />
                    <rect
                        x="35"
                        y="15"
                        width="15"
                        height="30"
                        transform="rotate(-90 35 15)"
                        fill="#959595"
                    />
                    <rect
                        x="35"
                        y="15"
                        width="15"
                        height="30"
                        transform="rotate(-90 35 15)"
                        fill="#959595"
                    />
                    <rect
                        x="85"
                        y="15"
                        width="15"
                        height="30"
                        transform="rotate(-90 85 15)"
                        fill="#959595"
                    />
                    <rect
                        x="85"
                        y="15"
                        width="15"
                        height="30"
                        transform="rotate(-90 85 15)"
                        fill="#959595"
                    />
                    <rect
                        x="135"
                        y="15"
                        width="15"
                        height="30"
                        transform="rotate(-90 135 15)"
                        fill="#959595"
                    />
                    <rect
                        x="135"
                        y="15"
                        width="15"
                        height="30"
                        transform="rotate(-90 135 15)"
                        fill="#959595"
                    />
                    <rect
                        x="185"
                        y="15"
                        width="15"
                        height="30"
                        transform="rotate(-90 185 15)"
                        fill="#959595"
                    />
                    <rect
                        x="185"
                        y="15"
                        width="15"
                        height="30"
                        transform="rotate(-90 185 15)"
                        fill="#959595"
                    />
                    <rect
                        x="235"
                        y="15"
                        width="15"
                        height="30"
                        transform="rotate(-90 235 15)"
                        fill="#959595"
                    />
                    <rect
                        x="235"
                        y="15"
                        width="15"
                        height="30"
                        transform="rotate(-90 235 15)"
                        fill="#959595"
                    />
                    <rect width="15" height="15" fill="#959595" />
                    <path
                        d="M250 10H290V290H10V250C10 117.452 117.452 10 250 10Z"
                        stroke="#222222"
                        strokeWidth="20"
                    />
                </svg>
            );
        case 'squared':
            return (
                <svg
                    width="300"
                    height="300"
                    viewBox="0 0 300 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8 258C8 119.929 119.929 8 258 8H292V292H8V258Z"
                        stroke="#959595"
                        strokeWidth="15"
                        strokeDasharray="20 20"
                    />
                    <path d="M10 10H290V290H10V10Z" stroke="#222222" strokeWidth="20" />
                </svg>
            );
    }
};
