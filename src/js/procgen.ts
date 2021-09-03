import { PLANET_H } from "./consts";
import { PRODUCTS } from "./products";
import { readItem, storeItem } from './storage';
import { getBasePrice } from "./trader";
import { Planet, PlanetClimate, PlanetClimateLabels, PlanetEconomy, PlanetEconomyLabels, PlanetSize, ProductTrade, RGB, System } from "./types";
import { HSVtoRGB, RGBtoHSV, RND } from "./utils";

export let R = (n: number) => (seed = (seed * 69069 + 1) % 2 ** 31) % n;
export let FR = () => R(1e9) / 1e9;

let seed = 0;
export function RSeed( n: number) {
  if (n != null)
    seed = n;
  return seed;
}

export function genNames() {
  let name = "";

  for (let l = R(3) + 2; l--;)
    name += "x.lexegezacebisousesarmaindirea.eratenberalavetiedorquanteisrion".substr(
      R(33) * 2,
      2
    );
  name = name.replace(/\./g, "");
  name = name.charAt(0).toUpperCase() + name.substr(1);
  return name;
}

export function genSysNames() {
  const name = genNames().substring(0,2).toUpperCase() + R(10000);
  return name;
}

export function initSystems(): System[]
{
  let systems: System[] = readItem( 'systems' );
  // console.log( systems );

  if (systems)
  {
    systems.forEach( sys => {
      sys.planets.forEach( pl => {
        pl.trade.forEach( tr => {
          tr.product = PRODUCTS.find( pr => pr.name === tr.product.name );
        })
      });
    });
    return systems;
  }

  systems = genSystems();
  storeItem( 'systems', systems );

  return systems;

}

function genSystems(): System[]
{
  const NSYSTEMS = 8;
  const NPLANETS = 5;
  
  const WIDTH = 800;
  const HEIGHT = 400;

  const systems: System[] = [];
  
  const all_pos = [];
  const THRESHOLD_X = 70;
  const THRESHOLD_Y = 50;

  let brk = 0;

  next_rnd:
  for ( let i=0; i<NSYSTEMS; )
  {
    // console.log(i);
    const x = Math.random() * WIDTH;
    const y = Math.random() * HEIGHT;

    for ( let j =0; j<all_pos.length; ++j )
    {
      const dx = Math.abs(x - all_pos[j][0]);
      const dy = Math.abs(y - all_pos[j][1]);
      if (dx <THRESHOLD_X || dy<THRESHOLD_Y)
      {
        ++brk;

        if (brk>1000)
        {
          brk = 0;
          all_pos.length = 0;
          i = 0;
        }
        continue next_rnd;   
      }
    }

    all_pos.push( [ x, y ] );
    ++i;
  }

  for ( let i=0; i<NSYSTEMS; ++i )
  {
    const name = genSysNames();

    const nplanets = R(NPLANETS) +1;

    const height_px = PLANET_H * (nplanets+1);

    const height = height_px + 'px';

    const x = all_pos[i][0];
    const y = all_pos[i][1];
    
    const position: [ string, string ] = [ `${x}px`, `${y}px` ];
    const planets: Planet[] = [];

    const baseColor: RGB = { r: Math.random()*255, g: Math.random()*255, b: Math.random()*255 };

    for ( let j=0; j<nplanets; ++j )
    {
      const nfreq = Math.round(RND() * 8) + 2;
      const weights: number[] = [];
      let sumWeight = 0;

      for ( let k=0; k<nfreq; ++k )
      {
        const fr = Math.round( RND() * 10 );
        weights.push( fr );
        sumWeight += fr;
      }

      const trade: Array<ProductTrade> = PRODUCTS.map( product => {

        const [demand, supply, price ] = getBasePrice( product )
        const avail = 0;

        return {
          product,
          demand, 
          supply,
          price,
          avail, 
        };
      });

      const hsv = RGBtoHSV(baseColor.r, baseColor.g, baseColor.b);
      hsv.v *= .4 + .6 * (j+1)/nplanets;
      const rgb = HSVtoRGB(hsv);

      const planet_size: PlanetSize = Math.trunc(PlanetSize.LENGTH * Math.random());
      let population = '';

      const climate = Math.trunc(RND()* PlanetClimate.LENGTH);
      let economy: PlanetEconomy;

      switch (climate)
      {
        case PlanetClimate.DESERT:
        {
          population = Math.trunc( RND()* 100 + 10)+ 'M';
          economy = PlanetEconomy.INDUSTRIAL;
          break;
        }

        case PlanetClimate.TEMPERATE:
          {
            population = Math.trunc( RND()* 10 + 1) + 'B';
            economy = Math.trunc(RND()* PlanetEconomy.LENGTH);
            
            break;
          }

          case PlanetClimate.EQUATORIAL:
            {
              population =Math.trunc(  RND()* 40 +1 ) + 'B';
              economy = PlanetEconomy.AGRICOLTURE;
              break;
            }
  
      }

      const economyLabel = PlanetEconomyLabels[economy];
      const climateLabel = PlanetClimateLabels[climate];
    
      const taxes = (RND() * .2 + 5e-2);

      const planet: Planet = {
        name: genNames(),
    
        weights,
        sumWeight,
        baseColor: rgb,
        size: planet_size,
        economy: economyLabel,
        climate: climateLabel,
        population,
        trade,

        taxes,
      };

      planets.push( planet);
    }

    const system: System = {
      name,
      planets,
      position,
      height,
    }

    systems.push( system );
  }

  return systems;
}

export function setAvail(pl:Planet)
{
  const L = (pl.size+1 * 5)
  pl.trade.forEach( tr => tr.avail = Math.round(RND() * L) );
}
