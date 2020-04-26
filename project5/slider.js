function setSliders() {

  let posx = width/8-40;
  let posy = 100;

  let view_lb = createSpan('view');

  let waist_top_lb = createSpan('waist top');
  let waist_btm_lb = createSpan('waist bottom');
  let legr_lb = createSpan('right leg');
  let legl_lb = createSpan('left leg');
  let armr_lb = createSpan('right arm');
  let arml_lb = createSpan('left arm');
  
  view_x = createSlider(-90, 0, 0);
  view_y = createSlider(-90, 90, -90);
  view_z = createSlider(0, 180, 45);

  waist_top_x = createSlider(-80, 45, 0);
  waist_top_y = createSlider(-30, 30, 0);
  waist_top_z = createSlider(-30, 30, 0); 

  waist_btm_x = createSlider(0, 45, 0);
  waist_btm_y = createSlider(-20, 20, 0);
  waist_btm_z = createSlider(-20, 20, 0); 

  legr_ux = createSlider(-90, 90, 0);
  legr_uy = createSlider(0, 180, 0);
  legr_uz = createSlider(0, 180, 0);
  legr_vx = createSlider(0, 180, 0);

  legl_ux = createSlider(-90, 90, 0);
  legl_uy = createSlider(0, 180, 0);
  legl_uz = createSlider(0, 180, 0);
  legl_vx = createSlider(0, 180, 0);

  armr_ux = createSlider(-180, 180, 0);
  armr_uy = createSlider(-45, 180, 0);
  armr_uz = createSlider(0, 180, 0);
  armr_vx = createSlider(0, 180, 0);

  arml_ux = createSlider(-180, 180, 0);
  arml_uy = createSlider(-45, 180, 0);
  arml_uz = createSlider(0, 180, 0);
  arml_vx = createSlider(0, 180, 0);


  // push all the sliders
  sliders.push(waist_top_x);  // 0
  sliders.push(waist_top_y);  // 1
  sliders.push(waist_top_z);  // 2
  sliders.push(waist_btm_x);  // 3
  sliders.push(waist_btm_y);  // 4
  sliders.push(waist_btm_z);  // 5
  sliders.push(armr_ux);      // 6
  sliders.push(armr_uy);      // 7
  sliders.push(armr_uz);      // 8
  sliders.push(armr_vx);      // 9
  sliders.push(arml_ux);      // 10
  sliders.push(arml_uy);      // 11
  sliders.push(arml_uz);      // 12
  sliders.push(arml_vx);      // 13
  sliders.push(legr_ux);      // 14
  sliders.push(legr_uy);      // 15
  sliders.push(legr_uz);      // 16
  sliders.push(legr_vx);      // 17
  sliders.push(legl_ux);      // 18
  sliders.push(legl_uy);      // 19
  sliders.push(legl_uz);      // 20
  sliders.push(legl_vx);      // 21

  slider_cnt = sliders.length;

  // view slider
  view_lb.position(posx, posy); posy+=15;
  view_x.position(posx, posy); posy+=15;
  view_y.position(posx, posy); posy+=15;
  view_z.position(posx, posy); posy+=15;
  posy+= 15;

  // waist top slider
  waist_top_lb.position(posx, posy); posy+=15;
  waist_top_x.position(posx, posy); posy+=15;
  waist_top_y.position(posx, posy); posy+=15;
  waist_top_z.position(posx, posy); posy+=15;
  posy+=15;
  
  //waist bottom slider
  waist_btm_lb.position(posx, posy); posy+=15;
  waist_btm_x.position(posx, posy); posy+=15;
  waist_btm_y.position(posx, posy); posy+=15;
  waist_btm_z.position(posx, posy); posy+=15;
  posy+=15;

  // arm right slider
  armr_lb.position(posx, posy); posy+=15;
  armr_ux.position(posx, posy); posy+=15;
  armr_uy.position(posx, posy); posy+=15;
  armr_uz.position(posx, posy); posy+=15;
  armr_vx.position(posx, posy); posy+=15;
  posy+=15;
 
  // arm left slider
  arml_lb.position(posx, posy); posy+=15;
  arml_ux.position(posx, posy); posy+=15;
  arml_uy.position(posx, posy); posy+=15;
  arml_uz.position(posx, posy); posy+=15;
  arml_vx.position(posx, posy); posy+=15;
  posy+=15;

  // leg right slider
  legr_lb.position(posx, posy); posy+=15;
  legr_ux.position(posx, posy); posy+=15;
  legr_uy.position(posx, posy); posy+=15;
  legr_uz.position(posx, posy); posy+=15;
  legr_vx.position(posx, posy); posy+=15;
  posy+=15;

  // leg left slider
  legl_lb.position(posx, posy); posy+=15;
  legl_ux.position(posx, posy); posy+=15;
  legl_uy.position(posx, posy); posy+=15;
  legl_uz.position(posx, posy); posy+=15;
  legl_vx.position(posx, posy); posy+=15;
  posy+=15;

}
