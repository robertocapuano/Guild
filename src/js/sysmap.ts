import * as REDOM from 'redom';
import { MAP_Z, PLANET_H } from './consts';
import { Planet, System } from './types';
import { nextid } from './utils';

export function createSysMap( systems: System[], selectionListener: ( pl: Planet ) => void ) {
    const app = document.querySelector("#root");

    {
        const mapWrapper = REDOM.el('div',{
            id: nextid('map'),
            classList: 'map-wrapper',
            style: {
                'z-index': MAP_Z,
            }
        });
        app.appendChild( mapWrapper );
        
        const mplanets = [];
        const msystems = [];
        const msysNames = [];

        for ( const system of systems )
        {
            // console.log( 'system.position' + system.position );
            const msystemWrapper = REDOM.el('div',{
                id: nextid('map'),
                classList: 'msystem-wrapper',
                style: {
                    position: 'absolute',
                    left: system.position[0],
                    top: system.position[1],

                }
            });
            mapWrapper.appendChild( msystemWrapper );
      
            const msystem = REDOM.el('div',{
                id: nextid('map'),
                classList: 'msystem',
                style: {
                    'height': system.height,   //`${4+j*8}rem`,
                    animation: 'scaleUpMap 1500ms linear forwards',

                }
            });
            msystems.push(msystem);

            msystemWrapper.appendChild( msystem );

            {
                const sysName= REDOM.el('div',{
                    id: nextid('map'),
                    classList: 'msysname',
                    textContent: system.name,
                    style: {
                        animation: 'fadein 6000ms linear forwards',

                    }
                });

                msysNames.push( sysName );

                msystemWrapper.appendChild( sysName );
            }

            const large_r = .9;
            const normal_r = .6;
            const small_r = .4;

            const sizea = [ small_r, normal_r, large_r];

            system.planets.forEach( (pl, i ) =>
            {
                const radius = sizea[pl.size];
                const rgb = `rgb(${pl.baseColor.r},${pl.baseColor.g},${pl.baseColor.b})`;

                const mplanet = REDOM.el('div',{
                    id: nextid('map'),
                    classList: 'mplanet tooltip',
                    style: {
                        'background-color': rgb,
                        'animation-delay': `${i*250}ms`,
                        'top': `${ PLANET_H*i  }px`,
                        'left': `${-radius}rem`,
                        'width': `${radius*2}rem`,
                        'height': `${radius*2}rem`,
                        'animation': '2000ms ease-out 2000ms 1 normal forwards running slideInMap',
                        'box-shadow': `0 0 8px ${rgb}`,
                    }
                });
                mplanets.push( mplanet );

                mplanet.onclick = () => {
                    // mplanet.style.animationPlayState = 'paused';
                    msystems.forEach( ms => {
                        ms.style.transform = 'scale(1)';
                        ms.style.animation = '1500ms linear 1500ms 1 normal forwards running scaleDownMap';// 1500ms linear forwards';
                    });

                    mplanets.forEach( mp => {
                        mp.style.opacity =  1;
                        mp.style.animation = '1500ms ease-out 0ms 1 normal forwards running slideOutMap';
                    });

                    msysNames.forEach( mn => {
                        mn.style.animation = 'fadeOut 1000ms linear forwards';
                    });
                    
                    selectionListener( pl );
                    setTimeout( () => {
                        REDOM.unmount( app, mapWrapper );

                    }, 3000 );
                };

                msystem.append( mplanet );


                const planetName = REDOM.el('span',{
                    id: nextid('planet'),
                    classList: 'tooltiptext msysname',
                    textContent: pl.name,
                    // style: {
                        // 'z-index': PLANET_Z,
                        // 'transform': `rotate3d(0, 0, 1, 5deg) scale3d(${scale}, ${scale}, 1)`,
                    // }
                });

                mplanet.appendChild(planetName);
            });
        }

  

    }

}
