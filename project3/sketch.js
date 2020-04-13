/*
Computer Graphics, 2020
20161201 Choi Yerin
3rd Project Terraformer
*/


// initial settings for each grid
let box_size = 10;
let grid_num = 50;
let max_height = 250;

// world grid array
let world = new Array(grid_num);

// sliders
let x_slider;
let z_slider;

// buttons
let stroke_button;
let stroke_flag = 0;
let randomize_button;
let initialize_button;
let random_flag; // 0 : idle, -1 : randomize, 1 : initialize.
let brush_box_size = 5;

// offsets ; to match mouseX, mouseY position to WEBGL coordinates.
let offset_w, offset_h;



class land {
  constructor(x, y, h) {
    this.x = x;   // x position of the grid
    this.y = y;   // y position of the grid
    this.h = h;   // height of the box
    this.c = map(h, 0, max_height, 60, 0);  // coloring for the box
  }

  pushLand() {    // decrease box height when clicked
    if (this.x - box_size <= mouseX-offset_w && mouseX-offset_w <= this.x + box_size && this.y - box_size <= mouseY-offset_h && mouseY-offset_h <= this.y + box_size) {
      if(this.h > 0) this.h -= 5;
      this.changeColor(this.h);
    }
  }

  pullLand() {    // increase box height when clicked
    if (this.x - box_size <= mouseX-offset_w && mouseX-offset_w <= this.x + box_size && this.y - box_size <= mouseY-offset_h && mouseY-offset_h <= this.y + box_size) {
      if(this.h < max_height ) this.h += 5;
      this.changeColor(this.h);
    }
  }

  changeColor(h) {  // change box color when height is changed. (Hue value is mapped)
    this.c = map(h, 0, max_height, 60, 0);
  }
}




function setup() {
  colorMode(HSB, 100);
  createCanvas(windowWidth, windowHeight, WEBGL);

  // 1. initialize 250 grid (grid_num*grid_num)
  for (let i = 0; i < grid_num; i++) {
    world[i] = new Array(grid_num);
    for (let j = 0; j < grid_num; j++) {
      // i is row j is column
      // i = box_size*i - height/2;
      // j = box_size*j - width/2;
      world[i][j] = new land(box_size * i - box_size * grid_num / 2, box_size * j - box_size * grid_num / 2, 150);
    }
  }

  // * SLIDERS
  // x_slider is for rotating X axis
  // z_slider is for rotating z axis
  x_slider = createSlider(0, 45, 0);
  x_slider.position(10, 30);
  z_slider = createSlider(0, 90, 0);
  z_slider.position(10, 50);

  // * BUTTONS
  // stroke button enable/disables the stroke of the box.
  // randomize button generates random landscape.
  // initialize button clears the landscape to initial state. (initial height is 150)
  stroke_button = createButton('stroke');
  stroke_button.position(width/2, 30);
  stroke_button.mousePressed(set_stroke);

  random_flag = 0;  // 0 : idle, -1 : randomize, 1 :initialize
  randomize_button = createButton('randomize');
  randomize_button.position(width/2+50, 30);
  randomize_button.mousePressed(function(){random_flag=-1;});
  initialize_button = createButton('initialize');
  initialize_button.position(width/2+120, 30);
  initialize_button.mousePressed(function(){random_flag = 1;});

  // offset variables are for matching mouseX, mouseY value to 3D coordinates.
  offset_w = width/2;
  offset_h = height/2;

  noStroke();
}

function draw() {
  background(0);
  
  if (stroke_flag){
    stroke(0);
  }
  else noStroke();
  
  if(random_flag != 0){
    set_world(random_flag);
    random_flag = 0; // make it idle
  }
  
  // rotate view by slider values.
  rotateX(radians(x_slider.value()));
  rotateZ(radians(z_slider.value()));

  ambientLight(90);

  for (let i = 0; i < grid_num; i++) {
    for (let j = 0; j < grid_num; j++) {
      // * PUSH OR PULL LANDSCAPES
      // if left mouse is pressed, the landscapes are pushed,
      // if right mouse is pressed, the landscapes are pulled.
      if (mouseIsPressed) {
        if (mouseButton == LEFT) {
          world[i][j].pushLand();
        } else if (mouseButton == RIGHT) {
          world[i][j].pullLand();
        }
      }
      push();
      translate(world[i][j].x, world[i][j].y, world[i][j].h / 2);
      // color is mapped according to height value of the grid(box)
      fill(world[i][j].c, 80, 40);
      box(10, 10, world[i][j].h);
      pop();
    }
  }
  lights();
}

function set_stroke(){
  stroke_flag = !stroke_flag;
}

function set_world(x){
  if(x == -1){ // randomize
    // use noise map to randomize landscapes:
    let offset_x = random(0, 50);
    let offset_y = random(0, 50);
    for(let i=0; i<grid_num; i++){
      for(let j=0; j<grid_num; j++){
        world[i][j].h = map(noise(i*0.15+offset_x, j*0.15+offset_y), 0, 1, 0, max_height);
        world[i][j].changeColor(world[i][j].h);
      }
    }
  }
  else if(x == 1){ // initialize
    for(let i=0; i<grid_num; i++){
      for(let j=0; j<grid_num; j++){
        world[i][j].h = 150;
        world[i][j].changeColor(world[i][j].h);
      }
    }
  }
}

document.oncontextmenu = function() {
  // disable right click menu
    return false;
}