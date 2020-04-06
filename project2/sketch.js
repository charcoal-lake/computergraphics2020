let px, py;  // position x, position y ; mapped value of mouseX, mouseY

/*
teapots are divides into levels,
if the level is low, the teapot(s) are closer to the center and larger.
there is 4 levels, tp0 is teapot at the origin.
there are 6 2-level teapots, 15 3-level teapots, 35 4-level teapots.
*/
let tp0;
let tp1 = []; let tp1_cnt = 6;
let tp2 = []; let tp2_cnt = 15;
let tp3 = []; let tp3_cnt = 35;

let dir=1;   // dancing direction
let default_size; // tp0 size ; deteremined according to windowWidth

let amp;    // amplitude element
let colorSet = [];  // colorSet for changing background and light colors. (double list)
let set =0;   // index value for selecting a colorSet.


function preload(){
  // load assets
  teapot = loadModel("teapot.obj");
  sound = loadSound("music.mp3");
}

function setup() {

  // 1. create canvas
  createCanvas(windowWidth, windowHeight, WEBGL);

  // 2. set default size ; teapot size is set according to window width
  default_size = windowWidth/300;
  colorMode(RGB);
  
  amp = new p5.Amplitude(); // p5.sound library
  sound.play();             // start music
  
  let i;

  // 3. create teapots
  tp0 = new Teapot(0, 0, 1);
  for(i=0; i<tp1_cnt; i++){
    tp1.push(new Teapot(1, i, tp1_cnt));
  }
  for(i=0; i<tp2_cnt; i++){
    tp2.push(new Teapot(2, i, tp2_cnt));
  }
  for(i=0; i<tp3_cnt; i++){
    tp3.push(new Teapot(3,i, tp3_cnt));
  }

  // 4. create color sets ; [background, ambientLight, directionalLight0, dir1, dir2]
  colorSet.push([color(33, 134, 140), color(20), color(138, 20, 25), color(255, 0, 0), color(190, 125, 125)]);
  colorSet.push([color(0, 0, 0), color(0, 0, 80), color(255, 0, 0), color(0, 0, 255), color(100, 0, 100)]);
  colorSet.push([color(180), color(0), color(0), color(0), color(0)]);

  noCursor();
}

function draw() {
  
  let time; // how much sound has been played. (0~1.0)

  background(colorSet[set][0]);
  noStroke();
  ambientLight(colorSet[set][1]);
  
  px = map(mouseX, 0, width, -width/2, width/2);
  py = map(mouseY, 0, height, -height/2, height/2);

  // Change light directions according to mouse positions
  directionalLight(colorSet[set][2], px, py, -100);
  directionalLight(colorSet[set][3], -px, -py, -100);
  directionalLight(colorSet[set][4], -px, py, -100);
  
  specularMaterial(255);
  shininess(255);
  specularColor(0, 0, 0);
  
  camera(mouseX*0.3, mouseY*0.3, 500, 0, 0, 0, 0, 1, 0); // camera movement

  // display all the teapots
  tp0.display();
  for(i=0; i<tp1_cnt; i++)
      tp1[i].display();
  for(i=0; i<tp2_cnt; i++)
      tp2[i].display();
  for(i=0; i<tp3_cnt;i++)
      tp3[i].display();
  
  time = sound.currentTime()/sound.duration();
  // console.log(time);
  if( (0.1 < time && time <= 0.3) ||
      (0.45 < time && time <= 0.6) ) set = 1;
  else if ( (0.3 < time && time <= 0.45) || 
    (time > 0.8 && time <= 0.9)) set = 2;
  else set =0;
}

function mousePressed(){
  // change dancing direction
  dir = -dir;
}

function keyPressed(){
  // if spacebar pressed, pause or restart music.
  if(keyCode == 32){
    if(sound.isPlaying()) sound.stop();
    else sound.play();
  }
} 