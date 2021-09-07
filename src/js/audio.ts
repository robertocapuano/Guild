
export const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let mainGainNode = null;

let noteFreq: Array< { [index: string]: number } > = [];

function createNoteTable() {
  let noteFreq = [];
  for (let i=0; i< 9; i++) {
    noteFreq[i] = [];
  }

  // noteFreq[0]["A"] = 27.500000000000000;
  // noteFreq[0]["A#"] = 29.135235094880619;
  // noteFreq[0]["B"] = 30.867706328507756;

  // noteFreq[1]["C"] = 32.703195662574829;
  // noteFreq[1]["C#"] = 34.647828872109012;
  // noteFreq[1]["D"] = 36.708095989675945;
  // noteFreq[1]["D#"] = 38.890872965260113;
  // noteFreq[1]["E"] = 41.203444614108741;
  // noteFreq[1]["F"] = 43.653528929125485;
  // noteFreq[1]["F#"] = 46.249302838954299;
  // noteFreq[1]["G"] = 48.999429497718661;
  // noteFreq[1]["G#"] = 51.913087197493142;
  // noteFreq[1]["A"] = 55.000000000000000;
  // noteFreq[1]["A#"] = 58.270470189761239;
  // noteFreq[1]["B"] = 61.735412657015513;

  // noteFreq[2]["C"] = 65.406391325149658;
  // noteFreq[2]["C#"] = 69.295657744218024;
  // noteFreq[2]["D"] = 73.416191979351890;
  // noteFreq[2]["D#"] = 77.781745930520227;
  // noteFreq[2]["E"] = 82.406889228217482;
  // noteFreq[2]["F"] = 87.307057858250971;
  // noteFreq[2]["F#"] = 92.498605677908599;
  // noteFreq[2]["G"] = 97.998858995437323;
  // noteFreq[2]["G#"] = 103.826174394986284;
  // noteFreq[2]["A"] = 110.000000000000000;
  // noteFreq[2]["A#"] = 116.540940379522479;
  // noteFreq[2]["B"] = 123.470825314031027;

  noteFreq[3]["C"] = 130;
  noteFreq[3]["C#"] = 138;
  noteFreq[3]["D"] = 146;
  noteFreq[3]["D#"] = 155;
  noteFreq[3]["E"] = 164;
  noteFreq[3]["F"] = 174;
  noteFreq[3]["F#"] = 184;
  noteFreq[3]["G"] = 195;
  noteFreq[3]["G#"] = 207;
  noteFreq[3]["A"] = 220;
  noteFreq[3]["A#"] = 233;
  noteFreq[3]["B"] = 246;

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

  // noteFreq[5]["C"] = 523.251130601197269;
  // noteFreq[5]["C#"] = 554.365261953744192;
  // noteFreq[5]["D"] = 587.329535834815120;
  // noteFreq[5]["D#"] = 622.253967444161821;
  // noteFreq[5]["E"] = 659.255113825739859;
  // noteFreq[5]["F"] = 698.456462866007768;
  // noteFreq[5]["F#"] = 739.988845423268797;
  // noteFreq[5]["G"] = 783.990871963498588;
  // noteFreq[5]["G#"] = 830.609395159890277;
  // noteFreq[5]["A"] = 880.000000000000000;
  // noteFreq[5]["A#"] = 932.327523036179832;
  // noteFreq[5]["B"] = 987.766602512248223;

  // noteFreq[6]["C"] = 1046.502261202394538;
  // noteFreq[6]["C#"] = 1108.730523907488384;
  // noteFreq[6]["D"] = 1174.659071669630241;
  // noteFreq[6]["D#"] = 1244.507934888323642;
  // noteFreq[6]["E"] = 1318.510227651479718;
  // noteFreq[6]["F"] = 1396.912925732015537;
  // noteFreq[6]["F#"] = 1479.977690846537595;
  // noteFreq[6]["G"] = 1567.981743926997176;
  // noteFreq[6]["G#"] = 1661.218790319780554;
  // noteFreq[6]["A"] = 1760.000000000000000;
  // noteFreq[6]["A#"] = 1864.655046072359665;
  // noteFreq[6]["B"] = 1975.533205024496447;

  // noteFreq[7]["C"] = 2093.004522404789077;
  // noteFreq[7]["C#"] = 2217.461047814976769;
  // noteFreq[7]["D"] = 2349.318143339260482;
  // noteFreq[7]["D#"] = 2489.015869776647285;
  // noteFreq[7]["E"] = 2637.020455302959437;
  // noteFreq[7]["F"] = 2793.825851464031075;
  // noteFreq[7]["F#"] = 2959.955381693075191;
  // noteFreq[7]["G"] = 3135.963487853994352;
  // noteFreq[7]["G#"] = 3322.437580639561108;
  // noteFreq[7]["A"] = 3520.000000000000000;
  // noteFreq[7]["A#"] = 3729.310092144719331;
  // noteFreq[7]["B"] = 3951.066410048992894;

  // noteFreq[8]["C"] = 4186.009044809578154;
  return noteFreq;
}

export function setupAudio() {
  noteFreq = createNoteTable();

  mainGainNode = audioCtx.createGain();
  mainGainNode.connect(audioCtx.destination);
  mainGainNode.gain.value = 1.;// volumeControl.value;
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
  // osc.connect(mainGainNode);

  osc.type = type;
  osc.frequency.value = freq;
  
  const convolver = audioCtx.createConvolver();
  const dur_s = dur/1000;
  // const dec_s = dur_s /4;
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
            