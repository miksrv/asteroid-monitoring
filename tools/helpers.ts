export const formatDistance = (distance?: number): string =>
    distance ? Math.round(distance).toLocaleString('en-US') : ''
