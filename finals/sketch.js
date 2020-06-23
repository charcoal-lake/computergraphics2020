/*
1. first person camera and movement
2. movement generates object


5. shader
*/
let deer_posx=0, deer_posy=0, deer_rotate=0, deer_neck_rotate=0;
let deer_move_front, deer_move_back, deer_move_left, deer_move_right;
let deer_body, deer_left_leg=[], deer_right_leg=[], deer_movement=0;
let radio;
let flourish_rate=0;

let main_deer;
let grid=[];
let grasses=[], flowers=[], trees=[], sky=[];
let grid_max = 8;
let land_width = 1000;
let grid_size = land_width/grid_max;
let slider;

let cam_dx;
let view_dist = 150, move_dist = 5;

let test_tree, test_flower, test_grass;


function preload(){
    deer_body = loadModel('./assets/body.obj');
    deer_head = loadModel('./assets/head.obj');
    deer_left_leg[0] = loadModel('./assets/front-leg-upper-left.obj');
    deer_left_leg[1] = loadModel('./assets/front-leg-lower-left.obj');
    deer_left_leg[2] = loadModel('./assets/back-leg-left.obj');

    deer_right_leg[0] = loadModel('./assets/front-leg-upper-right.obj');
    deer_right_leg[1] = loadModel('./assets/front-leg-lower-right.obj');
    deer_right_leg[2] = loadModel('./assets/back-leg-right.obj');

    for(let i=1; i<=6; i++){
        sky[i-1] = loadImage('./assets/sky-0'+i+'.png');
    }
    myshader = loadShader('shader.vert', 'shader.frag');
}

function setup(){
    cnv = createCanvas(windowWidth, windowHeight-200, WEBGL);
    cnv.position(0, 100);
    for(let i=0; i<grid_max; i++){
        grid[i] = [];
        for(let j=0; j<grid_max; j++){
            grid[i][j] = 0;
        }
    }
    colorMode(HSB, 360, 100, 100);

    // test_tree = new tree(20, 20);
    // test_flower = new flower(20, 20);
    // test_grass =[];
    // for (let i=0; i<3; i++)
    //     test_grass.push(new grass(20, 20));

    main_deer = new deer(0,0);
    slider = createSlider(0.1, 1.0, 0.5, 0.1);
    slider.position(10, 10);

    radio = createRadio();
    radio.option('first person');
    radio.option('third person');
    radio.style('width', '110px');
    radio.position(10, 50);
    radio.value('third person');

    noStroke();
    cam_dx = cam_dz = 0;
    
}

function draw(){
    
    background(359, 30, 73);
    camera_settings();
    
    let sum=0;
    for(let i=0; i< grid_max; i++){
        for(let j=0; j<grid_max; j++){
            if(grid[i][j] == 1) sum+=1;
        }
    }
    flourish_rate = sum;

    noLights();
    ambientLight(80);
    directionalLight(235, 100, 50, 1, 0, 1);
    directionalLight(19, 100, 50, 0, 1, 1);
    //pointLight(19, 100, 100, 0, 0, -500);
    spotLight(67, 29, 100, deer_posx, deer_posy, -500, 0, 0, 1, PI/3, 40);
    //shader(myshader);
    //myshader.setUniform("uBorder", 0.3);

    // box(300);
    fill(color(100+sum, 40+sum, 40+sum));
    plane(land_width, land_width, 100, 100);
    moveDeer(radio.value());
    if(radio.value()=='first person'){
        deer_rotate = -radians(cam_dx);
    }
    if(!keyIsPressed){
        if(deer_neck_rotate >0) deer_neck_rotate -=1;
        else if (deer_neck_rotate <0) deer_neck_rotate +=1;
    }

    main_deer.move(deer_posx, deer_posy, deer_rotate, deer_neck_rotate);
    main_deer.animate(sin(deer_movement)/2);
    growElems();

    // test field -----------------------------------
    // push();
    // translate(200, 200, 0);
    // fill(color('red'));
    // box(50);
    // translate(0, -400, 0);
    // fill(color('blue'));
    // box(50);
    // translate(-400, 0, 0);
    // fill(color('green'));
    // box(50);
    // translate(0, 400, 0);
    // fill(color('yellow'));
    // box(50);
    // pop();
    // test field ends here ------------------------------------


    if(radio.value() == 'first person')
        skybox();

}


