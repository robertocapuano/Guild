import { Product } from "./types";

export const MACHINERY: Product[] = [
    { name: 'Crop Harvesters', basePrice: 130, weight: 130 },
    { name: 'Marine Supplies', basePrice: 310, weight: 300 },
];

export const MEDICINES: Product[] = [
  { name: 'Basic Medicines', basePrice: 100, weight: .1 },
  { name: 'Vaccines', basePrice: 1000, weight: .1 },
  { name: 'Retinax', basePrice: 500, weight: .1 },
];

export const TECHNOLOGY: Product[] = [
  { name: 'Animal Monitors', basePrice: 100, weight: 1 },
  { name: 'Terrain Enrichment', basePrice: 50, weight: 30 },
  { name: 'Acquaponic Systems', basePrice: 50000, weight: 100 },
];

  export const TEXTILES: Product[] = [
    { name: 'Cotton', basePrice: 20, weight: 10 },
    { name: 'Leather', basePrice: 100, weight: 10 },
    { name: 'Wool', basePrice: 50, weight: 10 },
  ];

  export const WEAPONS: Product[] = [
    { name: 'Laser gun', basePrice: 1000, weight: 3 },
    { name: 'Reactive armour', basePrice: 20000, weight: 100 },
    { name: 'Proton cannon', basePrice: 10000, weight: 500 },
  ];

  export const MINERALS: Product[] = [
    { name: 'Diamonds', basePrice: 10000, weight: 1 },
    { name: 'Opals', basePrice: 2000, weight: 1 },
    { name: 'Gold', basePrice: 400, weight: 1 },
  ];

  export const MATERIALS: Product[] = [
    { name: 'Iron', basePrice: 1000, weight: 100 },
    { name: 'Aluminium', basePrice: 2000, weight: 100 },
    { name: 'Tungsten', basePrice: 3000, weight: 100 },
  ];

  export const PRODUCTS = [
    ...MACHINERY,
    ...MEDICINES,
    ...TECHNOLOGY,
    ...TEXTILES,
    ...WEAPONS,
    ...MINERALS,
    ...MATERIALS,
  ].sort( (p,q) => p.name.localeCompare( q.name ) );
  
