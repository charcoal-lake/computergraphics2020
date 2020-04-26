let view_x, view_y, view_z;

//sliders
let legr_ux, legr_uy, legr_uz, legr_vx,
  legl_ux, legl_uy, legl_uz, legl_vx,
  armr_ux, armr_uy, armr_uz, armr_vx,
  arml_ux, arml_uy, arml_uz, arml_vx,
    waist_top, waist_bottom;

// previous and current coordinates
let next = [];
let test = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-46,0,0,0,50,0,0,0,0,0,0,0,0,0,0,0,42,0,0,0,-71,0,0,0];

let choreo = [];
let run_flag = 0;

function setup() {

  createCanvas(windowWidth, windowHeight, WEBGL);

  setSliders();

  record = createButton('record');
  record.mousePressed(
    function() {
      choreo.push([legr_ux.value(),
        legr_uy.value(),
        legr_uz.value(),
        legr_vx.value(),
        legl_ux.value(),
        legl_uy.value(),
        legl_uz.value(),
        legl_vx.value(),
        armr_ux.value(),
        armr_uy.value(),
        armr_uz.value(),
        armr_vx.value(),
        arml_ux.value(),
        arml_uy.value(),
        arml_uz.value(),
        arml_vx.value()
      ]);
    }
  );
  record.position(10, 10);

  savec = createButton('save');
  savec.mousePressed(function() {
    let file = createWriter('choreo.txt');
    file.write(choreo);
    file.close();
  });
  savec.position(60, 10);

  run = createButton('run');
  run.mousePressed(runChoreo);
  run.position(100, 10);


}


function draw() {


  background(100);

  rotateX(radians(70 + view_x.value()));
  rotateZ(radians(view_z.value()));
  translate(0, 0, view_y.value());

  noStroke();
  plane(1000);
  stroke(255, 0, 0);
  line(0, 0, 0, 300, 0, 0); // visualize x-rotation axis
  stroke(0, 255, 0);
  line(0, 0, 0, 0, 300, 0); // visualize y-rotation axis
  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, 300); // visualize z-rotation axis


  if(run_flag == 0){
    waist();
  rightLeg(legr_ux.value(), legr_uy.value(), legr_uz.value(),
    legr_vx.value());
  leftLeg(legl_ux.value(), legl_uy.value(), legl_uz.value(),
    legl_vx.value());
  rightArm(armr_ux.value(), armr_uy.value(), armr_uz.value(), armr_vx.value());
  leftArm(arml_ux.value(), arml_uy.value(), arml_uz.value(),
         arml_vx.value());
  }

}

function waist() {

  push();
  translate(0, 0, 120);
  box(40, 10, 30); // lower body
  translate(0, 0, 30);
  box(40, 10, 40); // upper body
  translate(0, 0, 30);
  rotateX(PI / 2);
  cylinder(5, 20); // neck
  rotateX(-PI / 2);
  translate(0, 0, 20);
  ellipsoid(15, 15, 20); // head
  pop();
}



function runChoreo(){

  run_flag = 1;
  
}