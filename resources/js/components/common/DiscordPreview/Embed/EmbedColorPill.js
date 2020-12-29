import React from 'react';

const extractRGB = (i) => ({
    r: (i >> 16) & 0xff,
    g: (i >> 8) & 0xff,
    b: i & 0xff,
});

export default function EmbedColorPill({ color }) {
    if (!color) {
        color = '#8ec5c5';
    }

    return <div className="embed-color-pill" style={{ backgroundColor: color }} />;
}
