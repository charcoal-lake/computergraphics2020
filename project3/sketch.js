let World = new Array(10);
let MaxSize = 10;
let MaxNum = 50;
let MaxHeight = 250;
let x_slider;
let y_slider;
let stroke_button;
let stroke_flag = 0;
let randomize_button;
let initialize_button;
let random_flag; // 0 : idle, -1 : randomize, 1 : initialize.
let brush_size = 5;
let offset_w, offset_h;

class land {
  constructor(x, y, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.c = map(h, 0, MaxHeight, 60, 0);
  }

  pushLand() {
    if (this.x - MaxSize <= mouseX-offset_w && mouseX-offset_w <= this.x + MaxSize && this.y - MaxSize <= mouseY-offset_h && mouseY-offset_h <= this.y + MaxSize) {
      if(this.h > 0) this.h -= 5;
      this.changeColor(this.h);
    }
  }

  pullLand() {
    if (this.x - MaxSize <= mouseX-offset_w && mouseX-offset_w <= this.x + MaxSize && this.y - MaxSize <= mouseY-offset_h && mouseY-offset_h <= this.y + MaxSize) {
      if(this.h < MaxHeight ) this.h += 5;
      this.changeColor(this.h);
    }
  }

  changeColor(h) {
    this.c = map(h, 0, MaxHeight, 60, 0);
  }
}

function setup() {
  colorMode(HSB, 100);
  createCanvas(windowWidth, windowHeight, WEBGL);
  for (let i = 0; i < MaxNum; i++) {
    World[i] = new Array(10);
    for (let j = 0; j < MaxNum; j++) {
      // i is row j is column
      // i = MaxSize*i - height/2;
      // j = MaxSize*j - width/2;
      World[i][j] = new land(MaxSize * i - MaxSize * MaxNum / 2, MaxSize * j - MaxSize * MaxNum / 2, 150);
    }
  }

  random_flag = 0;
  x_slider = createSlider(0, 45, 0);
  x_slider.position(10, 30);
  y_slider = createSlider(0, 90, 0);
  y_slider.position(10, 50);
  stroke_button = createButton('stroke');
  stroke_button.position(width/2, 30);
  stroke_button.mousePressed(set_stroke);
  randomize_button = createButton('randomize');
  randomize_button.position(width/2+50, 30);
  randomize_button.mousePressed(function(){random_flag=-1;});
  initialize_button = createButton('initialize');
  initialize_button.position(width/2+120, 30);
  initialize_button.mousePressed(function(){random_flag = 1;});
  offset_w = width/2;
  offset_h = height/2;

  noStroke();
  //console.log(World);
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
  
  rotateX(radians(x_slider.value()));
  rotateZ(radians(y_slider.value()));
  // translate(-MaxSize*MaxNum/2, -MaxSize*MaxNum/2, -50);
  ambientLight(90);
  for (let i = 0; i < MaxNum; i++) {
    for (let j = 0; j < MaxNum; j++) {
      if (mouseIsPressed) {
        if (mouseButton == LEFT) {
          World[i][j].pushLand();
        } else if (mouseButton == RIGHT) {
          World[i][j].pullLand();
        }
      }
      push();
      translate(World[i][j].x, World[i][j].y, World[i][j].h / 2);
      fill(World[i][j].c, 80, 40);
      box(10, 10, World[i][j].h);
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
    let offset_x = random(0, 50);
    let offset_y = random(0, 50);
    for(let i=0; i<MaxNum; i++){
      for(let j=0; j<MaxNum; j++){
        World[i][j].h = map(noise(i*0.15+offset_x, j*0.15+offset_y), 0, 1, 0, MaxHeight);
        World[i][j].changeColor(World[i][j].h);
      }
    }
  }
  else if(x == 1){
    for(let i=0; i<MaxNum; i++){
      for(let j=0; j<MaxNum; j++){
        World[i][j].h = 150;
        World[i][j].changeColor(World[i][j].h);
      }
    }
  }
}

document.oncontextmenu = function() {
    return false;
}