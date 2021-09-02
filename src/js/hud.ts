import * as REDOM from 'redom';
import { nextid } from "./utils";

export function addCell( tr: HTMLTableRowElement, content: string, id?: string ): HTMLTableCellElement
{
    const td = REDOM.el('td',{
        id: (id ?? nextid('hud')),
        textContent: content,
    });
    REDOM.mount( tr, td );

    return td;
}

export function addHeader( tr: HTMLTableRowElement, content: string, id?: string )
{
    const td = REDOM.el('th',{
        id: (id ?? nextid('hud')),
        textContent: content,
    });
    REDOM.mount( tr, td );
}

export function addRow( parent: HTMLElement )
{
    const tr = REDOM.el('tr',{
        id: nextid('hud'),
    });
    REDOM.mount( parent, tr );

    return tr;
}
