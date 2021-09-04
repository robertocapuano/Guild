import * as REDOM from 'redom';
import { PLANET_Z } from './consts';
import { Planet } from './types';
import { HSVtoRGB, RGBtoHSV } from './utils';
const SimplexNoise = require('simplex-noise');

export function createPlanet( pl: Planet ) 
{
    const app = document.querySelector("#root");

    {
        const ROTS = [8, 10, 18];
        const rot = ROTS[pl.size];

        const terrain = REDOM.el('div',{
            classList: 'terrain',
            style: {
            '-webkit-animation': `rotatePlanet ${rot}s linear infinite`,
            'animation': `rotatePlanet ${rot}s linear infinite`,
            },
        });

        const planetClip = REDOM.el('div',{
            classList: 'planetClip',
           
        });
        planetClip.appendChild(terrain);

        const SCALES = [.23, .33, .43];
        const scale = SCALES[pl.size];

        const planet = REDOM.el('div',{
            id: 'planet',
            classList: 'planet',
            style: {
                'z-index': PLANET_Z,
                'transform': `rotate3d(0, 0, 1, 5deg) scale3d(${scale}, ${scale}, 1)`,
                'animation': 'fadein 3000ms linear forwards',
            }
        });
        planet.appendChild(planetClip);

        app.appendChild(planet);

        // planetClip
        {
            // const g1 = 0, r1 = 17, b1 = 120;
            const g1 = pl.baseColor.r;
            const r1 = pl.baseColor.g;
            const b1 = pl.baseColor.b;

            const hsv = RGBtoHSV(r1, g1, b1);
            hsv.v *= .5;
            const rgb2 = HSVtoRGB(hsv);

            const bg1 = `rgb(${r1},${g1},${b1})`;
            const bg2 = `rgb(${rgb2.r},${rgb2.g},${rgb2.b})`;

            const bg = `radial-gradient(circle farthest-side at 0% 0%, rgba(255, 255, 255, 0.25) 0%, rgba(0, 0, 0, 0.35) 100%), radial-gradient(circle farthest-side at 0% 0%, ${bg1} 25%, transparent 80%), radial-gradient(circle farthest-side at 0% 0%, ${bg2} 0%, transparent 100%), radial-gradient(circle farthest-side at 0% 0%, #005700 0%, #270300 85%)`;
            planetClip.style.setProperty('background-image', bg);

            var styleElem = document.head.appendChild(document.createElement("style"));
            styleElem.innerHTML = `#${planet.id}:before {background: ${bg1};}`;
        }

        // terrain
        const WIDTH = 1024;
        const HEIGHT = 256;

        {
            const simplex = new SimplexNoise();
            const canvas = document.createElement('canvas');
            canvas.width = WIDTH;
            canvas.height = HEIGHT;

            // canvas = document.getElementById('c'),
            const ctx = canvas.getContext('2d');
            const imgdata = ctx.createImageData(WIDTH, HEIGHT);
            const data = imgdata.data;
            const x1 = 0;
            const y1 = 0;
            const x2 = 1;
            const y2 = 1;
            const dx = x2 - x1
            const dy = y2 - y1
            const pi = Math.PI;
            const cos = Math.cos;
            const sin = Math.sin;

            const HWIDTH = WIDTH / 1;
            const HHEIGHT = HEIGHT / 1;

            for (var x = 0; x < WIDTH; x++) {
                for (var y = 0; y < HEIGHT; y++) {

                    const s = x / HWIDTH;
                    const t = y / HHEIGHT;

                    const nx = x1 + cos(s * 2 * pi) * dx / (2 * pi);
                    const ny = y1 + cos(t * 2 * pi) * dy / (2 * pi);
                    const nz = x1 + sin(s * 2 * pi) * dx / (2 * pi);
                    const nw = y1 + sin(t * 2 * pi) * dy / (2 * pi);

                    let r = 0;
                    for ( let i=0; i<pl.weights.length; ++i )
                    {
                        const p = Math.pow(2,i);

                        r += pl.weights[i] * (simplex.noise4D(p * nx,p * ny, p * nz, p * nw) + 1) / 2;
                    }

                    const v = ((r) / pl.sumWeight) * 255;
                    const ii = (x + y * WIDTH) * 4;

                    data[ii + 0] = v;
                    data[ii + 1] = v;
                    data[ii + 2] = v;
                    data[ii + 3] = 255;
                }

            }

            ctx.putImageData(imgdata, 0, 0);
            var dataURL = canvas.toDataURL();
            terrain.style.setProperty('background-image', 'url(' + dataURL + ')');// 0% 0%/auto 100% repeat-x;
            const style = document.createElement('style');

            document.getElementsByTagName('head')[0].appendChild(style);
        }
    }
}

export function destroyPlanet()
{
    const app = document.querySelector("#root");
    
    const planet = document.getElementById('planet');
    planet.style.animation = 'fadeOut 2000ms linear forwards';
    
    setTimeout( () => {
        REDOM.unmount(app,planet);
    },2001);
}

