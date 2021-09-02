import { Planet, Product, ProductTrade } from "./types";
import { RND } from "./utils";
import { findSlot } from './cargo';

export function getBuyPrice( pl: Planet, tr: ProductTrade )
{
    return Math.max( Math.round( (tr.price *   (1+pl.taxes) *100 )/100), 1 );
}

export function getSellPrice( pl: Planet, tr: ProductTrade )
{
    return Math.max( Math.round( (tr.price *   (1-pl.taxes) *100 )/100), 1 );
}

export function getDeltaPrice( tr: ProductTrade, price: number )
{
    const slot = findSlot( tr.product );
    if (slot.lastPrice === 0 )
        return 0;

    return Math.trunc( 10000 * (price - slot.lastPrice)/ price )/100;
}

export function getBasePrice(pr: Product )
{
    const demand = Math.trunc(RND()*1000);
    const supply = Math.trunc(RND()*1000);
    const price = Math.round(pr.basePrice * (demand/supply)*100)/100;
    return [demand, supply, price];
}
