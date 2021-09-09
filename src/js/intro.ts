import * as REDOM from 'redom';
import { playNote, setupAudio } from './audio';
import { SHORT_NOTE, VERSION } from './consts';
import { initDrone } from './drone';
import { PI, RAD, TWOPI } from "./math";
import { clearItem } from './storage';
import { nextid, RND } from "./utils";
// import { version } from '../../package.json';

export function createIntro( startCall: ()=>void ): HTMLElement
{
    const app = document.querySelector("#root");

    const container = REDOM.el( 'div', { 
        id: nextid('intro'),
        // textContent: "Spacing Guild",
        style: { 
            // pointerEvents: 'none',
     
            position: 'absolute',
            // fontFamily: 'sans-serif',
            fontSize: 'large',
            left: '12%',
            top: '12%',
            width: '75%',
            height: '75%',
            'z-index': '2000',
            color: 'white',
            font: 'no-sans',
            backgroundColor: 'rgba(0,0,0,0.0)',
    }});

    REDOM.mount(app, container );

    const title = REDOM.el( 'div', {
        textContent: 'Spacing Guild',
        style: {
            left: '1rem',
            top: '2rem',
            position: 'absolute',
            'letter-spacing': '1.5rem',
            'z-index': '2000',
            'transform': 'rotateY(30DEG)',
            color: 'rgba(255,255,255,.75 )',
        }
    });
    REDOM.mount(app, title );


    const author = REDOM.el( 'div', {
        textContent: `v.${VERSION} - (c) ${new Date().getFullYear()} - 2 THINK SNC`,
        style: {
            fontSize: '.5rem',
            'letter-spacing': '.1rem',
            right: '1rem',
            bottom: '1rem',
            position: 'absolute',
            'z-index': '2000',
            'transform': 'rotateY(30DEG)',
            color: 'rgba(255,255,255,.75 )',
        }
    });
    REDOM.mount(app, author );




    const grps = new Array<SVGElement>();

    const cy = 50;
    const cx = 50;

    // sections
    {
        const scts = new Array<SVGElement>();

        let colors = [
            '#00004f',
            '#00009e',
            '#0000b2',
        ];

        let i = 0;
        const rx = 19;
        const ry = 19;
        {
            const color = colors[i%colors.length];

            const sct = createEllipse(  cx, cy, rx, ry, color );
           

            const secs = .5;

            const anim_fade = REDOM.svg( 'animate', {
                id: nextid('intro'),
                attributeName: "opacity",
                dur: `${secs}s`,
                keyTimes: "0;1",
                values: "0;1",
                // begin: ''
                // repeatCount:"indefinite",
            });

            {
                const sct_grp = REDOM.svg(
                    "g",
                    ...[ sct, anim_fade ],
                    {
                        id: nextid('intro'),
                    }
            
                );
               
                scts.push( sct_grp );
            }
        }


        const grp = REDOM.svg(
            "g",
            // anim,
            ...scts,
            {
                id: nextid('intro'),
            }
        );
        
        grps.push( grp );

    }

    // arcs
    {
        const r = 40;

        const arcs = new Array<SVGElement>();

        const N = 20;
        for ( let i=0; i<N; ++i )
        {
            const st_ang = i * (TWOPI / N) + RAD(1);
            const ed_ang = (i+1) * (TWOPI / N) - RAD(1);
            // ff7e79
            const gray = .25  + .5 * RND();
            const color = `rgba(255,120,120,${gray} )`;

            const arc = createArc( cx, cy, r, st_ang, ed_ang, color );
            arcs.push( arc );

            // arc.addEventListener('click', () => evt_emt.emit( ''+i )  );
        }

        const secs = 40;

        const anim = REDOM.svg( 'animateTransform', {

            attributeName: "transform",
            attributeType: "XML",
            type: "rotate",
            from: `0 ${cx} ${cy}`,
            to: `360 ${cx} ${cy}`,
            dur: `${secs}s`,
            repeatCount:"indefinite",
        });

        const grp = REDOM.svg(
            "g",
            anim,
            ...arcs,
            {
                id: nextid('intro'),
            }
        );
        
        grps.push( grp );
    }

    {
        const W = 100;
        const H = 100;

        const drawing = REDOM.svg(
            "svg",
            ...grps,
            {
                id: nextid('intro'),
                viewBox: `0 0 100 100`,
                // width: W,
                // height: H,
                style: {
                    width: '100%',
                    height: '100%',
                }
            }
        );

        const start = (isClear: boolean) => {

            if (isClear)
            {
                clearItem('systems');
                clearItem('cargo');
            }

            setupAudio();

            playNote(4, isClear ? 'B' : 'A', SHORT_NOTE );

            initDrone();

            title.style.animation = 'fadeOut 500ms linear forwards';
            author.style.animation = 'fadeOut 500ms linear forwards';
            container.style.animation = 'zoomOut 1000ms linear forwards';

            setTimeout( () => {
                REDOM.unmount(app, container  );
                REDOM.unmount(app, title  );
                REDOM.unmount(app, author  );
                startCall();
            }, 1000 );
        };

        let started = false;

        container.addEventListener('click', (event) => {

            if (started)
                return;

            started = true;
            const isClear = event.shiftKey;
            start(isClear)
        });

        REDOM.mount(container, drawing);
    }

    return container;
}

function start()
{

}

function createEllipse( cx: number, cy: number, rx: number, ry: number, color: string ): SVGElement
{
    const ellipse = REDOM.svg( 'ellipse', 
        // anim,
        { 
            id: nextid('intro'),
            cx,
            cy,
            rx,
            ry,
            style: {
                stroke: 'rgba(200,0,0,.5)',
                fill:  'rgba(255,120,120,.75 )',//'#ff7e79',
                strokeWidth: '2.',
            }
    });

    return ellipse;
}

function createArc( cx: number, cy: number, r: number, alpha: number, beta: number, color: string ): SVGElement
{
    [ alpha, beta ] = [alpha, beta].sort();
    const xAxisRot = 0;
    const largeArcFlag = +(alpha*beta < 0 || Math.abs(alpha-beta)>PI);
    const sweepFlag = 1;
    
    const [ sx, sy, dx, dy ] = arcEndpts( cx, cy, r, alpha, beta );

    const move = `M${sx},${sy}`;
    const arc = `M${sx},${sy} A${r},${r} ${xAxisRot} ${largeArcFlag} ${sweepFlag} ${dx},${dy}`;

    const path_cmd = `${move} ${arc}`;

    let path = REDOM.svg( 'path', 
        // anim,
        { 
            id: nextid('intro'),
            d: path_cmd,
            style: {
                stroke: color,
                fill: 'none',
                strokeWidth: '.2',
            }
    });

    return path;

}

function arcEndpts(  cx: number, cy: number, r: number, alpha: number, beta: number ): [ number, number, number, number ]
{
    let sx = cx + r * Math.cos(alpha);
    let sy = cy + r * Math.sin(alpha);
    let dx = cx + r * Math.cos(beta);
    let dy = cy + r * Math.sin(beta);

    return [ sx, sy, dx, dy ];
}
