
export function readItem<T>( key: string ): T
{
    if ( !window['localStorage'] )
        return null;

    const ser = window.localStorage.getItem( key );

    // console.log( ser );

    if (!ser)
        return null;

    return JSON.parse( ser ) as T;
}

export function storeItem<T>( key: string, value: T )
{
    if ( !window['localStorage'] )
        return null;

    const ser = JSON.stringify( value );

    window.localStorage.setItem( key, ser );
}

