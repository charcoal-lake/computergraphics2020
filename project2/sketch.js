let px, py;

let tp0;
let tp1 = []; let tp1_cnt = 6;
let tp2 = []; let tp2_cnt = 15;
let tp3 = []; let tp3_cnt = 35;

let dir=1;
let default_size;

let amp;
let ac=0, hc=0, sc=0, bc=0;
let colorSet = [];
let set =0;


function preload(){
  teapot = loadModel("teapot.obj");
  sound = loadSound("tribal-music.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  default_size = windowWidth/300;
  colorMode(RGB);
  
  amp = new p5.Amplitude(0.9);
  sound.play();
  
  let i;
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

  // [background, ambient, dir1, dir2, dir3]
  colorSet.push([color(0, 0, 0), color(0, 0, 80), color(255, 0, 0), color(0, 0, 255), color(100, 0, 100)]);
  colorSet.push( [color(2, 88, 0), color(20), color(100, 100, 0), color(255, 255, 0), color(140, 0, 0)]);
  colorSet.push([color(255, 255, 0), color(0), color(0), color(0), color(0)]);

}

function draw() {
  
  let time;
  
  background(colorSet[set][0]);
  noStroke();
  ambientLight(colorSet[set][1]);
  
  px = map(mouseX, 0, width, -width/2, width/2);
  py = map(mouseY, 0, height, -height/2, height/2);

  directionalLight(colorSet[set][2], px, py, -100);
  directionalLight(colorSet[set][3], -px, -py, -100);
  directionalLight(colorSet[set][4], -px, py, -100);
  
  specularMaterial(255);
  shininess(255);
  specularColor(0, 0, 0);
  
  camera(mouseX*0.3, mouseY*0.3, 500, 0, 0, 0, 0, 1, 0); // camera movement
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
  dir = -dir;
}

function keyPressed(){
  if(keyCode == 32){
    if(sound.isPlaying()) sound.pause();
    else sound.play();
  }
} 