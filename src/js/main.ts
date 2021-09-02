import { initCargo } from './cargo';
import { createHudCargo } from './hudca';
import { createHudPlanet, destroyHudPlanet } from './hudpl';
import { createHudTrade, destroyHudTrade } from './hudtr';
import { createIntro } from './intro';
import { createPlanet, destroyPlanet } from './planet';
import { initSystems, RSeed } from './procgen';
import { createStarfield } from './starfield';
import { createSysMap } from './sysmap';
import { Planet } from './types';
import { RND } from './utils';

RSeed( Math.trunc(RND()* 255) );

const backToMap = () => {
    destroyPlanet();
    destroyHudTrade();
    destroyHudPlanet();
    setTimeout( () => createSysMap(systems, showPlanet ), 2000 );
};

const showPlanet = ( pl: Planet ) =>{
    setTimeout( () => {
        createPlanet(pl);
        createHudTrade(pl);
        createHudPlanet(pl );
        createHudCargo( backToMap );
    }, 3000 );
};


const systems = initSystems();
initCargo();

createStarfield();
// 

createIntro(() => {
    createSysMap(systems, showPlanet );
});

// {
//     const pl = systems[0].planets[0];
//     createPlanet(pl);
//     createHudTrade(pl);
//     createHudPlanet(pl );
//     createHudCargo( backToMap );
// }
