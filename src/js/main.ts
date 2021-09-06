import { playNote } from './audio';
import { initCargo } from './cargo';
import { SHORT_NOTE } from './consts';
import { createHudCargo } from './hudca';
import { createHudPlanet, destroyHudPlanet } from './hudpl';
import { createHudTrade, destroyHudTrade } from './hudtr';
import { createIntro } from './intro';
import { createPlanet, destroyPlanet } from './planet';
import { initSystems, RSeed } from './procgen';
import { createStarfield } from './starfield';
import { createSysMap } from './sysmap';
import { Planet, System } from './types';
import { RND } from './utils';

RSeed( Math.trunc(RND()* 255) );

const backToMap = () => {
    destroyPlanet();
    destroyHudTrade();
    destroyHudPlanet();
    setTimeout( () => createSysMap(systems, showPlanet ), 2000 );
};

const showPlanet = ( pl: Planet ) =>{
    
    playNote(4, 'F', SHORT_NOTE );

    setTimeout( () => {
        createPlanet(pl);
        createHudTrade(pl);
        createHudPlanet(pl );
        createHudCargo( backToMap );
    }, 3000 );
};


let systems: System[];

createStarfield();

createIntro( () => {

    systems = initSystems();
    initCargo();

    createSysMap(systems, showPlanet );
});
