let view_x, view_y, view_z;
let music;

//sliders
let legr_ux, legr_uy, legr_uz, legr_vx,
  legl_ux, legl_uy, legl_uz, legl_vx,
  armr_ux, armr_uy, armr_uz, armr_vx,
  arml_ux, arml_uy, arml_uz, arml_vx,
  waist_top_x, waist_top_y, waist_top_z,
  waist_btm_x, waist_btm_y, waist_btm_z;

let sliders = [];
let slider_cnt;

// previous and current coordinates

let choreo = [];
let velocity = [];
let current = [];
let choreo_idx = 0;
let frmcnt = 0;
let frmrate = 30;
let run_flag = 0;

function preload(){

  music = loadSound('music.mp3');
}

function setup() {

  let cnv = createCanvas(windowWidth * 2/3, windowHeight, WEBGL);
  cnv.position(windowWidth / 3, 0);


  // UI
  // sliders
  setSliders();

  // buttons

  let push_act = createButton('push');
  push_act.mousePressed(function () {
    for (i = 0; i < slider_cnt; i++)
      choreo.push(sliders[i].value());
  });
  push_act.position(80, height/2-100);

  let run = createButton('run');
  run.mousePressed(function () {
    run_flag = 1;
  });
  run.position(125, height/2-100);

  let reset = createButton('reset');
  reset.mousePressed(function () {
    music.stop();
    for (let i = 0; i < slider_cnt; i++)
      sliders[i].value(0);
    choreo = [];
  }
  );
  reset.position(160, height/2-100);

  // set default position
  for (i = 0; i < slider_cnt; i++)
    choreo.push(0);


  let preset = createButton('국민체조');
  preset.mousePressed(function(){
    music.play();
    choreo = gymnastic;
    run_flag=1;
  });
  preset.position(80, height/2-70);

  let savec = createButton('save');
  savec.mousePressed(function () {
    let file = createWriter('choreo.txt');
    file.write(choreo);
    file.close();
  });
  savec.position(140, height/2-70);

  let title = createSpan('Robot Dance<br> Animator');
  title.style('font-size', '30px');
  title.style('font-weight', 'bold');
  title.style('font-family', 'Roboto Mono');
  title.position(30, 30);

  let desc = createDiv('hello world');
  desc.style('font-size', '10px');
  desc.style('font-family', 'Roboto Mono');
  desc.position(30, 130);


}


function draw() {


  background(100);

  translate(0, 0, 150);
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


  if (run_flag == 0) {

    push();
    translate(0, 0, 150);

    rotateX(radians(waist_btm_x.value()));
    rotateY(radians(waist_btm_y.value()));
    rotateZ(radians(waist_btm_z.value()));

    translate(0, 0, -15);
    box(40, 15, 30); // lower body
    translate(0, 0, -25);

    rightLeg(legr_ux.value(), legr_uy.value(), legr_uz.value(),
      legr_vx.value());
    leftLeg(legl_ux.value(), legl_uy.value(), legl_uz.value(),
      legl_vx.value());
    pop();

    push();
    translate(0, 0, 150);

    rotateX(radians(waist_top_x.value()));
    rotateY(radians(waist_top_y.value()));
    rotateZ(radians(waist_top_z.value()));

    translate(0, 0, 20);
    box(40, 15, 40); // upper body
    translate(0, 0, 20);
    rightArm(armr_ux.value(), armr_uy.value(), armr_uz.value(), armr_vx.value());
    leftArm(arml_ux.value(), arml_uy.value(), arml_uz.value(),
      arml_vx.value());

    translate(0, 0, 10);
    rotateX(PI / 2);
    cylinder(5, 20); // neck
    rotateX(-PI / 2);
    translate(0, 0, 20);
    ellipsoid(15, 15, 20); // head
    pop();
  }
  else {
    if (choreo_idx == 0) {
      for (i = 0; i < slider_cnt; i++)
        current[i] = choreo[i];
      for (i = 0; i < slider_cnt; i++) {
        velocity[i] = (choreo[i + slider_cnt] - choreo[i]) / (frmrate);
      }
      choreo_idx++;
    }

    if ((choreo_idx + 1) * slider_cnt <= choreo.length) {
      push();
      translate(0, 0, 150);

      rotateX(radians(current[3]));
      rotateY(radians(current[4]));
      rotateZ(radians(current[5]));

      translate(0, 0, -15);
      box(40, 15, 30); // lower body
      translate(0, 0, -25);

      rightLeg(current[14], current[15], current[16], current[17]);
      leftLeg(current[18], current[19], current[20], current[21]);
      pop();

      push();
      translate(0, 0, 150);

      rotateX(radians(current[0]));
      rotateY(radians(current[1]));
      rotateZ(radians(current[2]));

      translate(0, 0, 20);
      box(40, 15, 40); // upper body
      translate(0, 0, 20);
      rightArm(current[6], current[7], current[8], current[9]);
      leftArm(current[10], current[11], current[12], current[13]);

      translate(0, 0, 10);
      rotateX(PI / 2);
      cylinder(5, 20); // neck
      rotateX(-PI / 2);
      translate(0, 0, 20);
      ellipsoid(15, 15, 20); // head
      pop();

      if (frmcnt == frmrate) {
        frmcnt = 0;
        for (i = 0; i < slider_cnt; i++) {
          velocity[i] = (choreo[(choreo_idx+1)*slider_cnt + i] - choreo[choreo_idx*slider_cnt + i]) / (frmrate);
        }
        choreo_idx++;
      }
      for (i = 0; i < slider_cnt; i++) {
        current[i] += velocity[i];
      }
      frmcnt++;

    }
    else {
      run_flag = 0;
      choreo_idx = 0;
    }
  }


}

