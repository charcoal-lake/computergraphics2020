/*
1. first person camera and movement
2. movement generates object


5. shader
*/
let deer_posx=0, deer_posy=0, deer_rotate=0, deer_neck_rotate=0;
let posx, posy;

let deer_move_front, deer_move_back, deer_move_left, deer_move_right;
let deer_body, deer_left_leg=[], deer_right_leg=[], deer_movement=0;
let radio, mic, mic_vol, offset;
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
let title, desc, name, footer, mode;

let ambient, walk_sound, flute_sound=[],flute=false, bg_music;


function preload(){
    deer_body = loadModel('./assets/obj/body.obj');
    deer_head = loadModel('./assets/obj/head.obj');
    deer_left_leg[0] = loadModel('./assets/obj/front-leg-upper-left.obj');
    deer_left_leg[1] = loadModel('./assets/obj/front-leg-lower-left.obj');
    deer_left_leg[2] = loadModel('./assets/obj/back-leg-left.obj');

    deer_right_leg[0] = loadModel('./assets/obj/front-leg-upper-right.obj');
    deer_right_leg[1] = loadModel('./assets/obj/front-leg-lower-right.obj');
    deer_right_leg[2] = loadModel('./assets/obj/back-leg-right.obj');

    for(let i=1; i<=6; i++){
        sky[i-1] = loadImage('./assets/images/sky-0'+i+'.png');
    }

    ambient = loadSound('./assets/sound/ambient.mp3');
    walk_sound = loadSound('./assets/sound/walk.mp3');
    for (let i=0; i<3; i++){
        flute_sound[i] = loadSound('./assets/sound/bell'+(i+1)+'.mp3');
    }
    bg_music = loadSound('./assets/sound/Lord_Of_The_Dawn.mp3');

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

    main_deer = new deer(0,0);
    mode = 'first person';
    mic = new p5.AudioIn();
    mic.start();
    ambient.loop();
    ambient.setVolume(0.1);
    bg_music.loop();

    noStroke();
    cam_dx = cam_dz = 0;

    setUI();
    noCursor();
}

function draw(){
    
    background(250, 90, 22);
    camera_settings();

    if(!ambient.isPlaying()){
        ambient.loop();
        ambient.setVolume(0.1);
    }

    if(!bg_music.isPlaying()){
        bg_music.loop();
    }
    if(flute_sound[0].isPlaying() || flute_sound[1].isPlaying() || flute_sound[2].isPlaying()){
        flute = true;
    }
    else flute =false;

    let sum=0;
    for(let i=0; i< grid_max; i++){
        for(let j=0; j<grid_max; j++){
            if(grid[i][j] == 1) sum+=1;
        }
    }
    flourish_rate = sum;
    ambient.setVolume(map(flourish_rate, 0, (grid_max-1)*(grid_max-1), 0.0, 1.0));
    mic_vol = mic.getLevel();
    blow();


    noLights();
    ambientLight(60);
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
        translate(land_width/2, 0);
        rotateY(PI/2);
        // fill(155, 50, 50);
        rotateZ(PI/2);
        texture(sky[1]);
        plane(land_width);
        pop();

        push();
        translate(0, land_width/2);
        rotateX(PI/2);
        rotateY(-PI);
        texture(sky[2]);
        //fill(155, 40, 60);
        plane(land_width);
        pop();

        push();
        translate(0, 0, land_width/2);
        texture(sky[0]);
        //fill(155, 40, 60);
        plane(land_width);
        pop();
    }

}

