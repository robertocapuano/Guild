
export interface RGB
{ r: number, g: number, b: number }

export interface HSV
{ h: number, s: number, v: number }

export interface Product
{
    name: string;

    basePrice: number; // per unit
    weight: number; // per unit
}

export interface CargoSlot
{
    product: Product;
    units: number;
    lastPrice: number;
}

export interface ProductTrade
{
    product: Product;
    
    price: number;
    avail: number;
    supply: number;
    demand: number;
}

export interface Cargo
{
    slots: CargoSlot[]
    credit: number;
    capacity: number;
    gross: number;
}

export enum PlanetSize
{
    SMALL,
    MEDIUM,
    LARGE,

    LENGTH
}

export enum PlanetClimate
{
    DESERT,
    TEMPERATE,
    EQUATORIAL,

    LENGTH
}

export const PlanetClimateLabels = {
    [PlanetClimate.DESERT]: 'Desert',
    [PlanetClimate.TEMPERATE]: 'Temperate',
    [PlanetClimate.EQUATORIAL]: 'Equatorial',
};


export enum PlanetEconomy
{
    INDUSTRIAL,
    AGRICOLTURE,

    LENGTH
}

export const PlanetEconomyLabels = {
    [PlanetEconomy.INDUSTRIAL]: 'Industrial',
    [PlanetEconomy.AGRICOLTURE]: 'Agricolture',
};

export interface Planet
{
    name: string;
    
    weights: number[];
    sumWeight: number;
    
    baseColor: RGB;
    size: PlanetSize;

    trade: ProductTrade[];

    population: string;
    climate: PlanetClimate;
    economy: PlanetEconomy;
    taxes: number;
}

export interface System {
    name: string;
    planets: Planet[];
    height: string;

    position: [ string, string ];
}

