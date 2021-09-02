// https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately

import { HSV, RGB } from "./types";

/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR 
 * h, s, v
*/
export function HSVtoRGB(h: number, s:number, v:number): RGB
{
    let r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

/* accepts parameters
* export * accepts parameters
* r  Object = {r:x, g:y, b:z}
* OR 
* r, g, b
*/
export function RGBtoHSV(r:number, g:number, b:number): HSV
 {
   if (arguments.length === 1) {
       g = r.g, b = r.b, r = r.r;
   }
   var max = Math.max(r, g, b), min = Math.min(r, g, b),
       d = max - min,
       h,
       s = (max === 0 ? 0 : d / max),
       v = max / 255;

   switch (max) {
       case min: h = 0; break;
       case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
       case g: h = (b - r) + d * 2; h /= 6 * d; break;
       case b: h = (r - g) + d * 4; h /= 6 * d; break;
   }

   return {
       h: h,
       s: s,
       v: v
   };
}


export const nextid = ( () => {
    let id = 0;
    return ( prefix: string ) =>  prefix + '_' + id++;
})();


export const RND = Math.random;

export const getSign = ( x: number ) => {
    if (x>0)
        return '+';
    if ( x<0)
        return '-'
    return '';
};

export const getSignedPrice = (x:number ) => {
    return getSign(x) + '' + Math.abs(x);
};

