// MODELS
let body, wingL, wingR, world =[], box_size =100, max_height=500;
let d_posx, d_posy, d_posz, d_rotx=0, d_roty=0;
let dist = 100, grid_num = 50;
let x = 10;

let seed;
let sound_flap, sound_fly;
let sound_button;
let view_select;

let viewx, viewy, viewz;
let panx=0;
let left=false, right=false, forward=false, backward=false;
let posx=-2500, posy=-2500, posz=500, bob=0, shake=3;

let title, desc;


function preload(){

  body = loadModel('./assets/dragon-body.obj');
  wingL = loadModel('./assets/dragon-left-wing.obj');
  wingR = loadModel('./assets/dragon-right-wing.obj');

  sky_tex = loadImage('./assets/sky.jpg');
  sound_flap = loadSound('./assets/flap.mp3');
  sound_fly = loadSound('./assets/fly.mp3');
  sound_wind = loadSound('./assets/wind.mp3');
  bgm = loadSound('./assets/bgm.mp3');


}

function setup(){
  cnv = createCanvas(windowWidth, windowHeight*2/3, WEBGL);
  cnv.position(0, 30);
  background(200);

  colorMode(HSB);
  noStroke();
  for (let i = 0; i < grid_num; i++) {
    world[i] = new Array(grid_num);
    for (let j = 0; j < grid_num; j++) {
      world[i][j] = new land(box_size * i - box_size * grid_num / 2, box_size * j - box_size * grid_num / 2, 150);
    }
  }

  seed = random(0, 10);
  sound_wind.loop();

  sound_button = createButton('BGM');
  sound_button.mousePressed(function(){
    if(bgm.isPlaying()) bgm.stop();
    else bgm.play();    
  })
  sound_button.position(20, height+50);

  view_select = createSelect();
  view_select.option('rider view');
  view_select.option('top');
  view_select.option('dragon-center');
  view_select.option('ortho');

  view_select.position(120, height+50);


  decs = createDiv('SHIFT to ascend. <br> CTRL to descend. <br> W, A, S, D to move the dragon. <br> try W+A and W+D to pan the camera. <br> try selectors and BGM button.');
  decs.style('font-size', '13px');
  decs.style('font-family', 'Roboto Mono');
  decs.position(width/2, height+100);

  title = createSpan('Dragon Rider');
  title.style('font-size', '30px');
  title.style('font-weight', 'bold');
  title.style('font-family', 'Roboto Mono');
  title.position(width/2, height+50);

}

function draw(){
  randomSeed(seed);
 // rig_dragon();
 background(250);
  fill('white');

  viewx = map(mouseX, width/4, width*3/4, PI/2, -PI/2);
  viewz = map(mouseY, height, 0, -PI/4, PI/4);
 
  keyEvents();
  ambientLight(100);
  directionalLight(0, 0, 100, -1, -1, -1);


  if(view_select.value() == 'rider view') {
    perspective();
    camera(posx, posy, posz, posx+300*sin(viewx), posy+100, posz+180*sin(viewz)+shake*sin(bob), panx, 0, -1);
  } 
  else if(view_select.value() == 'ortho'){
    ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 500);
    camera(posx, posy, posz, 0, 0, 0, 0, 0, 1);
  }
  else if(view_select.value() == 'top'){
    perspective(PI/1.5);
    camera(posx, posy, posz+500, posx+300*sin(viewx), posy+100, posz+180*sin(viewz)+shake*sin(bob), 0, 0, -1);
  }
  else if(view_select.value() == 'dragon-center'){
    perspective(PI/6.0);
    camera(posx+180*sin(viewx), posy+100, posz+180*sin(viewz)+shake*sin(bob), d_posx, d_posy, d_posz, 0, 0, -1);
  }
  // push();
  // fill('yellow');
  // sphere(10, 10);
  // pop();

  d_posx = posx;
  d_posy = posy+50;
  d_posz = posz-100;

  // dragon
  fill(0);

  push();
  translate(d_posx, d_posy, d_posz);
  rotateX(PI/2);
  rotateY(PI-2*viewx);

  push();
  if(posz > 100)  rotateZ(PI/3+sin(bob));
  scale(0.3);
  model(wingL);
  pop();

  push();
  if(posz > 100) rotateZ(-PI/3-sin(bob));
  scale(0.3);
  model(wingR);
  pop();

  rotateX(PI/6);
  scale(0.3);
  model(body);
  pop();


  // draw world
  translate(0, 0, -300);

  let offset_x = random(0, 50);
  let offset_y = random(0, 50);
  for(let i=0; i<grid_num; i++){
    for(let j=0; j<grid_num; j++){
      world[i][j].h = 2*map(noise(i*0.15+offset_x, j*0.15+offset_y), 0, 1, 0, max_height);
      world[i][j].changeColor(world[i][j].h);
    }
  }
  
  for (let i = 0; i < grid_num; i++) {
    for (let j = 0; j < grid_num; j++) {
      // * PUSH OR PULL LANDSCAPES
      // if left mouse is pressed, the landscapes are pushed,
      // if right mouse is pressed, the landscapes are pulled.
      push();
      translate(world[i][j].x, world[i][j].y, world[i][j].h / 2);
      // color is mapped according to height value of the grid(box)
      fill(world[i][j].c, 80, 40);
      box(box_size, box_size, world[i][j].h);
      pop();
    }
  }
 

  push();
  rotateY(PI/2);
  texture(sky_tex);
  sphere(5000);
  pop();

}

function keyEvents(){
  if(keyIsDown(87)){ // move forward 'w'
    posy += 10*cos(viewx);
    posx += 10*sin(viewx);
    if(viewz > 0) posz += 10*sin(viewz);
    if(posz < 100) bob += 0.5;
    else {
      if(!sound_fly.isPlaying()) {
        sound_flap.stop();
        sound_fly.loop();
      }
      bob = -PI/2;
    }
    forward = true;


  }
  else {
    forward = false;
  }
    
  if(keyIsDown(83)){ // move backward 'a'
    posy -= 10*cos(viewx);
    posx -= 10*sin(viewx);
    backward = true;
    if(posz < 100) bob += 0.5;
    else {
      bob += 0.5;
      if(!sound_flap.isPlaying()) {
        sound_fly.stop();
        sound_flap.loop();
      }
    }
  }
  else {
    backward = false;
  }
  
  if(keyIsDown(68)){ // move right 'd'
    posy -= 10*cos(viewx+PI/2);
    posx -= 10*sin(viewx+PI/2);
    right = true;
  }
  else right = false;

  if(keyIsDown(65)){ // move left 's'
    posy += 10*cos(viewx+PI/2);
    posx += 10*sin(viewx+PI/2);
    left = true;
  }
  else left = false;

  if(keyIsDown(SHIFT)){
    posz += 10;
    bob += 0.3;
    shake = 10;
  }
  if(keyIsDown(CONTROL)){
    posz -= 10;
    bob += 0.3;
    shake = 10;
  }


  // if the dragon is up in the air
  if(posz > 100){
    if(forward && right){
      if(panx > -0.5)
        panx -= 0.01;
    }
    else {
      if(panx < 0.0)
        panx += 0.02;
    }
  
    if(forward && left){
      if(panx < 0.5) panx += 0.01;
    }
    else {
      if(panx > 0.0) panx -= 0.02;
    }
    
    if(!forward && !right && !backward && !left){
      bob += 0.1;
      shake = 5;
      sound_flap.stop();
      sound_fly.stop();
    }
  }
    
}
