let rotx, roty, time;
let time_ctrl = 0;

let petal_tilt;
let land_max = 30;
let land_cell = 15;
let bloom_size = 30;

let petal_step_length = 20;


let bloom_before = [];
let bloom_after = [];
let bloom_vtx = [];
let blooms_pos = [];
let blooms_scale = [];
let blooms_speed = [];
let blooms_color = [];


let stem_dmt = 5;
let leaves_start_point = [];
let leaves_rotate = [];
let leaves_stem_idx = [];

let tarx, tary;
let seed;

let sky, sand;
let rewind_flag = false;

function preload(){
    sky = loadImage('sky.jpg');
    sand = loadImage('sand.jpg');
}

function setup(){

    let step_width = [0, 15, 20, 22, 20, 10];
    let step = 0;
    let theta = PI;

    cnv = createCanvas(windowWidth-250, windowHeight-200, WEBGL);
    cnv.position(windowWidth/2 - width/2, windowHeight/2 - height/2 - 80);
    colorMode(HSB, 360, 100, 100);

    rotx = createSlider(0, 90, 60);
    rotx.position(windowWidth/2 - (width-50)/2, 0);
    roty = createSlider(0, 180, 0);
    roty.position(windowWidth/2 - (width-50)/2 + 150, 0);

    time = createSlider(0, 2000, 0);
    time.position(windowWidth/2 - (width-50)/2, windowHeight/2 + height/2 -70);
    time.size(width-50, 10);

    bloom_vtx[0] = [];
    bloom_vtx[1] = [];
    bloom_vtx[2] = [];

    for(let j= 0; j<6; j++){
        for(let i=-1; i<2; i++){
            bloom_before.push(new p5.Vector(sin(theta)*bloom_size, -cos(theta)*1.3*bloom_size, i*step_width[step]));
        }
        step++;
        theta -= PI/5;
    }

    theta = PI;
    step=0;

    for(let j= 0; j<6; j++){
        for(let i=-1; i<2; i++){
            bloom_after.push(new p5.Vector(sin(theta)*4*bloom_size, -cos(theta)*4.5*bloom_size-3.2*bloom_size, i*step_width[step]));
        }
        step++;
        theta -= PI/30;
    }


    title = createDiv('BLOOM');
    title.position(windowWidth/2 - (width-50)/2, windowHeight/2 + height/2 - 40);
    title.style('font-family', 'Roboto Mono');
    title.style('font-size', '30px');
    title.style('font-weight', 'bold');

    desc = createDiv('Click on the screen to planet the seed. <br>Use slider to change the timeline. <br> Try \'SPACEBAR\' to let the time flow linearly. <br>Time runs reversely when it hits both end of the timeline. <br> Use sliders at the top of the screen to rotate the view');
    desc.position(windowWidth/2 - (width-50)/2 + 200, windowHeight/2 + height/2 - 40);
    desc.style('font-size', '13px');
    desc.style('font-family', 'Roboto Mono');

}

function draw(){

    background(color('grey'));


    texture(sky);
    sphere(2000, 2000);
    fill(color('white'));

    camera();
    
    // for(let i= 0; i<18; i++){
    //     bloom_vtx[0][i] = new p5.Vector.lerp(bloom_before[i], bloom_after[i], map(time.value(), 1000, 1500, 0, 1));
    //     bloom_vtx[1][i] = new p5.Vector.lerp(bloom_before[i], bloom_after[i], map(time.value(), 1000, 1500, 0, 0.95));
    //     bloom_vtx[2][i] = new p5.Vector.lerp(bloom_before[i], bloom_after[i], map(time.value(), 1000, 1500, 0, 0.9));

    // }

    rotateX(radians(rotx.value()));
    rotateZ(radians(roty.value()));


    if(keyIsDown(32) && time_ctrl < 2000 && !rewind_flag){
        time_ctrl++;
        time.value(time_ctrl);   
    }else if(keyIsDown(32) && time_ctrl > 0 && rewind_flag){
        time_ctrl--;
        time.value(time_ctrl);
    }

    time_ctrl = time.value();

    if((time.value() == 2000 && !rewind_flag) || (time.value() == 0 && rewind_flag)) rewind_flag = !rewind_flag;

     let posx = mouseX-width/2;
     let posy = mouseY-height/2;
     tarx = (posx / cos(radians(rotx.value())));
     tary = (posy / cos(radians(rotx.value())));
 
    strokeWeight(1);
    stroke(color('black'));

    push();
    //translate(tarx, tary, 0);
    translate(tarx, tary, 0);
    sphere(10);
    pop();
 

    // draw_bloom();
    // draw_leaf();
    for(let i=0; i<blooms_pos.length; i++){
        push();
        translate(blooms_pos[i].x, blooms_pos[i].y, blooms_pos[i].z);
        sphere(5);
        scale(blooms_scale[i]);
        draw_stem(blooms_speed[i], blooms_color[i]);
        pop();
    }


    noStroke();
    texture(sand);
    plane(2000, 2000);
}

