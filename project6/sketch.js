const light_cnt = 8;  // number of lights


let dist = 250; // default
let lights_dir = [];
let lights_pos = [];
let lights_color = [];

let colour, angle;
let dir_offset;
let rot_x=0, rot_z=0;
let conc = 1;
let music = [];
let bgm, mode = 1;

function preload(){
  bg = loadImage('./bg.jpg');

  music[1] = loadSound('./assets/1.mp3');
  music[2] = loadSound('./assets/2.mp3');

  md = loadModel('./tower.obj');
}

function setup(){
  cnv = createCanvas(windowHeight-100, windowHeight-100, WEBGL);
  cnv.position(windowWidth/2-cnv.width/2, windowHeight/2-cnv.height/2);
  lights_dir = new p5.Vector(-1, 0, -1);
  def_color = color(255, 0, 0);
  lights_pos[0] = new p5.Vector(0, 0, 50);
  bgm = music[1];

  for(let i =1; i<= light_cnt; i++){
    lights_pos[i] = new p5.Vector(dist*cos((2*PI*i)/light_cnt), dist*sin((2*PI*i)/light_cnt), dist);
    lights_dir[i] = new p5.Vector(-(cos(2*PI*i/light_cnt)), -(sin(2*PI*i/light_cnt)), -1);
  }

  amp = new p5.Amplitude(0.3);
  colour = color('red');
  angle = PI/8;
}

function draw(){
  background(0);
  randomSeed(0);

  bgm = music[mode];
  lights();
  camera(0, rot_x, 400, 0, 0, 0, 0, 1, 0);

  if(bgm.isPlaying()){
    rot_z += 0.01;
  }
  rotateZ(rot_z);

 // dir_offset = map(mouseX, 0, width, 0, 20);
  dir_offset = map(amp.getLevel(), 0.0, 1.0, -2, 15);
  conc = map(mouseY, 0, height, 1, 5);
  dist = map(mouseY, 0, height, -250, 250);

  for(let i=1; i<= light_cnt; i++){
    
    if(i%4 == 1){
      colour = color('blue');
      angle = map(mouseX, 0, width, PI/8, PI/4);
    }
    else if (i%4 == 2){
      colour = color('yellow');
      angle = map(mouseX, 0, width, PI/16, PI/8);
    }
    else if (i%4 == 3){
      colour = color('red');
      angle = map(mouseX, 0, width, PI/8, PI/4);
    }
    else {
      colour = color('yellow');
      angle = map(mouseX, 0, width, PI/16, PI/8);
    }

    lights_dir[i].x += dir_offset*cos(2*PI*i/light_cnt);
    lights_dir[i].y += dir_offset*sin(2*PI*i/light_cnt);
 
    spotLight(colour, lights_pos[i], lights_dir[i], angle, conc);
    lights_dir[i].x -= dir_offset*cos(2*PI*i/light_cnt);
    lights_dir[i].y -= dir_offset*sin(2*PI*i/light_cnt);

  }

  plane(2000, 2000, 100, 100);
  push();
  fill(150);
  translate(-1000, -1000);
  for(let i=0; i<20; i++){
    translate(100, 0);
    for(let j=0; j<20; j++){
      translate(0, 100);
      box(random(60, 90), random(60, 90), random(20, 100));
    }
    translate(0, -2000);
  }
  pop();

  noStroke();

  push();
  scale(0.01);
  fill(150);
  model(md);
  pop();

  texture(bg);

  sphere(1000);


}

function mouseClicked(){
  if(bgm.isPlaying()){
    bgm.pause();
  }
  else bgm.play();
}

function mouseWheel(event){
  if(rot_x > 700.0) rot_x = 700.0;
  else if (rot_x < -200.0) rot_x = -200.0;
  else rot_x += event.delta; 
}

function keyPressed(){

  if(key == '1'){
    bgm.stop();
    mode = 1;
  }
  else if(key == '2'){
    bgm.stop();
    mode = 2;
  }
}