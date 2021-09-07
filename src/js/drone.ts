import { impulseResponse } from "./audio";
import { RND } from "./utils";
import { audioCtx, mainGainNode } from './audio';

const buffers = [];

for ( let i=0; i<64; ++i )
{
  const buffer = impulseResponse( 4 );

  buffers.push( buffer );
}

function createNoiseGen(freq:number,dur_s: number) {

  let noise = audioCtx.createBufferSource();
    noise.buffer = buffers[ Math.trunc(buffers.length * RND()) ];

  let bandpass = audioCtx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = freq;
  bandpass.Q.value = 300;

  // connect our graph
  noise.connect(bandpass).connect(mainGainNode);
  noise.start();
  noise.stop( audioCtx.currentTime +  dur_s );

}

function generate(base_note: number, num_osc:number, dur_s: number ){

    const scale = [0.0, 2.0, 4.0, 6.0, 7.0, 9.0, 11.0, 12.0, 14.0];
    
    for (let i = 0; i < num_osc; i++) {
        const degree = Math.floor(RND() * scale.length);
        let freq = mtof(base_note + scale[degree]);
        freq += Math.random() * 4 - 2;

        createNoiseGen(freq, dur_s );
    }
}

function mtof(m: number) {
  return Math.pow(2, (m - 69) / 12) * 440;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function schedule()
{
    const BASE_NOTE = 40;
    const DELTA_NOTE = 10;
    
    const NUM_OSC = 5;
    const DELTA_OSC = 5;

    const timeout = RND() * 1000 + 300;

    setTimeout( () => {


        const base_note = BASE_NOTE + RND() * DELTA_NOTE;
        const num_osc = NUM_OSC + RND() * DELTA_OSC;

        generate(base_note, num_osc, RND() * 2 +1 );
        schedule();

    },timeout );
}

export function initDrone()
{
    schedule();
}
