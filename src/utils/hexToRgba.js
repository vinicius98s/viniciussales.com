export default (hex, alpha) => {
  const R = parseInt(hex.slice(1, 3), 16);
  const G = parseInt(hex.slice(3, 5), 16);
  const B = parseInt(hex.slice(5, 7), 16);

  return alpha ? `rgba(${R}, ${G}, ${B}, ${alpha})` : `rgb(${R}, ${G}, ${B})`;
};
