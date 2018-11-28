// The Pink Panther
// Global variables
var pinkPanther;
var rhythm;
var iterator = 0;
var iT = -1;

function preload() {
  // Sound Loading
  pinkPanther = loadSound('./assets/pink-panther-theme.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Song play
  pinkPanther.play();
  // Getting the volume
  rhythm = new p5.Amplitude();
  rhythm.setInput(pinkPanther);
  // fft instance
  fft = new p5.FFT();
  // Alignment stuff
  ellipseMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  // Frame rate
  frameRate(7);
}

function draw() {
  background('#FFDDDD');
  // Volume Mapping
  var volume = rhythm.getLevel();
  volume = map(volume, 0, 1, 0, 500);
  // Polygons
  noStroke();
  fill('#DB9FB2');
  for (var x = width / 20; x < width; x += width / 20) {
    for (var y = height / 20; y < height; y += height / 20) {
      polygon(x, y, 10, volume / 10);
    }
  }
  // Text position
  var xT = width / 2;
  var yT = height / 4;
  // Volume re-mapping
  var volT = map(volume, 0, 500, width / 20, width / 10);
  // "String"
  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke('#fac912'); // waveform is red
  strokeWeight(8);
  for (var i = 0; i < waveform.length; i++) {
    var x = map(waveform[i], -1, 1, 0, width / 4);
    var y = map(i, 0, waveform.length, 0, height);
    vertex(x, y);
  }
  endShape();
  // Text variables
  noStroke();
  fill(255);
  textFont('Life Savers');
  textStyle(BOLD);
  //Title
  textSize(volT);
  var title = 'The Pink Panther';
  text(title, xT, yT);
  // Director and Main Actor
  if (frameCount > 83) {
    fill('#DB9FB2');
    rect(width / 2 + volT / 2, height / 2 + volT / 2, width / 4 + volT, height / 50 + volT);
    fill(0)
    textSize(volT / 2);
    var blake = 'Directed by Blake Edwards';
    text(blake, width / 2, height / 2);
    var peter = 'Starring Peter Sellers';
    text(peter, width / 2 + volT, height / 2 + volT);
  }
}

// Window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Polygon function
function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
