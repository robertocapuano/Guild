import * as REDOM from 'redom';
import { playNote } from './audio';
import { buy, canBuy, canSell, findSlot, sell } from './cargo';
import { addCell, addHeader, addRow } from './hud';
import { updateCargo } from './hudca';
import { getBuyPrice, getDeltaPrice, getSellPrice } from './trader';
import { Planet, ProductTrade } from './types';
import { getSignedPrice, nextid } from "./utils";

export function createHudProduct( pl: Planet, tr: ProductTrade, updateCell: ()=>void )
{
    // const slot = findSlot( tr.product );
    // const pr = tr.product;

    const tableContainer = document.querySelector("#hudtr-container");

    const container = REDOM.el('div',{
        id: 'hud-product',
    });

    REDOM.mount( tableContainer, container );

     {
         {
            const header = REDOM.el('div',{
                id: nextid('hud'),
                classList: 'hud-header',
                style: {
                    'margin-top': '10px',
                },
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
            addHeader( row, tr.product.name );
        }

        {
            const content = REDOM.el('div',{
                id: 'hud-product',
                classList: 'hud-content-auto',
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

            let availBuy: HTMLDivElement;
            let availSell: HTMLDivElement;
            
            // BUY
            {
                const row = addRow( tbody );


                {
                    const cell = addCell( row, '' );

                    const buyBtn = REDOM.el('button',{
                        id: nextid('hud'),
                        textContent: 'BUY',
                    });

                    REDOM.mount( cell, buyBtn );

                    buyBtn.addEventListener( "click", () => {
                        if (!canBuy(tr) )
                        {
                            playNote(3, 'C', 50 );
                            return;
                        }

                        playNote(4, 'E', 50 );

                        buy( tr, buyPrice );
                        updateCell();
                        updateCargo();
                        availBuy.textContent = `${tr.avail}`;
                        availSell.textContent = `${findSlot(tr.product).units}` ;

                    } );
                }

                availBuy = REDOM.el('div',{
                    id: nextid('hud'),
                    textContent: `${tr.avail}`,
                    classList: 'number-circle',
                });

                const availBuyCell = REDOM.el('td',{
                    id: nextid('hud'),
                });
                REDOM.mount(availBuyCell, availBuy );
                REDOM.mount(row, availBuyCell );

                const buyPrice = getBuyPrice( pl, tr );
                addCell(row, ''+ `${buyPrice} (Cr)` );
                addCell(row, ''+ `${ getSignedPrice(getDeltaPrice(tr, buyPrice))}%` );
            }

            {
                const row = addRow( tbody );

                {
                    const cell = addCell( row, '' );

                    const sellBtn = REDOM.el('button',{
                        id: nextid('hud'),
                        textContent: 'SELL',
                    });

                    REDOM.mount( cell, sellBtn );

                    sellBtn.addEventListener( "click", () => {
                        if (!canSell(tr) )
                        {
                            playNote(3, 'C', 50 );
                            return;
                        }

                        playNote(4, 'E', 50 );
                        sell( tr, sellPrice );
                        updateCell();
                        updateCargo();
                        availSell.textContent = `${findSlot(tr.product).units}` ;

                    });
                }

                availSell = REDOM.el('div',{
                    id: nextid('hud'),
                    textContent: `${findSlot(tr.product).units}`,
                    classList: 'number-circle',
                });

                const availSellCell = REDOM.el('td',{
                    id: nextid('hud'),
                });
                REDOM.mount(availSellCell, availSell );
                REDOM.mount(row, availSellCell );

                const sellPrice =  getSellPrice( pl, tr );
                addCell(row, ''+ `${sellPrice} (Cr)` );
                addCell(row, ''+ `${getSignedPrice(getDeltaPrice(tr, sellPrice))}%` );
            }
        }
        
    }

}

export function destroyHudProduct()
{
    const tradeContainer = document.querySelector("#hudtr-container");
    const hudProduct = document.querySelector("#hud-product");
    
    if ( hudProduct )
        REDOM.unmount(tradeContainer,hudProduct);
}
