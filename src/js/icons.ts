import * as REDOM from 'redom';

export function createIcons()
{
    const icons = [ { w:180, h: 180, cx: 90, cy: 90, r:60, rel: 'apple-touch-icon' , type: 'image/png', },
                        { w:16, h: 16, cx: 8, cy: 8, r:8, rel: 'icon', type: 'image/svg',  },
                        { w:16, h: 16, cx: 8, cy: 8, r:8, rel: 'mask-icon', type: 'image/svg', color: '#FAA' },
                    ];
    for ( let icon of icons )
    {
        const canvas = document.createElement('canvas');
        canvas.width = icon.w;
        canvas.height = icon.h;
        const ctx = canvas.getContext('2d');

        var gradient = ctx.createLinearGradient(0,0,icon.w,0);
        gradient.addColorStop(0, '#FAA');
        gradient.addColorStop(1, '#000');

        ctx.arc(icon.cx , icon.cy, icon.r, 0, 2 * Math.PI);

        ctx.fillStyle = gradient;
        ctx.fill();

        const uri = canvas.toDataURL('image/png');
            
        const head = document.querySelector("head");
        
        const link = REDOM.el('link',{
            rel: icon.rel,
            href: uri,
            color: icon.color,
        });
        REDOM.mount( head, link );
    }

}
