import * as REDOM from 'redom';
import { SPACE_Z } from './consts';
import { nextid } from './utils';

export function createStarfield()
{
    const container = REDOM.el( 'div', { 
        id: nextid('space'),
        style: { 
            // pointerEvents: 'none',
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '100%',
            height: '100%',
            'z-index': SPACE_Z,
            color: 'white',
            font: 'no-sans',
            'background-image': 'radial-gradient(circle at center, #07133E 10%, #153215 100%',
    }});

    {

        const grps = [];

        const WIDTH = 1024;
        const HEIGHT = 1024;

        // stars
        {
            const N = 2000;
            const r = .5;
            const SECS = 100;

            for ( let i=0; i<N; ++i )
            {
                const g = Math.random()*255;
                const st_pos = [ Math.random() * WIDTH,  Math.random() * HEIGHT ];
                const circle = REDOM.svg( 'circle', {
                    r: r,
                    cx: st_pos[0],
                    cy: st_pos[1],
                    fill: `rgb(${g},${g},${g})`,
                });
        
                const secs = SECS + Math.random() *SECS;
                const end_pos = [ Math.random() * WIDTH,  Math.random() * HEIGHT ];
                const anim = REDOM.svg( 'animateTransform', {
                    attributeName: "transform",
                    attributeType: "XML",
                    type: "translate",
                    from: `${st_pos[0]} ${st_pos[1]}`,
                    to: `${end_pos[0]} ${end_pos[1]}`,
                    dur: `${secs}s`,
                    repeatCount:"indefinite",
                });

                const grp = REDOM.svg(
                    "g",
                    [ circle,  anim ],
                    {
                        id: nextid('star'),
                    }
                );
            
                grps.push( grp );
            }
        }


        const drawing = REDOM.svg(
            "svg",
            ...grps,
            {
                id: nextid('space'),
                viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
                // width: W,
                // height: H,
                preserveAspectRatio: "xMidYMid slice",
                style: {
                    width: '100%',
                    height: '100%',
                }
            }
        );

        REDOM.mount(container, drawing);
    }

    const app = document.querySelector("#root");

    REDOM.mount(app, container );

}
