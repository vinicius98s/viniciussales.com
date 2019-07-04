function hexToRgba(hex, alpha) {
    const R = parseInt(hex.slice(1, 3), 16),
        G = parseInt(hex.slice(3, 5), 16),
        B = parseInt(hex.slice(5, 7), 16);

    return alpha ? `rgba(${R}, ${G}, ${B}, ${alpha})` : `rgb(${R}, ${G}, ${B})`;
}

export default hexToRgba;
