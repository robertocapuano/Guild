
export const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let mainGainNode = null;

let noteFreq: Array< { [index: string]: number } > = [];

function createNoteTable() {
  let noteFreq = [];
  for (let i=0; i< 9; i++) {
    noteFreq[i] = [];
  }

  noteFreq[4]["C"] = 261;
  noteFreq[4]["C#"] = 277;
  noteFreq[4]["D"] = 293;
  noteFreq[4]["D#"] = 311;
  noteFreq[4]["E"] = 329;
  noteFreq[4]["F"] = 349;
  noteFreq[4]["F#"] = 369;
  noteFreq[4]["G"] = 391;
  noteFreq[4]["G#"] = 415;
  noteFreq[4]["A"] = 440;
  noteFreq[4]["A#"] = 466;
  noteFreq[4]["B"] = 493;

  return noteFreq;
}

export function setupAudio() {
  noteFreq = createNoteTable();

  mainGainNode = audioCtx.createGain();
  mainGainNode.connect(audioCtx.destination);
  mainGainNode.gain.value = 1;
}

export function impulseResponse( duration:number, decay?:number ) {
  let sampleRate = audioCtx.sampleRate;
  let length = sampleRate * duration;
  let impulse = audioCtx.createBuffer(2, length, sampleRate);
  let impulseL = impulse.getChannelData(0);
  let impulseR = impulse.getChannelData(1);

  if (!decay)
      decay = 2.0;
  for (let i = 0; i < length; i++){
    impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
  }
  return impulse;
}

function playTone(freq: number, type: OscillatorType, dur: number ) {

  let osc: OscillatorNode = audioCtx.createOscillator();

  osc.type = type;
  osc.frequency.value = freq;
  
  const convolver = audioCtx.createConvolver();
  const dur_s = dur/1000;

  convolver.buffer = impulseResponse(dur_s, 1);
  osc.connect(convolver);
  
  let bandpass = audioCtx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = freq;
  bandpass.Q.value = 50;
  convolver.connect(bandpass);
  bandpass.connect(mainGainNode);
  
  osc.start();
  osc.stop( audioCtx.currentTime + dur_s );

  setTimeout( () => {
    osc.stop();
    bandpass.disconnect();
  }, dur_s/1000+1000  );

  return osc;
}

// export function changeVolume(value: number) {
//   mainGainNode.gain.value = value;
// }

export function playNote( octave: number, note: string, dur: number )
{
  const freq = noteFreq[octave][note];

  playTone(freq, 'sine', dur );

}
            