import { useState } from 'react';

export const useTweetPosition = () => {
    const [top, setTop] = useState(null);
    const [right, setRight] = useState(null);

    return [top, right];
};
