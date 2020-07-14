// [Log] freq = 331.875  res = 2.4 
// (freqSearchGlockenspiel.js, line 39, x649)




console.log("hello world");
var spectrum = []

let fft, song, filter;

function preload(){
  song = loadSound('other.mp3');
}

function setup() {
  let cnv = createCanvas(1024,200);
  cnv.mousePressed(makeNoise);
  fill(255, 0, 255);

  filter = new p5.BandPass();
  
  song.disconnect();
  song.connect(filter);

  fft = new p5.FFT();
}

function draw() {
  background(220);

  // set the BandPass frequency based on mouseX
  let freq = map(mouseX, 0, width/2, 20, 10000);
  freq = constrain(freq, -1, 22050);
  filter.freq(freq)
  // give the filter a narrow band (lower res = wider bandpass)
  let res = map(mouseY, 0, height, 0, 120);
  filter.res(res);
  console.log("freq = " + freq + "  res = " + res)
  // draw filtered spectrum
  let spectrum = fft.analyze();
  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width/spectrum.length, h);
  }
}

function makeNoise() {
  // see also: `userStartAudio()`
  song.play();
}

function mouseReleased() {
  song.pause();
}
