export function offsetByMeters(
  lat: number,
  lng: number,
  dx: number,
  dy: number
) {
  const dLat = dy / 111_320; // m → deg
  const dLng = dx / (111_320 * Math.cos((lat * Math.PI) / 180));
  return { lat: lat + dLat, lng: lng + dLng };
}
