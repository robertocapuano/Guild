import * as REDOM from 'redom';
import { addCell, addHeader, addRow } from './hud';
import { nextid } from "./utils";
import { cargo } from './cargo';
import { playNote } from './audio';
import { SHORT_NOTE } from './consts';

export function createHudCargo( exitListener: ()=>void )
{
    const container = document.querySelector("#hudpl-container");
    {
        // cargo
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
                REDOM.mount( table, thead,  );

                const tr = addRow( thead );
                addHeader( tr, 'cargo');
            }

            {
                const content = REDOM.el('div',{
                    id: 'hud-cargo',
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

                // const header = REDOM.el('div',{
                //     id: nextid('hud'),
                //     classList: 'hud-header',
                //     style: {
                //         'margin-top': '10px',
                //     },
                // });
                // REDOM.mount( header, table );


                const tbody = REDOM.el('tbody',{
                    id: nextid('hud'),
                });
                REDOM.mount( table, tbody );

                {
                    
                    const row = addRow(tbody);
                    addCell(row, 'CAPACITY' );
                    addCell(row, ''+ Math.trunc(cargo.capacity - cargo.gross), 'cargoWeight' );

                }

                {
                    const row = addRow(tbody);
                    addCell(row, 'CREDIT' );
                    addCell(row, ''+ cargo.credit, 'cargoCredit' );
                }

                {
                    const row = addRow(tbody);

                    const cell = REDOM.el('td',{
                        id: nextid('hud'),
                        colspan: 2,
                    });
                    REDOM.mount( row, cell );

                    const btn = REDOM.el('button',{
                        id: nextid('hud'),
                        colspan: 2,
                        textContent: 'EXIT',
                        style: {
                            width: "90%",
                        },
                    });
                    REDOM.mount( cell, btn );
                    let exited = false;

                    btn.onclick = () => {
                        if (exited)
                            return;

                        exited = true;
                        
                        playNote(4, 'A', SHORT_NOTE );
                        exitListener();
                    }
                }
            }
        }
    }
}

export function updateCargo()
{
    const cargoWeight = document.querySelector("#cargoWeight");
    cargoWeight.textContent = ''+ Math.trunc(cargo.capacity - cargo.gross);

    const cargoCredit = document.querySelector("#cargoCredit");
    cargoCredit.textContent = ''+ cargo.credit;
}
