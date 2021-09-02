import * as REDOM from 'redom';
import { HUD_Z } from './consts';
import { addCell, addHeader, addRow } from './hud';
import { createHudProduct, destroyHudProduct } from './hudpr';
import { Planet } from './types';
import { getSign, nextid, RND } from "./utils";
import { findSlot} from './cargo';
import { getDeltaPrice } from './trader';
import { setAvail } from './procgen';
import { playNote } from './audio';

export function createHudTrade( pl: Planet )
{
    const app = document.querySelector("#root");
    
    setAvail(pl);

    const container = REDOM.el('div',{
        id: 'hudtr-container',
        classList: 'hudtr-container',
        style: {
            'z-index': HUD_Z,
            opacity: 0,
            animation: '3000ms ease-out 500ms 1 normal forwards running hudtrRotateIn',
        }
    });
    REDOM.mount( app, container );

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

        const thead = REDOM.el('thead',{
            id: nextid('hud'),
        });
        REDOM.mount( table, thead );

        const row = addRow( thead );
        addHeader( row, 'Product' );
        addHeader( row, 'Cargo' );
        addHeader( row, 'Price (Cr)' );
        addHeader( row, 'Delta (%)' );
        addHeader( row, 'Weight (Kg)' );
        // addHeader( row, 'Demand' );
        // addHeader( row, 'Supply' );
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

        for ( let tr of pl.trade )
        {
            const row = addRow( tbody );
            row.onclick = () => {
                playNote(4, 'D', 50 );
                destroyHudProduct();
                createHudProduct( pl, tr, () => {
                    units.textContent = '' + findSlot( tr.product ).units;
                } );
            };


            const price = getDeltaPrice(tr, tr.price);

            addCell( row, tr.product.name );
            const units = addCell( row, findSlot( tr.product ).units + '' );
            addCell( row, ''+tr.price );
            addCell( row, getSign(price) + ''+  Math.abs(price)+'%' );
            addCell( row, ''+tr.product.weight );
            // addCell( row, ''+tr.demand );
            // addCell( row, ''+tr.supply );
        }
    }
}

export function destroyHudTrade()
{
    const app = document.querySelector("#root");
    
    const hudtr = document.getElementById('hudtr-container');
    // hudtr.style.opacity = ''+1;
    hudtr.style.animation = '2000ms ease-in 0ms 1 normal forwards running hudtrRotateOut';
    
    setTimeout( () => {
        REDOM.unmount(app,hudtr);
    },2001);
}
