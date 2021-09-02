export const PI = Math.PI;
export const TWOPI = 2 * PI;

export function RAD(x: number) { return x * (Math.PI / 180.0); }
export function DEG(x: number) { return x * (180/Math.PI); }

export function lerp ( t: number, a: number, b: number ) {
    return (b) *t + a *(1-t);
}