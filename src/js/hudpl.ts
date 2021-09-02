import * as REDOM from 'redom';
import { HUD_Z } from './consts';
import { addCell, addHeader, addRow } from './hud';
import { Planet } from './types';
import { nextid } from "./utils";

export function createHudPlanet( pl: Planet )
{
    const app = document.querySelector("#root");

    const container = REDOM.el('div',{
        id: 'hudpl-container',
        classList: 'hudpl-container',
        style: {
            'z-index': HUD_Z,
            'animation': '3000ms ease-out 500ms 1 normal forwards running hudplRotateIn',

        }
    });
    REDOM.mount( app, container );

    {
        // header
        {
            const header = REDOM.el('div',{
                id: nextid('hud'),
                classList: 'hud-header',
            });
            REDOM.mount( container, header );

            const table = REDOM.el('table',{
                id: nextid('hud'),
                classList: 'hud',
                cellpadding: "0",
                cellspacing: "0",
                border: "0",
            });
            REDOM.mount( header, table );

            const tbody = REDOM.el('tbody',{
                id: nextid('hud'),
            });
            REDOM.mount( table, tbody );

            {
                const tr = addRow(tbody);
                addHeader( tr, pl.name );
            }
        }

        // content
        {
            const content = REDOM.el('div',{
                id: nextid('hud'),
                classList: 'hud-content',
            });
            REDOM.mount( container, content );

            const table = REDOM.el('table',{
                id: nextid('hud'),
                classList: 'hud',
                cellpadding: "0",
                cellspacing: "0",
                border: "0",
            });
            REDOM.mount( content, table );

            const tbody = REDOM.el('tbody',{
                id: nextid('hud'),
            });
            REDOM.mount( table, tbody );

            // {
            //     const row = addRow(tbody);
            //     const content = 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum';

            //     const td = REDOM.el('td',{
            //         id: nextid('hud'),
            //         textContent: content,
            //         colspan: 2,
            //     });
            //     REDOM.mount( row, td );
            // }
            
            {
                const row = addRow(tbody);
                addCell( row, 'Population' );
                addCell( row, pl.population );
            }

            // {
            //     const row = addRow(tbody);
            //     addCell( row, 'Happiness' );
            //     addCell( row, 'Poor' );
            // }

            {
                const row = addRow(tbody);
                addCell(row, 'Climate' );
                addCell(row, pl.climate +'' );
            }

            {
                const row = addRow(tbody);
                addCell(row, 'Economy' );
                addCell(row, pl.economy+'' );
            }

            {
                const row = addRow(tbody);
                addCell( row, 'Taxes' );
                addCell( row, ''+ (Math.trunc( pl.taxes * 1000  )/10 )+ '%' );
            }

            // {
            //     const row = addRow(tbody);
            //     addCell( row, 'Sell taxes' );
            //     addCell( row, ''+Math.trunc( pl.sellTax *100)+ '%');
            // }


            // if (false)
            // {
            //     const row = REDOM.el('tr',{
            //         id: nextid('hud'),
            //     });
            //     REDOM.mount( tbody, row );

            //     const td_sp = REDOM.el('th', {
            //         id: nextid('hud'),
            //         colspan: '2',
            //     });
            //     REDOM.mount( row, td_sp );
            // }
        }

    }
}

export function destroyHudPlanet()
{
    const app = document.querySelector("#root");
    
    const hudpl = document.getElementById('hudpl-container');
    // hudtr.style.opacity = ''+1;
    hudpl.style.animation = '2000ms ease-in 0ms 1 normal forwards running hudplRotateOut';

    setTimeout( () => {
        REDOM.unmount(app,hudpl);
    },2001);
}
