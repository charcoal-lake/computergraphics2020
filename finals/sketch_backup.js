/*
1. first person camera and movement
2. movement generates object


5. shader
*/
let deer_posx=0, deer_posy=0, deer_rotate=0, deer_neck_rotate=0;
let deer_move_front, deer_move_back, deer_move_left, deer_move_right;
let deer_body, deer_left_leg=[], deer_right_leg=[], deer_movement=0;
let radio;

let grid=[];
let grasses=[], flowers=[], trees=[];
let grid_max = 40;
let land_width = 5000;
let grid_size = land_width/grid_max;
let slider;

let cam_dx;
let view_dist = 150, move_dist = 5;

let test_tree, test_flower, test_deer;

function preload(){
    deer_body = loadModel('./assets/body.obj');
    deer_head = loadModel('./assets/head.obj');
    deer_left_leg[0] = loadModel('./assets/front-leg-upper-left.obj');
    deer_left_leg[1] = loadModel('./assets/front-leg-lower-left.obj');
    deer_left_leg[2] = loadModel('./assets/back-leg-left.obj');

    deer_right_leg[0] = loadModel('./assets/front-leg-upper-right.obj');
    deer_right_leg[1] = loadModel('./assets/front-leg-lower-right.obj');
    deer_right_leg[2] = loadModel('./assets/back-leg-right.obj');
}

function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL);
    for(let i=0; i<grid_max; i++){
        grid[i] = [];
        for(let j=0; j<grid_max; j++){
            grid[i][j] = 0;
        }
    }
    colorMode(HSB, 360, 100, 100);
    // test_tree = new tree(0, 0);
    test_flower = new flower(0, 0);
    test_deer = new deer(0,0);
    slider = createSlider(0.1, 1.0, 0.5, 0.1);
    slider.position(10, 10);

    radio = createRadio();
    radio.option('first person');
    radio.option('third person');
    radio.style('width', '110px');
    radio.position(10, 50);
    radio.value('first person');

    noStroke();
    cam_dx = cam_dz = 0;

}

function draw(){
    
    background(250);

    //cam_dx = map(mouseX, -width, width, -720, 720);
    cam_dx = cam_dx + (mouseX-pmouseX)*slider.value();

    let cam_tx = deer_posx + view_dist*sin(radians(cam_dx));
    let cam_ty = deer_posy + view_dist*cos(radians(cam_dx));

    

    cam_dz = map(mouseY, 0, height, 45, -20);
    //    cam_dz = cam_dz + (mouseY-pmouseY)*slider.value();
    //let cam_dz_cons = constrain(cam_dz, -20, 45)
    let cam_tz = -view_dist*sin(radians(cam_dz));
    // cam_tz = view

    // test_flower.display();
    // grass();
    // test_tree.display();


    // demo setting 1 -------------------------
    if(radio.value() == 'first person'){
        perspective(PI/3.0);
        camera(deer_posx, deer_posy, -150, cam_tx, cam_ty, cam_tz-100, 0, 0, 1);
    }
    else if(radio.value()=='third person'){
        ortho(-width / 2, width / 2, height / 2, -height / 2, -500, 1000);
        camera(-100+deer_posx, -100+deer_posy, -100, 150+deer_posx, 150+deer_posy, 150, 0, 0, -1);    
    }

    fill(color(154, 32, 33));
    plane(land_width, land_width);
    // growGrid();


    moveDeer(radio.value());
    if(radio.value()=='first person'){
        deer_rotate = -radians(cam_dx);
    }
    if(!keyIsPressed){
        if(deer_neck_rotate >0) deer_neck_rotate -=1;
        else if (deer_neck_rotate <0) deer_neck_rotate +=1;
    }

    test_deer.move(deer_posx, deer_posy, deer_rotate, deer_neck_rotate);
    test_deer.animate(sin(deer_movement)/2);
    //growGrid();
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

}


function moveDeer(option){
    if(keyIsPressed){

        if(option == 'first person'){
            if(key == 'w' || key == 'W'){
                deer_posx += move_dist*sin(radians(cam_dx));
                deer_posy += move_dist*cos(radians(cam_dx));
            }
            else if(key == 's' || key == 'S'){
                deer_posx -= move_dist*sin(radians(cam_dx));
                deer_posy -= move_dist*cos(radians(cam_dx));
            }
            // 이 부분 수정해야 됨
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
        deer_movement+=0.1;
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

        // push elements
        //trees.push(new tree(posx, posy));
        //flowers.push(new flower(posx, posy));
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

/*
function growGrid(){
    for(let i=0; i<grid_max; i++){
        for(let j=0; j<grid_max; j++){
            if(grid[i][j]>=1){
                // demo
                //push();
                //translate(i*grid_size-grid_max*grid_size/2-2.5, j*grid_size-grid_max*grid_size/2-2.5, 10);
                //box(grid_size, grid_size, grid[i][j]);
                //pop();
                grid[i][j] += 1;
            }
        }
    }
}
*/

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