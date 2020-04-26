function setSliders() {


  let view_x_lb = createSpan('view_X');
  let view_y_lb = createSpan('view_Y');
  let view_z_lb = createSpan('view_Z');
  let legr_x_lb = createSpan('right leg X');
  let legr_y_lb = createSpan('right leg Y');
  let legr_z_lb = createSpan('right leg Z');
  let legr_vx_lb = createSpan('right lower leg');
  let legl_x_lb = createSpan('left leg X');
  let legl_y_lb = createSpan('left leg Y');
  let legl_z_lb = createSpan('left leg Z');
  let legl_vx_lb = createSpan('left lower leg');
  let armr_x_lb = createSpan('right arm X');
  let armr_y_lb = createSpan('right arm Y');
  let armr_z_lb = createSpan('right arm Z');
  let armr_vx_lb = createSpan('right lower arm');
  let arml_x_lb = createSpan('left arm X');
  let arml_y_lb = createSpan('left arm Y');
  let arml_z_lb = createSpan('left arm Z');
  let arml_vx_lb = createSpan('left lower arm');


  view_x = createSlider(-90, 90, 0);
  view_y = createSlider(-90, 90, -45);
  view_z = createSlider(0, 180, 45);

  legr_ux = createSlider(-90, 90, 0);
  legr_uy = createSlider(0, 180, 0);
  legr_uz = createSlider(0, 180, 0);
  legr_vx = createSlider(0, 180, 0);

  legl_ux = createSlider(-90, 90, 0);
  legl_uy = createSlider(0, 180, 0);
  legl_uz = createSlider(0, 180, 0);
  legl_vx = createSlider(0, 180, 0);

  armr_ux = createSlider(-180, 180, 0);
  armr_uy = createSlider(0, 180, 0);
  armr_uz = createSlider(0, 180, 0);
  armr_vx = createSlider(0, 180, 0);

  arml_ux = createSlider(-180, 180, 0);
  arml_uy = createSlider(0, 180, 0);
  arml_uz = createSlider(0, 180, 0);
  arml_vx = createSlider(0, 180, 0);


  view_x_lb.position(10, height * 2 / 3);
  view_x.position(100, height * 2 / 3);
  view_y_lb.position(10, height * 2 / 3 + 15);
  view_y.position(100, height * 2 / 3 + 15);
  view_z_lb.position(10, height * 2 / 3 + 30);
  view_z.position(100, height * 2 / 3 + 30);

  armr_x_lb.position(width/3, height * 2 / 3 + 75);
  armr_ux.position(width/3+100, height * 2 / 3 + 75);
  armr_y_lb.position(width/3, height * 2 / 3 + 90);
  armr_uy.position(width/3+100, height * 2 / 3 + 90);
  armr_z_lb.position(width/3, height * 2 / 3 + 105);
  armr_uz.position(width/3+100, height * 2 / 3 + 105); 
  armr_vx_lb.position(width/3, height * 2 / 3 + 120);  
  armr_vx.position(width/3+100, height * 2 / 3 + 120);


  arml_x_lb.position(width/3, height * 2 / 3);
  arml_ux.position(width/3+100, height * 2 / 3);
  arml_y_lb.position(width/3, height * 2 / 3 + 15);
  arml_uy.position(width/3+100, height * 2 / 3 + 15);
  arml_z_lb.position(width/3, height * 2 / 3 + 30);
  arml_uz.position(width/3+100, height * 2 / 3 + 30); 
  arml_vx_lb.position(width/3, height * 2 / 3 + 45);  
  arml_vx.position(width/3+100, height * 2 / 3 + 45);

  legl_x_lb.position(2*width / 3, height * 2 / 3);
  legl_ux.position(2*width / 3 + 100, height * 2 / 3);
  legl_y_lb.position(2*width / 3, height * 2 / 3 + 15);
  legl_uy.position(2*width / 3 + 100, height * 2 / 3 + 15);
  legl_z_lb.position(2*width / 3, height * 2 / 3 + 30);
  legl_uz.position(2*width / 3 + 100, height * 2 / 3 + 30);
  legl_vx_lb.position(2*width / 3, height * 2 / 3 + 45);
  legl_vx.position(2*width / 3 + 100, height * 2 / 3 + 45);
  legr_x_lb.position(2*width / 3, height * 2 / 3 + 75);
  legr_ux.position(2*width / 3 + 100, height * 2 / 3 + 75);
  legr_y_lb.position(2*width / 3, height * 2 / 3 + 90);
  legr_uy.position(2*width / 3 + 100, height * 2 / 3 + 90);
  legr_z_lb.position(2*width / 3, height * 2 / 3 + 105);
  legr_uz.position(2*width / 3 + 100, height * 2 / 3 + 105);
  legr_vx_lb.position(2*width / 3, height * 2 / 3 + 120);
  legr_vx.position(2*width / 3 + 100, height * 2 / 3 + 120);

}