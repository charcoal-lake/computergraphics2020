let distance, thetaX, thetaY, rot=0;
let cell=100, cnt = 10;
let camMode=1;
let objMode=1;
let md;
let offsetX = 100;
let offsetZ = 131;

let slider_sp;
let slider_cr;
let auto_light;
let dir_x, dir_y;

function preload(){
  
  bg = loadImage("cave.jpg");
  man = loadModel("man.obj");
  knight = loadModel("knight.obj");
  cat = loadModel("cat.obj");
  teapot = loadModel("teapot.obj");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  distance = 700;
  theta = 0;

  slider_sp = createSlider(1, 20, 1);
  slider_sp.position(20, 10);
  auto_light = createButton('auto light');
  auto_light.position(width/2, 10);
  
  noStroke();
}

function draw() {
  background(220);
  
  
  
  thetaX = map(mouseX, 0, width, -PI*2/3, -PI/3);
  thetaY = map(mouseY, 0, height, -90, 90);
  camera(distance*sin(thetaX), -height+mouseY, distance*cos(thetaX), 0, 0, 0, 0, 1, 0);
  
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  
  push();
  rotateX(PI/2);
  sphere(2000);
  pop();
  
  if(objMode == 1){
      scale(1);
      md =null;
  }
  else if (objMode == 2){
    scale(5);
    cell = 30;
    md = man;
  }
  else if (objMode == 3){
    scale(0.3);
    cell = 500;
    md = knight;
  }
  else if (objMode == 4){
    rotateY(PI);
    scale(0.3);
    cell = 600;
    md = cat;
  }
  else if (objMode == 5){
    rotateY(PI);
    scale(5);
    cell = 50;
    md = teapot;
  }
  
  translate(0,0, -cell*cnt/2);
  ambientLight(100);
  directionalLight(250, 250, 250, -dirX, -dirY, -1); 

  specularMaterial(100);
  shininess(slider_sp.value());
  for(let i=0; i<cnt; i++){
    translate(0, 0, cell);
    translate(-cell*cnt, 0, 0);
    for(let j=0; j<cnt; j++){
      translate(cell, 0, 0);
      fill(color('#9D4C43'));
      if (md == null) box(cell/2, 300, cell/2);
      else {
        model(md);
      }
    }
  }
}

function mouseWheel(event){

    
  if(distance > 1000){
    if(event.delta <0) distance += event.delta;
  }
  else if (distance<400){
    if(event.delta >0) distance += event.delta;
  }
  else distance += event.delta;
  
}

function keyPressed(){

  switch(key){
    case '1' : objMode = 1; break;
    case '2' : objMode = 2; break;
    case '3' : objMode = 3; break;
    case '4' : objMode = 4; break;
    case '5' : objMode = 5; break;
    default : objMode = objMode;
  }
  
}

function lightMode(){
  
}