function petal(layer){

    let step = 0;

    for(let i=0; i<5; i++){
        beginShape();
        vertex(0, 0, 0);
        for(let j=step; j<step+3; j++){
            vertex(bloom_vtx[layer][j].x, bloom_vtx[layer][j].y, bloom_vtx[layer][j].z);
        }
        step+=3;
        for(let j=step+2; j>=step; j--){
            vertex(bloom_vtx[layer][j].x, bloom_vtx[layer][j].y, bloom_vtx[layer][j].z);
        }
        endShape();    

    }

}

function draw_bloom(speed){

    push();
    rotateX(-PI/2);

    for(let i= 0; i<18; i++){
        bloom_vtx[0][i] = new p5.Vector.lerp(bloom_before[i], bloom_after[i], map(time.value(), 1000, 2000, 0, 1*speed*speed));
        bloom_vtx[1][i] = new p5.Vector.lerp(bloom_before[i], bloom_after[i], map(time.value(), 1000, 2000, 0, 0.95*speed*speed));
        bloom_vtx[2][i] = new p5.Vector.lerp(bloom_before[i], bloom_after[i], map(time.value(), 1000, 2000, 0, 0.9*speed*speed));

    }
    
    for(let theta=0; theta<2*PI; theta+=PI/4){
        push();
        rotateY(theta);
        petal(0);
        pop();
    }

    push();
    scale(0.8);
    for(let theta=0; theta<2*PI; theta+=PI/5){
        push();
        rotateY(theta);
        petal(1);
        pop();
    }
    pop();

    push();
    scale(0.5);
    for(let theta=0; theta<2*PI; theta+=PI/6){
        push();
        rotateY(theta);
        petal(2);
        pop();
    }
    pop();


    pop();

}

function draw_leaf(grow){

    let size = map(grow, 0, 180, 3, 80);

    beginShape();
    vertex(0, 0, 0);
    bezierVertex(size, 0, -5, size, -size*3/2, -5, 0, -size*2, 0);
    vertex(0, 0, 0);
    endShape();

    beginShape();
    vertex(0, 0, 0);
    bezierVertex(-size, 0, -5, -size, -size*3/2, -5, 0, -size*2, 0);
    vertex(0, 0, 0);
    endShape();
}

function draw_stem(speed, color){

    let j= 0;
    let v, size;

    beginShape(TRIANGLE_STRIP);
    randomSeed(random(0, 10));

    for(i = 1; i<=time.value()/15*speed; i++){
        v = new p5.Vector((sin(i*2*PI/8)+noise(i*0.05))*stem_dmt, (cos(i*2*PI/8)+noise(i*0.05))*stem_dmt, j*4*stem_dmt);
        vertex((sin(i*2*PI/8)+noise((i-1)*0.05))*stem_dmt, (cos(i*2*PI/8)+noise((i-1)*0.05))*stem_dmt, (j-1)*4*stem_dmt);
        vertex(v.x, v.y, v.z);
        if(i%8 == 0) j++;
        if(random(0, 100) > 80 && leaves_start_point.length < 6) {
                leaves_start_point.push(v);
                leaves_rotate.push(i*2*PI/8);
                leaves_stem_idx.push(i);
        }
    }
    endShape();

    if(v && time.value()>1000*speed){
        size = map(time.value(), 1000, 1500, 0.5, 2);
        push();
        translate(0, 0, v.z+stem_dmt);
        scale(size);
        fill(color);
        draw_bloom(speed);
        pop();
    }

    for(let i=0; leaves_stem_idx[i] < time.value()/15*speed; i++){
        push();
        translate(leaves_start_point[i].x, leaves_start_point[i].y, leaves_start_point[i].z);
        rotateZ(-leaves_rotate[i]);
        rotateX(PI+radians(20));
        draw_leaf(time.value()/15*speed);
        pop();
    }

}

function mousePressed(){
        let v = new p5.Vector(tarx, tary, 0);
        blooms_pos.push(v);
        blooms_scale.push(random(0.5, 1.0));
        blooms_speed.push(random(0.5, 1.3));
        blooms_color.push(color(random(180, 350), random(30, 100), random(80, 100)));
}

function keyPressed(){

}