function moveDeer(option){
    if(keyIsPressed && deer_posx > -land_width/2 && deer_posx < land_width/2
        && deer_posy < land_width/2 && deer_posy > -land_width/2){

        if(option == 'first person'){
            if(key == 'w' || key == 'W'){
                deer_posx += move_dist*sin(radians(cam_dx));
                deer_posy += move_dist*cos(radians(cam_dx));
            }
            else if(key == 's' || key == 'S'){
                deer_posx -= move_dist*sin(radians(cam_dx));
                deer_posy -= move_dist*cos(radians(cam_dx));
            }
            else if(key == 'a' || key == 'A'){
                deer_posx -= move_dist*cos(radians(cam_dx));
                deer_posy -= move_dist*-sin(radians(cam_dx));
                if(deer_neck_rotate > -30) deer_neck_rotate -=1;
            }
            else if(key == 'd' || key == 'D'){
                deer_posx += move_dist*cos(radians(cam_dx));
                deer_posy += move_dist*-sin(radians(cam_dx));
                if(deer_neck_rotate < 30) deer_neck_rotate +=1;
            }
        }
        else if(option== 'third person'){
            if(key == 'w' || key == 'W'){
                deer_posx += move_dist;
                deer_rotate = -PI/2;
            }
            else if(key == 's' || key == 'S'){
                deer_posx -= move_dist;
                deer_rotate = PI/2;
            }
            else if(key == 'a' || key == 'A'){
                deer_posy -= move_dist;
                deer_rotate = PI;
            }
            else if(key == 'd' || key == 'D'){
                deer_posy += move_dist;
                deer_rotate = 0;
            }
        }
        deer_movement+=0.2;
        stepGrid(deer_posx, deer_posy);
    }
}


function stepGrid(x, y){

    let posx, posy;

    for(let i=0; i<grid_max; i++){
        if( x < i*grid_size-grid_max*grid_size/2 && x >= (i-1)*grid_size-grid_max*grid_size/2 ){
            posx = i;
            break;
        }
    }

    for(let j=0; j<grid_max; j++){
        if( y < j*grid_size-grid_max*grid_size/2 && y >= (j-1)*grid_size-grid_max*grid_size/2 ){
            posy = j;
            break;
        }
    }

    if(posx && posy && grid[posx][posy] !=1  ) {
        if(grid[posx][posy]==0){
            for(let j=0; j<3; j++)
                grasses.push(new grass(posx, posy));
            if(random(0, 10) > 6){
                trees.push(new tree(posx, posy));
            }
            for(let j=0; j<2; j++){
                flowers.push(new flower(posx, posy));
            }
        }
        grid[posx][posy] = 1;
    }

}

function growElems(){
    
    for(let i=0; i<grasses.length; i++){
        grasses[i].grow(grid[grasses[i].ix][grasses[i].iy]);
    }

    for(let i=0; i<trees.length; i++){
        trees[i].grow(grid[trees[i].ix][trees[i].iy]);
    }

    for(let i=0; i<flowers.length; i++){
        flowers[i].grow(grid[flowers[i].ix][flowers[i].iy]);
    }

}

function camera_settings(){
    cam_dx = cam_dx + (mouseX-pmouseX)*slider.value();
    cam_dz = map(mouseY, 0, height, 45, -20);

    let cam_tx = deer_posx + view_dist*sin(radians(cam_dx));
    let cam_ty = deer_posy + view_dist*cos(radians(cam_dx));
    let cam_tz = -view_dist*sin(radians(cam_dz));


    if(radio.value() == 'first person'){
        perspective(PI/3.0);
        camera(deer_posx, deer_posy, -150, cam_tx, cam_ty, cam_tz-100, 0, 0, 1);
    }
    else if(radio.value()=='third person'){
        ortho(-width / 2, width / 2, height / 2, -height / 2, -500, 1000);
        camera(-100+deer_posx, -100+deer_posy, -200, 150+deer_posx, 150+deer_posy, 50, 0, 0, -1);    
        // orbitControl();
    }

}

function skybox(){

    noLights();
    ambientLight(100);
    push();
    translate(deer_posx, deer_posy, 0);

    push();
    translate(1000, 0, -200);
    rotateY(PI/2);
    rotateZ(PI/2);
    texture(sky[3]);
    plane(2000);
    pop();

    push();
    translate(-1000, 0, -200);
    rotateY(PI/2);
    rotateZ(PI/2);
    texture(sky[4]);
    plane(2000);
    pop();

    push();
    translate(0, 1000, -200);
    rotateX(PI/2);
    texture(sky[1]);
    plane(2000);
    pop();

    push();
    translate(0, -1000, -200);
    rotateX(PI/2);
    texture(sky[2]);
    plane(2000);
    pop();

    push();
    translate(0, 0, -1200);
    rotateZ(-PI/2);
    texture(sky[0]);
    plane(2000);
    pop();

    push();
    translate(0, 0, 800);
    texture(sky[5]);
    plane(2000);
    pop();

    pop();


}