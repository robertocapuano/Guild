import { PRODUCTS } from './products';
import { Cargo, CargoSlot, Product, ProductTrade } from "./types";
import { readItem, storeItem } from './storage';

export const cargo: Cargo = {
    slots: [],
    credit: 10000,
    capacity: 1000,
    gross: 0,
};

export function initCargo()
{
    const cargoStorage = readItem<Cargo>('cargo');

    if ( cargoStorage )
    {
        Object.assign( cargo, cargoStorage );

        cargo.slots.forEach( slot => {
            slot.product = PRODUCTS.find( pr => pr.name === slot.product.name );
        });
    }
    else
    {
        cargo.slots = PRODUCTS.map( product => ({
            product, 
            units: 0,
            lastPrice: product.basePrice,
        }) );

        storeItem( 'cargo', cargo );
    }
}

export function findSlot( pr: Product ): CargoSlot
{
    return cargo.slots.find( ( slot ) => slot.product === pr );
}

export function canBuy( tr: ProductTrade, buyPrice: number )
{
    return tr.avail>0 &&
            (cargo.gross+ tr.product.weight)<cargo.capacity 
                && (cargo.credit-buyPrice)>0;
}

export function canSell( tr: ProductTrade )
{
    return findSlot( tr.product ).units > 0;
}

export function buy( tr: ProductTrade, buyPrice: number )
{
    cargo.gross += tr.product.weight;
    cargo.credit = Math.max( 0, cargo.credit - buyPrice );
    const slot = findSlot( tr.product );
    slot.units += 1;
    slot.lastPrice = buyPrice;
    tr.avail = Math.max( 0, tr.avail -1 );

    storeItem( 'cargo', cargo );
}

export function sell( tr: ProductTrade, sellPrice: number )
{
    cargo.gross -= tr.product.weight;
    cargo.credit += sellPrice;
    findSlot( tr.product ).units -= 1;

    tr.avail++;

    storeItem( 'cargo', cargo );
}
