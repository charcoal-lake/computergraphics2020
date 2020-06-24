/*
1. first person camera and movement
2. movement generates object


5. shader
*/
let deer_posx=0, deer_posy=0, deer_rotate=0, deer_neck_rotate=0;
let posx, posy;

let deer_move_front, deer_move_back, deer_move_left, deer_move_right;
let deer_body, deer_left_leg=[], deer_right_leg=[], deer_movement=0;
let radio, mic, mic_vol;
let flourish_rate=0;

let main_deer;
let grid=[];
let grasses=[], flowers=[], trees=[], sky=[];
let grid_max = 8;
let land_width = 1000;
let grid_size = land_width/grid_max;
let slider;

let cam_dx;
let view_dist = 150, move_dist = 2;

let test_tree, test_flower, test_grass;
let title, desc, footer, mode;


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
    colorMode(HSB, 360, 100, 100, 100);

    // test_tree = new tree(20, 20);
    // test_flower = new flower(20, 20);
    // test_grass =[];
    // for (let i=0; i<3; i++)
    //     test_grass.push(new grass(20, 20));

    main_deer = new deer(0,0);
    mode = 'first person';
    mic = new p5.AudioIn();
    mic.start();

    noStroke();
    cam_dx = cam_dz = 0;

    setUI();
}

function draw(){
    
    background(250, 90, 22);
    camera_settings();
    
    let sum=0;
    for(let i=0; i< grid_max; i++){
        for(let j=0; j<grid_max; j++){
            if(grid[i][j] == 1) sum+=1;
        }
    }
    flourish_rate = sum;
    mic_vol = mic.getLevel();
    blow();


    noLights();
    ambientLight(50);
    directionalLight(235, 100, 50, 1, 0, 1);
    directionalLight(10, 100, 50, 0, 1, 1);
    spotLight(67, 29, 100, deer_posx, deer_posy, -500, 0, 0, 1, PI/3, 40);
    fill(color(155+sum, 40+sum, 40+sum));
    plane(land_width, land_width);
    moveDeer(mode);
    if(mode=='first person'){
        deer_rotate = -radians(cam_dx);
    }
    if(!keyIsPressed){
        if(deer_neck_rotate >0) deer_neck_rotate -=1;
        else if (deer_neck_rotate <0) deer_neck_rotate +=1;
    }

    main_deer.move(deer_posx, deer_posy, deer_rotate, deer_neck_rotate);
    main_deer.animate(sin(deer_movement)/2);
    growElems();

    if(mode == 'first person')
        skybox();
    else {
        push();
        translate(land_width/2, 0, -land_width/2);
        rotateY(PI/2);
        fill(155, 50, 50);
        plane(land_width);
        pop();

        push();
        translate(0, land_width/2, -land_width/2);
        rotateX(PI/2);
        fill(155, 40, 60);
        plane(land_width);
        pop();
    }

}


function blow(){

    if(mic_vol > 0.005){
        for(let i=0; i<flowers.length; i++){
            if(grasses[i].x >= deer_posx-200 && grasses[i].x <= deer_posx+200 &&
                grasses[i].y >= deer_posy-200 && grasses[i].y <= deer_posy+200){
                    if(mic_vol > 0.1) flowers[i].offset = mic_vol*dist(grasses[i].x, grasses[i].y, deer_posx, deer_posy)/20;
            }
            else {
                flowers[i].offset = 0;
            }
        }

        for(let i=0; i<grasses.length; i++){
            if(grasses[i].x >= deer_posx-200 && grasses[i].x <= deer_posx+200 &&
                grasses[i].y >= deer_posy-200 && grasses[i].y <= deer_posy+200){
                    if(mic_vol > 0.1) grasses[i].offset = mic_vol*dist(grasses[i].x, grasses[i].y, deer_posx, deer_posy)/20;
            }
            else {
                grasses[i].offset = 0;
            }
        }

        for(let i=0; i<trees.length; i++){
            if(trees[i].x >= deer_posx-200 && trees[i].x <= deer_posx+200 &&
                trees[i].y >= deer_posy-200 && trees[i].y <= deer_posy+200){
                    if(mic_vol > 0.1) trees[i].offset = mic_vol*dist(grasses[i].x, grasses[i].y, deer_posx, deer_posy)/20;
            }
            else {
                trees[i].offset = 0;
            }
        }
    }

}