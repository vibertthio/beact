import Midi from 'webmidi';

let midiReady = false;
const isMidiReady = () => midiReady;
Midi.enable((e) => {
  if (e) {
    console.log('WebMidi could not be enabled.', e);
  } else {
    midiReady = true;
    console.log('WebMidi enabled!');
    console.log('### outpus ###');
    Midi.outputs.forEach((o, i) => {
      console.log(`[${i}] : ${o.name}`);
      console.log(`made by: ${o.manufacturer}, state: ${o.state}`);
    });
    console.log('### inputs ###');
    Midi.inputs.forEach((o, i) => {
      console.log(`[${i}] : ${o.name}`);
      console.log(`made by: ${o.manufacturer}, state: ${o.state}`);
    });
  }
});

export { isMidiReady };
export default Midi;
